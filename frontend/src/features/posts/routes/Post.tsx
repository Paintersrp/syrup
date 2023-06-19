import { useState, useEffect, FC, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './Post.css';

import { ButtonBar } from '@/components/Built';
import { Flexer, Surface } from '@/components/Containers';
import { Loading, Text } from '@/components/Elements';
import { Base } from '@/theme/base';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';
import { scrollToTop } from '@/utils';

import { handleCreatePost } from '../api/handlePosts';
import { usePost } from '../api/usePost';
import { PostsList } from '../components/PostsList';
import { PostSidebar } from '../components/PostSidebar';
import { PostContent } from '../types';
import { useAuthStore } from '@/stores/auth';
import { useEditModeStore } from '@/stores/editmode';

export const Post: FC = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();

  const { authState } = useAuthStore();
  const { editMode } = useEditModeStore();
  const { error, setError, ready, setReady } = usePageSetup();

  const [editing, setEditing] = useState(false);
  const [post, setPost] = useState<PostContent>();

  useEffect(() => {
    usePost(setPost, setError, id);
    setReady(true);
  }, [id]);

  const updatePost = (updatePost: PostContent) => {
    setPost(updatePost);
    setEditing(false);
    scrollToTop();
  };

  const handleCancel = () => {
    setEditing(!editing);
    scrollToTop();
  };

  if (!ready || !post) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      <Surface maxWidth={1200} j="c">
        <Flexer j="c">
          <Base
            minw={700}
            maxw={700}
            mr={16}
            pr={16}
            pb={128}
            pt={16}
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.09)' }}
          >
            {!editing && editMode ? (
              <ButtonBar
                editClick={() => setEditing(!editing)}
                adminLink="post"
                text="Posts"
                obj={post.id}
              />
            ) : null}
            {!editing && (
              <Text t="h2" fw="500" a="c" mt={8} mb={8}>
                {post.title}
              </Text>
            )}
            {
              !editing ? (
                <Fragment>
                  {post.content && (
                    <Text
                      t="body1"
                      fw="400"
                      className="post-body"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                      }}
                    />
                  )}
                </Fragment>
              ) : null
              // <div>
              //         <UpdateArticleView
              //           article={article}
              //           updateArticle={updateArticle}
              //           handleCancel={handleCancel}
              //         />
              //       </div>
            }
            <PostsList posts={post.related_posts} title="Related Posts" />
          </Base>
          <div style={{ position: 'sticky', top: 0 }}>
            <PostSidebar
              post={post}
              tags={post.tags}
              author_details={post.author_details}
              handleCreate={() => handleCreatePost(navigate)}
              auth={authState}
            />
          </div>
        </Flexer>
      </Surface>
    </Page>
  );
};
