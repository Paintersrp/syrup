import fs from "fs";
import path from "path";

const folderName = process.argv[2];

if (!folderName) {
  console.error("Please provide a folder name.");
  process.exit(1);
}

const currentDir = process.env.INIT_CWD || process.cwd();
const folderPath = path.resolve(currentDir, folderName);

fs.mkdirSync(folderPath);
console.log(`Created folder: ${folderPath}`);

const tsxFilePath = path.join(folderPath, `${folderName}.tsx`);
fs.writeFileSync(tsxFilePath, "", "utf-8");
console.log(`Created file: ${tsxFilePath}`);

const componentsFolderPath = path.join(folderPath, "components");
fs.mkdirSync(componentsFolderPath);
console.log(`Created folder: ${componentsFolderPath}`);

const indexFilePath = path.join(componentsFolderPath, "index.ts");
fs.writeFileSync(indexFilePath, "", "utf-8");
console.log(`Created file: ${indexFilePath}`);
