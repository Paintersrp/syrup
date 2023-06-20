import { FC } from 'react';
import { Link } from 'react-router-dom';
import './css/PostsSidebar.css';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Divider, Tag, Text, Tooltip } from '@/components/Elements';

import { colors } from '@/theme/common';
import { useAuthStore } from '@/stores/auth';

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
  const { authState } = useAuthStore();

  const dateFilters = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last year', value: 365 },
    { label: 'All', value: null },
  ];

  return (
    <div className="chipContainer sidebarContainer">
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
            bg={selectedTags.includes(tag.detail) ? colors.primary.main : undefined}
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
            bg={selectedDateFilter === filter.value ? colors.primary.main : undefined}
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
