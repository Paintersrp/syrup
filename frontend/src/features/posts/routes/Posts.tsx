import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Flexer, Surface } from '@/components/Containers';
import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';

import { usePosts } from '../api/usePosts';
import { useFilteredPosts } from '../api/useFilteredPosts';
import { handleCreatePost, handleDateClick, handleTagClick } from '../api/handlePosts';
import { PostsList } from '../components/PostsList';
import { PostsSidebar } from '../components/PostsSidebar';
import { PostsContent } from '../types';

export const Posts: FC = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const { error, setError, ready, setReady } = usePageSetup();

  const [data, setData] = useState<PostsContent>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const filteredPosts = useFilteredPosts(data, selectedTags, selectedDate);

  useEffect(() => {
    usePosts(setData, setError);
    setReady(true);
  }, []);

  if (!ready) {
    return <Loading load={true} />;
  }

  return (
    <Page error={error}>
      {data && (
        <Surface maxWidth={1020} j="c" pb={60}>
          <Flexer>
            <PostsList posts={filteredPosts} />
            <div style={{ position: 'sticky', top: 0 }}>
              <PostsSidebar
                tags={data.tags}
                handleTagClick={(tag: string) => handleTagClick(tag, selectedTags, setSelectedTags)}
                selectedTags={selectedTags}
                handleCreate={() => handleCreatePost(navigate)}
                auth={auth}
                handleDateClick={(date: number) => handleDateClick(date, setSelectedDate)}
                selectedDateFilter={selectedDate}
              />
            </div>
          </Flexer>
        </Surface>
      )}
    </Page>
  );
};
