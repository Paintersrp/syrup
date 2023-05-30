import React from "react";

import { Flexer } from "../../../../framework/Containers";
import {
  SectionHeader,
  SectionHeaderData,
} from "../../../../framework/Prebuilt";
import { Post, PostCards } from "./components";

interface LatestPostsProps {
  postsData: Post[];
  headerData: SectionHeaderData | any;
  editMode: boolean;
}

const LatestPosts: React.FC<LatestPostsProps> = ({
  postsData,
  headerData,
  editMode,
}) => {
  return (
    <Flexer j="c" a="c" mb={24} style={{ minWidth: 325 }}>
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
