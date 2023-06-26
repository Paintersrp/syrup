import { FC, Fragment } from 'react';
import { css } from '@emotion/react';
import DOMPurify from 'dompurify';

import { Container, Flexer, Item } from '@/components/Containers';
import { Divider, Link, Text } from '@/components/Elements';
import { Media } from '@/components/Media';

import { PostInfoBar } from './PostInfoBar';
import { PostContent } from '../types';
import { useBreakpoint } from '@/hooks';
import { inject } from '@/theme/utils';
import { mediaQueries } from '@/theme/common/breakpoints';

const styles = (theme: any) => ({
  root: css({
    flexGrow: 1,
    padding: 16,
    maxWidth: 700,
    borderRight: '1px solid rgba(0, 0, 0, 0.05)',

    [mediaQueries.lg]: {
      order: 2,
    },
  }),
  thumbnail: css({
    maxWidth: 300,
    minWidth: 200,
    marginLeft: 16,

    [mediaQueries.md]: {
      maxWidth: 175,
      minWidth: 175,
    },
    [mediaQueries.sm]: {
      maxWidth: 125,
      minWidth: 125,
    },
  }),
});

interface PostsListProps {
  posts: PostContent[];
  title?: string;
}

export const PostsList: FC<PostsListProps> = ({ posts, title = 'Latest News' }) => {
  const css = inject(styles);
  const isSmallScreen = useBreakpoint('sm');

  return (
    <div css={css.root}>
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
                    <div css={css.thumbnail}>
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
