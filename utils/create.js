// Copy across the boilerplate for a new component to the relevant directories
import Enquirer from 'enquirer';
import fse from 'fs-extra';
import { exec } from 'child_process';
import _ from 'lodash';

const { List, Input, Select } = Enquirer;

// Pick a component type: element, composite or region
const type = await new Select({
  name: 'type',
  message: 'Pick a component type',
  choices: ['element', 'composite', 'region', 'page'],
}).run((compType) => compType).catch((err) => console.error(err));

if (type !== 'page') {
  // Name the component
  const component = await new List({
    name: 'keywords',
    message: `What ${type} would you like to create?`,
  }).run().then((componentName) => componentName).catch(console.error);

  // Create appropriate names for the component depending on the context
  const componentName = `o-${_.kebabCase(component)}`;
  const className = _.upperFirst(_.camelCase(component));
  const componentLabel = _.startCase(component);

  // Create files
  fse.copy('./templates/o-component.ts', `./src/components/${type}s/${componentName}.ts`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.stories.js', `./stories/${componentName}.stories.js`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.docs.mdx', `./stories/${componentName}.docs.mdx`).catch((err) => console.error(err));

  // Set correct names within files
  setTimeout(() => {
    exec(`sed -i "" -e 's/componentName/${componentName}/' ./src/components/${type}s/${componentName}.ts`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/${type}s/${componentName}.ts`);
    exec(`sed -i "" -e 's/componentName/${componentName}/g' ./stories/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/className/${className}/' ./stories/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/componentLabel/${componentLabel}/' ./stories/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/componentType/Element/' ./stories/${componentName}.stories.js`);
  }, 500);
} else {
  const page = await new Input({
    name: 'pageName',
    message: 'What would you like to call the page?',
  }).run((pageName) => pageName).catch((err) => console.error(err));
  const pageName = _.trim(_.kebabCase(_.lowerCase(page)));
  fse.copy('./templates/page.html', `./src/${pageName}.html`).catch((err) => console.error(err));
  fse.copy('./templates/page.ts', `./src/scripts/${pageName}.ts`).catch((err) => console.error(err));
  setTimeout(() => {
    exec(`sed -i "" -e 's/page-title/${pageName}/' ./src/${pageName}.html`);
    exec(`sed -i "" -e 's/script-name/${pageName}/' ./src/${pageName}.html`);
  }, 500);
}
