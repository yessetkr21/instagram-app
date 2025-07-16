import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  posts: defineTable({
    userId: v.id("users"),
    imageId: v.id("_storage"),
    caption: v.string(),
    likesCount: v.number(),
  })
    .index("by_user", ["userId"]),

  likes: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
  })
    .index("by_user", ["userId"])
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    username: v.string(),
    bio: v.optional(v.string()),
    profileImageId: v.optional(v.id("_storage")),
    postsCount: v.number(),
    followersCount: v.number(),
    followingCount: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_username", ["username"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
