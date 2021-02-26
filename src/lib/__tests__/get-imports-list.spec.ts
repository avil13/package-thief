import { ThiefConfig } from './../../config';
import { getImportList } from '../get-imports-list';
import { getConfigToCopy, normalizePath } from '../normalize-path';
import { copyFileItem } from '../copy-file';

describe('get-imports-list', () => {
  let result: string[] = [];

  beforeEach(async () => {
    result = await getImportList(ThiefConfig.getEntryFile());
  });

  xit('список импортов', () => {
    const list = result.filter((v) => /VSheet/.test(v));
    expect(list).toBe('');
  });

  xit('список файлов директории пакета', () => {
    const list = result.map((srcPath) => normalizePath(srcPath));
    expect(list.length).toBe(91);
  });

  xit('список путей скопированных файлов', () => {
    const list = result.map(getConfigToCopy);

    expect(list[0]).toBe(91);
  });

  xit('копирование файлов', () => {
    const list = result.map(getConfigToCopy).map(copyFileItem);

    expect(list[0]).toBe(91);
  });
});
