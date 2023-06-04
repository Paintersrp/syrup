import React from "react";

import {
  BaseProps,
  Flexer,
  SectionHeader,
  SectionHeaderData,
} from "../../../../framework";
import { PostData } from "../../Landing";
import { PostCards } from "./components";

interface LatestPostsProps extends BaseProps {
  postsData: PostData[];
  headerData: SectionHeaderData | any;
  editMode: boolean;
}

const LatestPosts: React.FC<LatestPostsProps> = ({
  postsData,
  headerData,
  editMode,
  ...rest
}) => {
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
