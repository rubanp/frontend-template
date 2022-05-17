import chalk from 'chalk';
import Enquirer from 'enquirer';
import fse from 'fs-extra';
import { exec } from 'child_process';
import _ from 'lodash';

const { List, Select } = Enquirer;
const type = await new Select({
  name: 'type',
  message: 'Pick a component type',
  choices: ['element', 'composite', 'section'],
}).run((compType) => compType).catch((err) => console.error(err));

const components = await new List({
  name: 'keywords',
  message: `What ${type}s would you like to create? ${chalk.grey.dim('(none)')}`,
}).run()
  .then((componentNames) => componentNames.map((componentName) => componentName.toLowerCase()))
  .catch(console.error);

// Create files
components.forEach((component) => {
  const componentName = `o-${_.kebabCase(component)}`;
  fse.mkdirp(`./src/components/${type}s/${componentName}`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.ts', `./src/components/${type}s/${componentName}/${componentName}.ts`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.stories.js', `./src/components/${type}s/${componentName}/${componentName}.stories.js`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.docs.mdx', `./src/components/${type}s/${componentName}/${componentName}.docs.mdx`).catch((err) => console.error(err));
  fse.copy('./templates/o-component.test.js', `./src/components/${type}s/${componentName}/${componentName}.test.js`).catch((err) => console.error(err));
});

// Set correct names within files
setTimeout(() => {
  components.forEach((component) => {
    const componentName = `o-${_.kebabCase(component)}`;
    const className = _.upperFirst(_.camelCase(component));
    const componentLabel = _.startCase(component);
    exec(`sed -i "" -e 's/componentName/${componentName}/' ./src/components/${type}s/${componentName}/${componentName}.ts`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/${type}s/${componentName}/${componentName}.ts`);
    exec(`sed -i "" -e 's/componentName/${componentName}/' ./src/components/${type}s/${componentName}/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/${type}s/${componentName}/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/componentLabel/${componentLabel}/' ./src/components/${type}s/${componentName}/${componentName}.stories.js`);
    exec(`sed -i "" -e 's/componentType/Element/' ./src/components/${type}s/${componentName}/${componentName}.stories.js`);
  });
}, 500);
