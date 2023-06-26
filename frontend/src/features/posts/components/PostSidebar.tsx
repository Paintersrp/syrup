import { FC, Fragment } from 'react';
import { css } from '@emotion/react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Avatar, Divider, Link, Tag, Text, Tooltip } from '@/components/Elements';
import { Media } from '@/components/Media';
import { getReadTime } from '@/lib/api';
import { mediaQueries } from '@/theme/common/breakpoints';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

import { PostContent } from '../types';
import { colors } from '@/theme/common';

// Responsiveness ordering needed

const styles = (theme: ExtendedTheme) => ({
  root: css({
    minWidth: 200,
    maxWidth: 200,
    position: 'sticky',
    top: 62,
    [mediaQueries.lg]: {
      maxWidth: 1000,
      minWidth: 1000,
      position: 'static',
    },
  }),
});

interface PostSidebarProps {
  post: PostContent;
  tags: { id: number; detail: string }[];
  author_details: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
  handleCreate: () => void;
  auth: {
    is_superuser: boolean;
  };
}

export const PostSidebar: FC<PostSidebarProps> = ({
  post,
  tags,
  author_details,
  handleCreate,
  auth,
}) => {
  const css = inject(styles);
  const { wordCount, readTime } = getReadTime(post.content);

  return (
    <div css={css.root}>
      {post.image && (
        <Fragment>
          <Media src={post.image} altText="Post Thumbnail" />
          <Divider mt={16} mb={12} />
        </Fragment>
      )}
      <Flexer a="c">
        {/* Link? */}
        <Avatar
          size="sm"
          text={author_details.username}
          tooltipText={`${author_details.first_name} ${author_details.last_name}`}
        />
        <Text t="body1" fw="600" ml={6}>
          {author_details.username}
        </Text>
      </Flexer>
      <Text t="body2" mt={4}>{`${author_details.first_name} ${author_details.last_name}`}</Text>
      <Text t="body2">{author_details.email}</Text>
      <Divider mt={8} mb={12} />
      <Text s="0.85rem">{`${wordCount} words • ${readTime} min read`}</Text>
      <Divider mt={8} mb={12} />
      <Text t="h4" fw="600" mb={16}>
        Categories
      </Text>
      <Flexer wrap>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            label={tag.detail}
            mr={8}
            mb={8}
            minw={50}
            bg={colors.smoke}
            c={colors.dark}
          />
        ))}
      </Flexer>

      <Divider mt={8} mb={12} />
      <Text t="subtitle2" s="0.85rem">
        {'Created: ' +
          new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
      </Text>
      <Text t="subtitle2" s="0.85rem">
        {'Updated: ' +
          new Date(post.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
      </Text>

      <Divider mt={8} mb={12} />
      <Flexer j="fe" gap={6}>
        <Tooltip text="Create Post" position="bottom">
          <IconButton
            size="tiny"
            onClick={() => handleCreate()}
            icon="add"
            palette="info"
            variant="hover"
          />
        </Tooltip>
        <Tooltip text="Bookmark Post">
          <IconButton size="tiny" icon="bookmark_add" palette="info" variant="hover" />
        </Tooltip>
        {auth.is_superuser && (
          <Link to={`/admin/post`}>
            <Tooltip text={`Posts Admin Panel`} position="bottom">
              <IconButton
                size="tiny"
                onClick={() => handleCreate()}
                icon="admin_panel_settings"
                palette="info"
                variant="hover"
              />
            </Tooltip>
          </Link>
        )}
      </Flexer>
    </div>
  );
};
