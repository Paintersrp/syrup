export type PostTag = { id: number; detail: string };

export type PostContent = {
  id: number;
  content: string;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
  tags: PostTag[];
  author: string;
  author_details: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
  related_posts: PostContent[];
  tags_options: PostTag[];
};

export type PostResponse = {
  data: PostContent;
};

export type PostsContent = {
  posts: PostContent[];
  tags: PostTag[];
};
