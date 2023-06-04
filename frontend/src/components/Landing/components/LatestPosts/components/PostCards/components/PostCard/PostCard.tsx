import React from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "./PostCard.css";

import {
  BaseProps,
  ButtonBar,
  Flexer,
  Item,
  Media,
  SlideOnScroll,
  Surface,
  Tag,
  Text,
} from "../../../../../../../../framework";
import { PostData } from "../../../../../../Landing";

interface Tag {
  id: number;
  detail: string;
}

interface PostCardProps extends BaseProps {
  post: PostData;
  handleDelete: (id: string) => void;
  editMode: boolean | undefined;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  handleDelete,
  editMode,
  ...rest
}) => {
  const navigate = useNavigate();

  const renderPostContent = () => {
    const html = DOMPurify.sanitize(post.content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      heading.outerHTML = "";
    });

    const modifiedHtml = doc.body.innerHTML;
    const text = parser.parseFromString(modifiedHtml, "text/html").body
      .textContent;
    const truncatedText = text?.substr(0, 250) + "..." || "No Body";

    return truncatedText;
  };

  return (
    <Item sm={12} md={12} lg={4} {...rest}>
      <SlideOnScroll>
        <Media
          altText="Post Image"
          src={post.image}
          boxShadow={1}
          mediaClass="post-card-media"
        />
        <Surface
          px={1.5}
          py={1}
          br={0}
          boxShadow={2}
          maxWidth={325}
          className="post-card"
        >
          <Flexer a="fs">
            <Flexer fd="column">
              <Text t="body1" fw={500} s="1.1rem">
                {post.title}
              </Text>
              <Text t="body1" s="0.85rem" fw={500} style={{ color: "#777" }}>
                By: {post.author_details.first_name}{" "}
                {post.author_details.last_name}
              </Text>
            </Flexer>
            {editMode && (
              <Flexer w="auto">
                <ButtonBar
                  dense
                  editClick={() => navigate(`/posts/${post.id}/update`)}
                  deleteClick={() => handleDelete(post.id)}
                  text="Post"
                />
              </Flexer>
            )}
          </Flexer>
          {/* <Divider mt={6} color={palettes.text.min} /> */}

          <Text t="body1" s="0.9rem" mb={5} mt={6} style={{ color: "#333" }}>
            {renderPostContent()}
          </Text>
          <Flexer j="sb" a="c">
            <div className="post-tag-container">
              {post.tags.map((tag: Tag, index: number) => (
                <Tag
                  key={tag.id}
                  label={tag.detail}
                  className={index % 2 === 0 ? "post-tag-alt" : "post-tag"}
                  style={{ marginRight: 4 }}
                />
              ))}
            </div>
          </Flexer>
        </Surface>
      </SlideOnScroll>
    </Item>
  );
};

export default PostCard;
