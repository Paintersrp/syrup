import React from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import "./PostsList.css";

import {
  Container,
  Divider,
  Flexer,
  Item,
  Media,
  Text,
} from "../../../../../framework";
import { breakPoints, useBreakpoint } from "../../../../../utils";
import { PostInfoBar } from "./components";
import { PostType } from "../../Posts";

interface PostsListProps {
  posts: PostType[];
  title?: string;
}

const PostsList: React.FC<PostsListProps> = ({
  posts,
  title = "Latest News",
}) => {
  const isSmallScreen = useBreakpoint(breakPoints.sm);

  return (
    <div className="post-list-root">
      {title && (
        <React.Fragment>
          <Text t="h2" fw="bold">
            {title}
          </Text>
          <Divider mt={24} mb={24} />
        </React.Fragment>
      )}
      <Container>
        {posts.map((post) => {
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
          const truncatedText = text?.substr(0, 250) + "...";

          return (
            <React.Fragment key={post.id}>
              <Item xs={12}>
                <Flexer mb={16}>
                  <Flexer grow fd="column" j="sb">
                    <PostInfoBar post={post} />
                    <Link to={`/posts/${post.id}`}>
                      <Text
                        t="h5"
                        fw="bold"
                        mb={8}
                        pt={4}
                        s={isSmallScreen ? "0.95rem" : undefined}
                      >
                        {post.title}
                      </Text>

                      {!isSmallScreen && (
                        <Text t="body1" fw="400" style={{ flexGrow: 1 }}>
                          {truncatedText}
                        </Text>
                      )}
                    </Link>
                  </Flexer>
                  <Link to={`/posts/${post.id}`}>
                    <div className="post-list-thumbnail">
                      <Media
                        src={post.image}
                        altText={post.title}
                        boxShadow={1}
                      />
                    </div>
                  </Link>
                </Flexer>
              </Item>
              <Divider mt={24} mb={24} />
            </React.Fragment>
          );
        })}
      </Container>
    </div>
  );
};

export default PostsList;
