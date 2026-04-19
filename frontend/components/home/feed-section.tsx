"use client";

import { FeedPost } from "@/components/feed/feed-post";
import { FeedPostSkeleton } from "@/components/ui/skeletons";
import type { FeedPost as FeedPostType } from "@/lib/types";

interface FeedSectionProps {
  posts: FeedPostType[];
  isLoading?: boolean;
}

export function FeedSection({ posts, isLoading }: FeedSectionProps) {
  if (isLoading) {
    return (
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <FeedPostSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Split posts for layout
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Идеи и вдохновение
          </h2>
          <p className="mt-2 text-muted-foreground">
            Подборки, акции и идеи для вашего праздника
          </p>
        </div>

        {/* Featured + Grid layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured post */}
          {featuredPost && (
            <div className="lg:row-span-2">
              <FeedPost post={featuredPost} variant="featured" />
            </div>
          )}

          {/* Regular posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {regularPosts.slice(0, 2).map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Additional posts */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.slice(2, 5).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
