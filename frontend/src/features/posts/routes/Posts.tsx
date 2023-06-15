import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flexer, Surface } from '@/components/Containers';
import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { handleCreatePost, handleDateClick, handleTagClick } from '../api/handlePosts';
import { usePosts } from '../api/usePosts';
import { useFilteredPosts } from '../api/useFilteredPosts';
import { PostsList } from '../components/PostsList';
import { PostsSidebar } from '../components/PostsSidebar';

export const Posts: FC = () => {
  const navigate = useNavigate();
  const { data, tags, isLoading } = usePosts();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const filteredPosts = useFilteredPosts(data, selectedTags, selectedDate);

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      <Surface maxWidth={1020} j="c" pb={60}>
        <Flexer>
          <PostsList posts={filteredPosts} />
          <div style={{ position: 'sticky', top: 0 }}>
            <PostsSidebar
              tags={tags}
              handleTagClick={(tag: string) => handleTagClick(tag, selectedTags, setSelectedTags)}
              selectedTags={selectedTags}
              handleCreate={() => handleCreatePost(navigate)}
              handleDateClick={(date: number) => handleDateClick(date, setSelectedDate)}
              selectedDateFilter={selectedDate}
            />
          </div>
        </Flexer>
      </Surface>
    </Page>
  );
};
