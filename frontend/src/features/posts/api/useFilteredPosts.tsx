import { useEffect, useState } from 'react';
import { PostContent, PostsContent } from '../types';

export const useFilteredPosts = (
  data: PostsContent | undefined,
  selectedTags: string[],
  selectedDateFilter: number | null
): PostContent[] => {
  const [filteredPosts, setFilteredPosts] = useState<PostContent[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.posts.filter((post) => {
        if (selectedTags.length && !post.tags.some((tag) => selectedTags.includes(tag.detail))) {
          return false;
        }

        if (selectedDateFilter === 7) {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return new Date(post.created_at) > sevenDaysAgo;
        }

        if (selectedDateFilter === 30) {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return new Date(post.created_at) > thirtyDaysAgo;
        }

        if (selectedDateFilter === 365) {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          return new Date(post.created_at) > oneYearAgo;
        }

        return true;
      });

      setFilteredPosts(filtered);
    }
  }, [data, selectedTags, selectedDateFilter]);

  return filteredPosts;
};
