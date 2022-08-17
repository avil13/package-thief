import { ImportSpecifier } from 'es-module-lexer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const param = {
  package: {
    root: process.env.PACKAGE_ROOT,
    entryFile: process.env.PACKAGE_ENTRY_FILE,
    postfix: ['/index.ts', '.ts', '', '/_variables.scss'],
  },
  generate: {
    path: path.join(__dirname, '../generated'),
  },
};

export class ThiefConfig {
  static getDistPath(): string {
    return param.generate.path;
  }

  static getPackageRoot(): string {
    if (!param.package.root) {
      throw new Error('Wrong config: "param.package.root"')
    }
    return param.package.root;
  }

  static getPackageRootRegExp(): RegExp {
    if (!param.package.root) {
      throw new Error('Wrong config: "param.package.root"')
    }
    return new RegExp(`^${param.package.root}`, 'i');
  }

  static getEntryFile(): string {
    if (!param.package.root) {
      throw new Error('Wrong config: "param.package.root"')
    }
    if (!param.package.entryFile) {
      throw new Error('Wrong config: "param.package.entryFile"')
    }
    return path.join(param.package.root, param.package.entryFile);
  }

  static getPathByFile(
    filePath: string,
    importSpecifier: ImportSpecifier
  ): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const importPath = (importSpecifier as any).n as string;

    const dir = path.dirname(filePath);

    return path.normalize(dir + '/' + importPath);
  }

  static getFilePostfix(): string[] {
    return param.package.postfix;
  }

  static getCopyPath(normalizedPath: string): string {
    return path.join(param.generate.path, normalizedPath);
  }
}
