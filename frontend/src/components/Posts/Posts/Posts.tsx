import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Flexer, Page, Surface, useLoading } from "../../../framework";
import { PostsList, Sidebar } from "./components";
import { ApiAxiosInstance } from "../../../lib";

export interface PostType {
  id: number;
  content: string;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
  tags: { id: number; detail: string }[];
  author: string;
  author_details: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
  related_posts: PostType[];
}

const Posts: React.FC = () => {
  const navigate = useNavigate();
  const { loading, startLoad, endLoad } = useLoading();
  const auth = useSelector((state: any) => state.auth);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<number | null>(
    null
  );

  useEffect(() => {
    startLoad();
    ApiAxiosInstance.get("/post/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        setError(err);
        setReady(true);
        endLoad();
      });
    ApiAxiosInstance.get("/tags/")
      .then((response) => {
        setTags(response.data);
        setReady(true);
        endLoad();
      })
      .catch((err) => {
        setError(err);
        setReady(true);
        endLoad();
      });
  }, []);

  // Encapsulate
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const handleCreate = () => {
    navigate(`/articles/create`);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setTimeout(scrollToTop, 0);
  };

  const handleDateFilterClick = (filterOption: number) => {
    setSelectedDateFilter(filterOption);
    setTimeout(scrollToTop, 0);
  };

  const filteredPosts = posts.filter((post) => {
    if (
      selectedTags.length &&
      !post.tags.some((tag) => selectedTags.includes(tag.detail))
    ) {
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

  if (!ready) {
    return null;
  }

  return (
    <Page error={error}>
      <Surface maxWidth={1020} j="c" pb={60}>
        <Flexer>
          <PostsList posts={filteredPosts} />
          <div style={{ position: "sticky", top: 0 }}>
            <Sidebar
              tags={tags}
              handleTagClick={handleTagClick}
              selectedTags={selectedTags}
              handleCreate={handleCreate}
              auth={auth}
              handleDateFilterClick={handleDateFilterClick}
              selectedDateFilter={selectedDateFilter}
            />
          </div>
        </Flexer>
      </Surface>
    </Page>
  );
};

export default Posts;
