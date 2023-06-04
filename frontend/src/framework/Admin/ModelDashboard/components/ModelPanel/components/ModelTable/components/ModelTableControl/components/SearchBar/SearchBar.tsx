import React from "react";

import { Flexer, Item } from "../../../../../../../../../../Containers";
import { Button, Input } from "../../../../../../../../../../Components";

interface SearchBarProps {
  handleClearSearch: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleClearSearch,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Item xs={12} sm={6}>
      <Flexer j="fe">
        <Button
          w="auto"
          mr={6}
          size="medium"
          textSize="0.9rem"
          className={`${searchTerm === "" ? "error-button" : "success-button"}`}
          onClick={handleClearSearch}
          disabled={searchTerm === ""}
          style={{ borderRadius: 6, height: 24 }}
        >
          Clear
        </Button>
        <Input
          size="medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 200 }}
        />
      </Flexer>
    </Item>
  );
};

export default SearchBar;
