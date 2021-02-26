import fs, { promises as fsPromises } from 'fs';

export const isFilePath = async (importPath: string): Promise<boolean> => {
  const hasAccess = await fsPromises
    .access(importPath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!hasAccess) {
    return false;
  }

  const stat = await fsPromises.lstat(importPath);
  return stat.isFile();
};
