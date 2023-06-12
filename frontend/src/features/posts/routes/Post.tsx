import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import './Post.css';

import { Base, Text, useLoading } from '../../../components/Elements';
import { Flexer, Surface } from '../../../components/Containers';
import { axios } from '../../../lib';

import { scrollToTop } from '../../../utils';

import { PostType } from './Posts';
import { Page } from '../../../components/Layout';
import PostsList from '../components/PostsList';
import PostSidebar from '../components/PostSidebar';
import { ButtonBar } from '@/components/Built';

const Post: React.FC = () => {
  const { id } = useParams();
  const { loading, startLoad, endLoad } = useLoading();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const editMode = useSelector((state: any) => state.editMode.editMode);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<any>();
  const [editing, setEditing] = useState(false);
  const [editingSeo, setEditingSeo] = useState(false);

  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    startLoad();
    axios
      .get(`/post/${id}/`)
      .then((response) => {
        setPost(response.data);
        setReady(true);
        endLoad();
      })
      .catch((err) => {
        setError(err);
        setReady(true);
        endLoad();
      });
  }, [id]);

  useEffect(() => {
    setReady(false);
  }, [id]);

  const handleCreate = () => {
    navigate(`/articles/create`);
  };

  const updatePost = (updatePost: any) => {
    setPost(updatePost);
    setEditing(false);
    setTimeout(scrollToTop, 0);
  };

  const handleCancel = () => {
    setEditing(!editing);
    setTimeout(scrollToTop, 0);
  };

  if (!ready) {
    return null;
  }

  return (
    <Page error={error}>
      {post && (
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
                  <React.Fragment>
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
                  </React.Fragment>
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
                handleCreate={handleCreate}
                auth={auth}
              />
            </div>
          </Flexer>
        </Surface>
      )}
    </Page>
  );
};

export default Post;
