import fs from 'fs';
import path from 'path';

type PathOptions = {
  env: 'production' | 'development';
  cwd: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPaths = ({ env, cwd }: PathOptions) => {
  const rootDir = fs.readdirSync(cwd);
  if (
    !rootDir.includes('vite.config.js') &&
    !rootDir.includes('vite.config.ts')
  ) {
    throw new Error(
      'No vite.config.js or vite.config.ts found in root directory'
    );
  }

  const isProd = env === 'production';
  const OUTPUT_DIR = path.join(cwd, 'dist');
  const SOURCE_DIR = path.join(cwd, 'src');
  const ASSETS_DIR = path.join(cwd, 'assets');
  const TEMP_OUTPUT_DIR = path.join(OUTPUT_DIR, '__temp_abell');

  return {
    ENTRY_BUILD_PATH: isProd
      ? path.join(TEMP_OUTPUT_DIR, 'entry.build.js')
      : path.join(SOURCE_DIR, 'entry.build'),
    TEMP_OUTPUT_DIR,
    SOURCE_DIR,
    ASSETS_DIR,
    OUTPUT_DIR
  };
};
