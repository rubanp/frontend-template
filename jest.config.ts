import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './src/components',
  verbose: true,
  preset: 'jest-puppeteer',
};

export default config;
