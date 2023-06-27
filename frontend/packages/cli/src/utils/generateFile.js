import fs from 'fs-extra';

export const generateFile = async (filePath, content, fileList) => {
  await fs.writeFile(filePath, content);
  fileList.push(filePath);
};
