import React, { useState } from "react";
import axios from "axios";

import { PostCard } from "./components";
import { PostData } from "../../../../Landing";
import { palettes } from "../../../../../../utils";
import { ConfirmationModal } from "../../../../../../framework/Prebuilt";
import { Carousel, Container } from "../../../../../../framework/Containers";

interface PostCardsProps {
  posts: PostData[];
  carousel?: boolean;
  editMode?: boolean;
}

const PostCards: React.FC<PostCardsProps> = ({
  posts,
  carousel = false,
  editMode,
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
      <Container style={{ marginTop: 32, marginBottom: 32 }}>
        {carousel ? (
          <Carousel
            autoplay={false}
            iconColor={palettes.secondary.main}
            style={{ width: 345, height: 335 }}
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
