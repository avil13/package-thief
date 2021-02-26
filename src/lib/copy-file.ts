import fs from 'fs-extra';

import { isFilePath } from './is-file-path';
import { ICopyParam } from './normalize-path';

export const copyFileItem = async (param: ICopyParam): Promise<boolean> => {
  await fs.copy(param.from, param.to);

  return await isFilePath(param.to);
};
