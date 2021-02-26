import { ThiefConfig } from '../config';

export const normalizePath = (filePath: string): string => {
  const reg = ThiefConfig.getPackageRootRegExp();

  if (!reg.test(filePath)) {
    throw new Error(`wrong path "${filePath}"`);
  }

  return filePath.replace(reg, '');
};

export interface ICopyParam {
  from: string;
  to: string;
  log: string;
}

export const getConfigToCopy = (filePath: string): ICopyParam => {
  const nPath = normalizePath(filePath);
  return {
    from: filePath,
    to: ThiefConfig.getCopyPath(nPath),
    log: nPath,
  };
};
