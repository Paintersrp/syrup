import React, { useState } from "react";
import axios from "axios";

import {
  BaseProps,
  Carousel,
  ConfirmationModal,
  Container,
} from "../../../../../../framework";
import { palettes } from "../../../../../../utils";
import { PostData } from "../../../../Landing";
import { PostCard } from "./components";

interface PostCardsProps extends BaseProps {
  posts: PostData[];
  carousel?: boolean;
  editMode?: boolean;
}

const PostCards: React.FC<PostCardsProps> = ({
  posts,
  carousel = false,
  editMode,
  ...rest
}) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const handleDelete = (id: string) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = async (id: string) => {
    await axios.delete(`http://localhost:8000/api/post/${id}/`);
  };

  return (
    <React.Fragment>
      <Container style={{ marginTop: 32, marginBottom: 32 }} {...rest}>
        {carousel ? (
          <Carousel
            autoplay={false}
            iconColor={palettes.secondary.main}
            w={345}
            h={335}
          >
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
    </React.Fragment>
  );
};

export default PostCards;
