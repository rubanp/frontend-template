import '../src/styles/main.css';
import '../src/styles/reset.css';
import { themes } from '@storybook/theming';
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

export const parameters = {
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
  backgrounds: {
    default: 'dark-grey',
    values: [
      {
        name: 'plain-white',
        value: '#ffffff',
      },
      {
        name: 'plain-black',
        value: '#000000',
      },
      {
        name: 'light-grey',
        value: "#cccccc"
      },
      {
        name: 'dark-grey',
        value: "#696969"
      }
    ],
    grid: {
      cellSize: 10,
      opacity: 0.5,
      cellAmount: 10,
      offsetX: 0,
      offsetY: 0,
    }
  },
}
