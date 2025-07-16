import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createPost = mutation({
  args: {
    imageId: v.id("_storage"),
    caption: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const postId = await ctx.db.insert("posts", {
      userId,
      imageId: args.imageId,
      caption: args.caption,
      likesCount: 0,
    });

    // Update user's posts count
    const userProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (userProfile) {
      await ctx.db.patch(userProfile._id, {
        postsCount: userProfile.postsCount + 1,
      });
    }

    return postId;
  },
});

export const getFeed = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .order("desc")
      .take(50);

    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        const userProfile = await ctx.db
          .query("userProfiles")
          .withIndex("by_user", (q) => q.eq("userId", post.userId))
          .unique();
        
        const imageUrl = await ctx.storage.getUrl(post.imageId);

        return {
          ...post,
          imageUrl,
          user: {
            name: user?.name || "Unknown",
            email: user?.email || "",
            username: userProfile?.username || "user",
          },
        };
      })
    );

    return postsWithDetails;
  },
});

export const getUserPosts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const imageUrl = await ctx.storage.getUrl(post.imageId);
        return {
          ...post,
          imageUrl,
        };
      })
    );

    return postsWithImages;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
