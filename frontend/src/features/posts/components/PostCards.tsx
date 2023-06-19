import { FC, Fragment } from 'react';

import { Carousel } from '@/components/Animation';
import { ConfirmationModal, SectionHeader, SectionHeaderContent } from '@/components/Built';
import { Container, Flexer } from '@/components/Containers';
import { BaseProps } from '@/components/Elements';

import { PostCard } from './PostCard';
import { PostContent } from '@/features/posts/types';
import { useConfirm } from '@/hooks/useConfirm';
import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';
interface PostCardsProps extends BaseProps {
  posts: PostContent[];
  header: SectionHeaderContent | any;
  carousel?: boolean;
}

export const PostCards: FC<PostCardsProps> = ({ posts, header, carousel = false, ...rest }) => {
  const { editMode }: any = useEditModeStore();
  const { open, handleClose, handleConfirm, handleDelete } = useConfirm('post');

  return (
    <Flexer j="c">
      <Flexer fd="column" style={{ maxWidth: 1200, padding: 20 }}>
        <SectionHeader headerData={header} formTitle="Edit Latest Posts Header" />
        <Container style={{ marginTop: 32, marginBottom: 32 }} {...rest}>
          {carousel ? (
            <Carousel autoplay={false} iconColor={colors.secondary.main} w={345} h={335}>
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
            <Fragment>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  handleDelete={handleDelete}
                  editMode={editMode}
                />
              ))}
            </Fragment>
          )}
        </Container>
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          message="Are you sure you want to delete this Post?"
        />
      </Flexer>
    </Flexer>
  );
};
