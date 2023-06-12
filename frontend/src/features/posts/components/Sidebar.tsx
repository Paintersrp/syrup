import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css';

import { Divider, Tag, Text, Tooltip } from '../../../components/Elements';
import { IconButton } from '../../../components/Buttons';
import { palettes } from '../../../utils';
import { Flexer } from '../../../components/Containers';

interface SidebarProps {
  tags: any;
  handleTagClick: (tag: string) => void;
  selectedTags: string[];
  handleCreate: () => void;
  auth: { is_superuser: boolean };
  handleDateFilterClick: any;
  selectedDateFilter: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  tags,
  handleTagClick,
  selectedTags,
  handleCreate,
  auth,
  handleDateFilterClick,
  selectedDateFilter,
}) => {
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
            bg={selectedTags.includes(tag.detail) ? palettes.primary.main : undefined}
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
            onClick={() => handleDateFilterClick(filter.value)}
            mr={8}
            mb={8}
            minw={50}
            bg={selectedDateFilter === filter.value ? palettes.primary.main : undefined}
            c={selectedDateFilter === filter.value ? 'white' : undefined}
          />
        ))}
      </Flexer>
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

export default Sidebar;
