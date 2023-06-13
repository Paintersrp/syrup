export const getReadTime = (content: string): { wordCount: number; readTime: number } => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return { wordCount, readTime };
};
