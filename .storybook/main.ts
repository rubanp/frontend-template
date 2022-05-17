import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  stories: ['../src/components/**/**/*.stories.@(js|mdx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
  ],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-vite",
  },
};

export default config;
