import { FC } from 'react';
import { Link } from 'react-router-dom';
import './css/PostSidebar.css';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Divider, Tag, Text, Tooltip } from '@/components/Elements';
import { Media } from '@/components/Media';
import { palettes } from '@/utils';

import { PostContent } from '../types';
import { getReadTime } from '@/lib/api';

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
  const { wordCount, readTime } = getReadTime(post.content);

  return (
    <div className="post-sidebar-container post-sidebar-container-chip">
      {post.image && <Media src={post.image} altText="Post Thumbnail" />}
      <Divider mt={8} mb={12} />
      <Flexer a="c" mb={16}>
        {/* Link? */}
        <Tooltip text={`${author_details.first_name} ${author_details.last_name}`}>
          <div className="avatar-p-s">
            <Text c="white" a="c">
              {author_details.first_name.charAt(0).toUpperCase() ||
                author_details.username.charAt(0).toUpperCase()}
            </Text>
          </div>
        </Tooltip>

        <Text t="body1" fw="600" ml={6}>
          {`${author_details.first_name} ${author_details.last_name}`}
        </Text>
      </Flexer>
      {/* <Text t="body1">{author_details.username}</Text> */}
      {/* <Text t="subtitle1">{author_details.email}</Text> */}
      {/* <Divider mt={8} mb={12} /> */}
      <Text s="0.85rem">{`${wordCount} words • ${readTime} min read`}</Text>
      <Divider mt={8} mb={12} />
      <Text t="h4" fw="600" mb={16}>
        Categories
      </Text>
      <Flexer wrap>
        {tags.map((tag) => (
          <Tag key={tag.id} label={tag.detail} mr={8} mb={8} minw={50} />
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
            size="t"
            fontSize="20px"
            onClick={() => handleCreate()}
            material="add"
            iconColor={palettes.info.dark}
            className="info-button"
          />
        </Tooltip>
        <Tooltip text="Bookmark Post">
          <IconButton
            fontSize="18px"
            size="t"
            material="bookmark_add"
            className="info-button"
            iconColor={palettes.info.dark}
          />
        </Tooltip>
        {auth.is_superuser && (
          <Link to={`/admin/post`}>
            <Tooltip text={`Posts Admin Panel`} position="bottom">
              <IconButton
                size="t"
                fontSize="20px"
                onClick={() => handleCreate()}
                material="admin_panel_settings"
                iconColor={palettes.info.dark}
                className="info-button"
              />
            </Tooltip>
          </Link>
        )}
      </Flexer>
    </div>
  );
};
