import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface Post {
  _id: Id<"posts">;
  caption: string;
  imageUrl: string | null;
  likesCount: number;
  _creationTime: number;
  user: {
    name: string;
    username: string;
  };
}

export function PostCard({ post }: { post: Post }) {
  const [isLiking, setIsLiking] = useState(false);
  const toggleLike = useMutation(api.likes.toggleLike);
  const isLiked = useQuery(api.likes.isPostLiked, { postId: post._id });

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await toggleLike({ postId: post._id });
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {post.user.username[0].toUpperCase()}
          </span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{post.user.username}</p>
        </div>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="aspect-square">
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`transition-colors ${
              isLiked ? "text-red-500" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Likes count */}
        <p className="text-sm font-medium text-gray-900 mb-2">
          {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
        </p>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-medium text-gray-900">{post.user.username}</span>
          <span className="text-gray-900 ml-2">{post.caption}</span>
        </div>

        {/* Time */}
        <p className="text-xs text-gray-500 mt-2">
          {new Date(post._creationTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
