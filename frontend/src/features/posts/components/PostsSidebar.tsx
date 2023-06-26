import { FC } from 'react';
import { css } from '@emotion/react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Divider, Link, Tag, Text, Tooltip } from '@/components/Elements';
import { useAuthStore } from '@/stores/auth';
import { defaultColors } from '@/theme';
import { mediaQueries } from '@/theme/common/breakpoints';
import { inject } from '@/theme/utils';

const styles = (theme: any) => ({
  root: css({
    minWidth: 200,
    maxWidth: 200,
    position: 'sticky',
    top: 62,
    padding: '0 16px',
    [mediaQueries.lg]: {
      maxWidth: 1000,
      minWidth: 1000,
      position: 'static',
    },
  }),
});

interface SidebarProps {
  tags: any;
  handleTagClick: (tag: string) => void;
  selectedTags: string[];
  handleCreate: () => void;
  handleDateClick: any;
  selectedDateFilter: number | null;
}

export const PostsSidebar: FC<SidebarProps> = ({
  tags,
  handleTagClick,
  selectedTags,
  handleCreate,
  handleDateClick,
  selectedDateFilter,
}) => {
  const css = inject(styles);
  const { authState } = useAuthStore();

  const dateFilters = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last year', value: 365 },
    { label: 'All', value: null },
  ];

  return (
    <div css={css.root}>
      <Text t="h4" fw="600" mb={16}>
        Categories
      </Text>
      <Flexer wrap>
        {tags.map((tag: any) => (
          <Tag
            key={tag.id}
            label={tag.detail}
            onClick={() => handleTagClick(tag.detail)}
            mr={8}
            mb={8}
            minw={50}
            bg={
              selectedTags.includes(tag.detail) ? defaultColors.primaryLight : defaultColors.smoke
            }
            c={selectedTags.includes(tag.detail) ? 'white' : undefined}
          />
        ))}
      </Flexer>
      <Divider mt={8} mb={12} />
      <Text t="h4" fw="600" mb={16}>
        Filter by Date
      </Text>
      <Flexer wrap>
        {dateFilters.map((filter) => (
          <Tag
            key={filter.value}
            label={filter.label}
            onClick={() => handleDateClick(filter.value)}
            mr={8}
            mb={8}
            minw={50}
            bg={
              selectedDateFilter === filter.value ? defaultColors.primaryLight : defaultColors.smoke
            }
            c={selectedDateFilter === filter.value ? 'white' : undefined}
          />
        ))}
      </Flexer>
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

        {authState.is_superuser && (
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
