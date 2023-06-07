import React from "react";

const filterState = (
  event: React.MouseEvent<HTMLButtonElement>,
  filterItem: string,
  state: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  event.stopPropagation();
  if (state.includes(filterItem)) {
    setState(state.filter((c) => c !== filterItem));
  } else {
    setState([...state, filterItem]);
  }
};

export { filterState };
