import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Profile() {
  const currentUser = useQuery(api.users.getCurrentUser);
  const userPosts = useQuery(
    api.posts.getUserPosts,
    currentUser?._id ? { userId: currentUser._id } : "skip"
  );

  if (currentUser === undefined || userPosts === undefined) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser || !currentUser.profile) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-600">
            {currentUser.profile.username[0].toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{currentUser.profile.username}</h1>
          </div>
          
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <span className="font-semibold text-lg">{currentUser.profile.postsCount}</span>
              <p className="text-gray-600">posts</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-lg">{currentUser.profile.followersCount}</span>
              <p className="text-gray-600">followers</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-lg">{currentUser.profile.followingCount}</span>
              <p className="text-gray-600">following</p>
            </div>
          </div>
          
          <div>
            <p className="font-semibold">{currentUser.name}</p>
            {currentUser.profile.bio && (
              <p className="text-gray-600 mt-1">{currentUser.profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <div className="flex items-center justify-center border-t border-gray-200 pt-4 mb-8">
          <div className="flex items-center gap-2 text-gray-900">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6zM3 19h6v6H3v-6zm8 0h6v6h-6v-6zm8 0h6v6h-6v-6z"/>
            </svg>
            <span className="text-sm font-medium uppercase tracking-wide">Posts</span>
          </div>
        </div>

        {userPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light mb-2">No Posts Yet</h3>
            <p className="text-gray-600">When you share photos, they'll appear on your profile.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {userPosts.map((post) => (
              <div key={post._id} className="aspect-square">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
