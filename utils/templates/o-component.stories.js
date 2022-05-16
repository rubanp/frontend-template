import { html } from 'lit';

import './componentName.ts';

import Documentation from './componentName.docs.mdx';

export default {
  title: 'componentType/componentLabel',
  component: 'className',
  parameters: {
    docs: {
      page: Documentation,
    },
  },
};

const Template = ({
}) => html`<componentName></componentName>`;

export const StoryOne = Template.bind({});
StoryOne.args = {
};
