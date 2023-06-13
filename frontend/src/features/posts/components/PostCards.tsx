import React, { useState } from 'react';
import axios from 'axios';

import { Carousel } from '@/components/Animation';
import { ConfirmationModal, SectionHeader, SectionHeaderContent } from '@/components/Built';
import { Container, Flexer } from '@/components/Containers';
import { BaseProps } from '@/components/Elements';

import { palettes } from '@/utils';

import { PostCard } from './PostCard';
import { PostContent } from '@/features/posts/types';
interface PostCardsProps extends BaseProps {
  posts: PostContent[];
  header: SectionHeaderContent | any;
  carousel?: boolean;
  editMode: boolean;
}

export const PostCards: React.FC<PostCardsProps> = ({
  posts,
  header,
  carousel = false,
  editMode,
  ...rest
}) => {
  const [selectedId, setSelectedId] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      confirmedDelete(selectedId);
      handleClose();
    }
  };

  const handleDelete = (id: number) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/post/${id}/`);
  };

  return (
    <Flexer j="c">
      <Flexer fd="column" style={{ maxWidth: 1200, padding: 20 }}>
        <SectionHeader
          headerData={header}
          editMode={editMode}
          formTitle="Edit Latest Posts Header"
        />
        <Container style={{ marginTop: 32, marginBottom: 32 }} {...rest}>
          {carousel ? (
            <Carousel autoplay={false} iconColor={palettes.secondary.main} w={345} h={335}>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  handleDelete={handleDelete}
                  editMode={editMode}
                />
              ))}
            </Carousel>
          ) : (
            <React.Fragment>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  handleDelete={handleDelete}
                  editMode={editMode}
                />
              ))}
            </React.Fragment>
          )}
        </Container>
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this Post?"
        />
      </Flexer>
    </Flexer>
  );
};
