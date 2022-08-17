import { ThiefConfig } from './config';
import { copyFileItem } from './lib/copy-file';
import { getImportList } from './lib/get-imports-list';
import { getConfigToCopy } from './lib/normalize-path';

// run

void (async (): Promise<void> => {
  const result = await getImportList(ThiefConfig.getEntryFile());
  const list = result.map(getConfigToCopy).map(copyFileItem);
  console.log('=>', list);
})();
