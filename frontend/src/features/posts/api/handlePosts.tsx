import { scrollToTop } from '@/utils';

export const handleCreatePost = (navigate: any) => {
  navigate(`/post/create`);
};

type SetTagsFn = (data: string[]) => void;

export const handleTagClick = (tag: string, selectedTags: string[], setSelectedTags: SetTagsFn) => {
  if (selectedTags.includes(tag)) {
    setSelectedTags(selectedTags.filter((t: string) => t !== tag));
  } else {
    setSelectedTags([...selectedTags, tag]);
  }
  scrollToTop();
};

type SetDateFn = (data: number) => void;

export const handleDateClick = (filterOption: number, setSelectedDateFilter: SetDateFn) => {
  setSelectedDateFilter(filterOption);
  scrollToTop();
};
