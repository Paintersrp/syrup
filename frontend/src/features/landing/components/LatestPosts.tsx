import React from 'react';

import { BaseProps } from '@/components/Elements';
import { Flexer } from '@/components/Containers';

import PostCards from './PostCards';
import { PostType } from '@/features/posts/routes/Posts';
import { SectionHeader, SectionHeaderData } from '@/components/Built';

interface LatestPostsProps extends BaseProps {
  postsData: PostType[];
  headerData: SectionHeaderData | any;
  editMode: boolean;
}

const LatestPosts: React.FC<LatestPostsProps> = ({ postsData, headerData, editMode, ...rest }) => {
  return (
    <Flexer j="c" a="c" mb={0} style={{ minWidth: 325 }} {...rest}>
      <Flexer fd="column" style={{ maxWidth: 1200, padding: 20 }}>
        <SectionHeader
          headerData={headerData}
          editMode={editMode}
          formTitle="Edit Latest Posts Header"
        />
        <PostCards
          posts={postsData}
          // carousel={isSmallScreen ? true : false}
          editMode={editMode}
        />
      </Flexer>
    </Flexer>
  );
};

export default LatestPosts;
