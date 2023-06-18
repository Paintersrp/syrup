import { FC, Fragment } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import './css/PostsList.css';

import { Container, Flexer, Item } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { Media } from '@/components/Media';

import { PostInfoBar } from './PostInfoBar';
import { PostContent } from '../types';
import { useBreakpoint } from '@/hooks';

interface PostsListProps {
  posts: PostContent[];
  title?: string;
}

export const PostsList: FC<PostsListProps> = ({ posts, title = 'Latest News' }) => {
  const isSmallScreen = useBreakpoint('sm');

  return (
    <div className="post-list-root">
      {title && (
        <Fragment>
          <Text t="h2" fw="bold">
            {title}
          </Text>
          <Divider mt={24} mb={24} />
        </Fragment>
      )}
      <Container>
        {posts.map((post) => {
          const html = DOMPurify.sanitize(post.content);
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

          headings.forEach((heading) => {
            heading.outerHTML = '';
          });

          const modifiedHtml = doc.body.innerHTML;
          const text = parser.parseFromString(modifiedHtml, 'text/html').body.textContent;
          const truncatedText = text?.substr(0, 250) + '...';

          return (
            <Fragment key={post.id}>
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
                        s={isSmallScreen ? '0.95rem' : undefined}
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
                      <Media src={post.image} altText={post.title} boxShadow={1} />
                    </div>
                  </Link>
                </Flexer>
              </Item>
              <Divider mt={24} mb={24} />
            </Fragment>
          );
        })}
      </Container>
    </div>
  );
};
