import React from "react";

import {
  Flexer,
  IconButton,
  Text,
  Tooltip,
} from "../../../../../../../framework";
import { palettes } from "../../../../../../../utils";
import { PostType } from "../../../../Posts";

const PostInfoBar = ({ post }: { post: PostType }) => {
  const { author, author_details, created_at, content, id } = post;

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Flexer a="c" j="sb">
      <Tooltip
        text={`${author_details.first_name} ${author_details.last_name}`}
      >
        {/* Avatar Encapsulate */}
        <div className="avatar-p-s">
          <Text c="white" a="c">
            {author_details.first_name.charAt(0).toUpperCase() ||
              author_details.username.charAt(0).toUpperCase()}
          </Text>
        </div>
      </Tooltip>
      <Text t={"body1"} s={"0.85rem"} ml={6}>
        {author_details.first_name || author_details.username}{" "}
        {author_details.last_name}
      </Text>
      <Text t={"body1"} s={"0.8rem"} a="r" mr={6}>
        {formattedDate} • {readTimeMinutes} min read
      </Text>
      <Tooltip text="Bookmark Post">
        <IconButton
          fontSize="18px"
          size="t"
          material="bookmark_add"
          className="primary-button"
          iconColor={palettes.primary.main}
        />
      </Tooltip>
    </Flexer>
  );
};

export default PostInfoBar;
