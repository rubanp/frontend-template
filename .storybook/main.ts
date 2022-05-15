import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    '@storybook/addon-jest',
  ],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-vite",
  },
};

export default config;
