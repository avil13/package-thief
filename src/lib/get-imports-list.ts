import { ImportSpecifier, init, parse } from 'es-module-lexer';
import { promises as fsPromises } from 'fs';
import { ThiefConfig } from './../config';
import { isFilePath } from './is-file-path';

const readFile = fsPromises.readFile;


const getFullImportPaths = async (
  filePath: string,
  importSpecifier: ImportSpecifier
): Promise<string[] | null> => {
  const importPath = ThiefConfig.getPathByFile(filePath, importSpecifier);

  const exts = ThiefConfig.getFilePostfix();

  const result = [];

  for (const ext of exts) {
    const isFile = await isFilePath(`${importPath}${ext}`);

    if (isFile) {
      result.push( `${importPath}${ext}`);
    }
  }

  return result.length ? result : null;
};

const allImportsSet = new Set<string>();

/**
 *
 */
export const getImportList = async (pathToFile: string): Promise<string[]> => {
  await init;

  if (allImportsSet.has(pathToFile)) {
    return Array.from(allImportsSet);
  }

  allImportsSet.add(pathToFile);

  const source = await readFile(pathToFile, 'utf8');

  const [imports] = parse(source, 'optional-sourcename');

  if (imports.length === 0) {
    return Array.from(allImportsSet);
  }

  for (const iterator of imports) {
    const fullImportPaths = await getFullImportPaths(pathToFile, iterator);

    if (fullImportPaths) {
      for (const importPath of fullImportPaths) {
        await getImportList(importPath);
      }
    }
  }

  return Array.from(allImportsSet);
};
