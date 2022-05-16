import chalk from 'chalk';
import Enquirer from 'enquirer';
import fse from 'fs-extra';
import { exec } from 'child_process';
import _ from 'lodash';

const { List } = Enquirer;

// Create pages
// ============

// Get page names
const pages = await new List({
  name: 'keywords',
  message: `What extra pages would you like to create? ${chalk.grey.dim('(none)')}`,
}).run().then((pageNames) => {
  return pageNames.map((pageName) => _.kebabCase(pageName.toLowerCase()));
}).catch(console.error);

pages.forEach((page) => {
  fse.copy('./utils/templates/page.html', `./src/${page}.html`)
    .catch((err) => console.error(err));
  fse.copy('./utils/templates/page.ts', `./src/scripts/${page}.ts`, (err) => {
    if (err) console.error(err);
  });
});

// Get title names for pages
setTimeout(() => {
  for (const page of pages) {
    exec(`sed -i "" -e 's/page-title/${page}/' ./src/${page}.html`);
    exec(`sed -i "" -e 's/script-name/${page}/' ./src/${page}.html`);
  }
}, 500)

// Create element components
// =========================

// Get element components' names
const elements = await new List({
  name: 'keywords',
  message: `What element components would you like to create? ${chalk.grey.dim('(none)')}`,
}).run().then((elementNames) => {
  return elementNames.map((elementName) => elementName.toLowerCase())
}).catch(console.error);

// Create files
elements.forEach((element) => {
  const elementName = 'o-' + _.kebabCase(element);
  fse.mkdirp(`./src/components/elements/${elementName}`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.ts', `./src/components/elements/${elementName}/${elementName}.ts`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.stories.js', `./src/components/elements/${elementName}/${elementName}.stories.js`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.docs.mdx', `./src/components/elements/${elementName}/${elementName}.docs.mdx`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.test.js', `./src/components/elements/${elementName}/${elementName}.test.js`).catch((err) => console.error(err));
})

// Set correct names within files
setTimeout(() => {
  elements.forEach((element) => {
    const elementName = 'o-' + _.kebabCase(element);
    const className = _.upperFirst(_.camelCase(element));
    const componentLabel = _.startCase(element);
    exec(`sed -i "" -e 's/componentName/${elementName}/' ./src/components/elements/${elementName}/${elementName}.ts`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/elements/${elementName}/${elementName}.ts`);
    exec(`sed -i "" -e 's/componentName/${elementName}/' ./src/components/elements/${elementName}/${elementName}.stories.js`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/elements/${elementName}/${elementName}.stories.js`);
    exec(`sed -i "" -e 's/componentLabel/${componentLabel}/' ./src/components/elements/${elementName}/${elementName}.stories.js`);
    exec(`sed -i "" -e 's/componentType/Element/' ./src/components/elements/${elementName}/${elementName}.stories.js`);
  })

}, 500)

// Create composite components
// ===========================

// Get composite components' names
const composites = await new List({
  name: 'keywords',
  message: `What composite components would you like to create? ${chalk.grey.dim('(none)')}`,
}).run().then((compositeNames) => {
  return compositeNames.map((compositeName) => compositeName.toLowerCase())
}).catch(console.error);

// Create files
composites.forEach((composite) => {
  const compositeName = 'o-' + _.kebabCase(composite);
  fse.mkdirp(`./src/components/composites/${compositeName}`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.ts', `./src/components/composites/${compositeName}/${compositeName}.ts`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.stories.js', `./src/components/composites/${compositeName}/${compositeName}.stories.js`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.docs.mdx', `./src/components/composites/${compositeName}/${compositeName}.docs.mdx`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.test.js', `./src/components/composites/${compositeName}/${compositeName}.test.js`).catch((err) => console.error(err));
})

// Set correct names within files
setTimeout(() => {
  composites.forEach((composite) => {
    const compositeName = 'o-' + _.kebabCase(composite);
    const className = _.upperFirst(_.camelCase(composite));
    const componentLabel = _.startCase(composite);
    exec(`sed -i "" -e 's/componentName/${compositeName}/' ./src/components/composites/${compositeName}/${compositeName}.ts`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/composites/${compositeName}/${compositeName}.ts`);
    exec(`sed -i "" -e 's/componentName/${compositeName}/' ./src/components/composites/${compositeName}/${compositeName}.stories.js`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/composites/${compositeName}/${compositeName}.stories.js`);
    exec(`sed -i "" -e 's/componentLabel/${componentLabel}/' ./src/components/composites/${compositeName}/${compositeName}.stories.js`);
    exec(`sed -i "" -e 's/componentType/Composite/' ./src/components/composites/${compositeName}/${compositeName}.stories.js`);
  })

}, 500)

// Create sections components
// ==========================

// Get section components' names
const sections = await new List({
  name: 'keywords',
  message: `What section components would you like to create? ${chalk.grey.dim('(none)')}`,
}).run().then((sectionNames) => {
  return sectionNames.map((sectionName) => sectionName.toLowerCase())
}).catch(console.error);

// Create files
sections.forEach((section) => {
  const sectionName = 'o-' + _.kebabCase(section);
  fse.mkdirp(`./src/components/sections/${sectionName}`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.ts', `./src/components/sections/${sectionName}/${sectionName}.ts`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.stories.js', `./src/components/sections/${sectionName}/${sectionName}.stories.js`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.docs.mdx', `./src/components/sections/${sectionName}/${sectionName}.docs.mdx`).catch((err) => console.error(err));
  fse.copy('./utils/templates/o-component.test.js', `./src/components/sections/${sectionName}/${sectionName}.test.js`).catch((err) => console.error(err));
})

// Set correct names within files
setTimeout(() => {
  sections.forEach((section) => {
    const sectionName = 'o-' + _.kebabCase(section);
    const className = _.upperFirst(_.camelCase(section));
    const componentLabel = _.startCase(section);
    exec(`sed -i "" -e 's/componentName/${sectionName}/' ./src/components/sections/${sectionName}/${sectionName}.ts`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/sections/${sectionName}/${sectionName}.ts`);
    exec(`sed -i "" -e 's/componentName/${sectionName}/' ./src/components/sections/${sectionName}/${sectionName}.stories.js`);
    exec(`sed -i "" -e 's/className/${className}/' ./src/components/sections/${sectionName}/${sectionName}.stories.js`);
    exec(`sed -i "" -e 's/componentLabel/${componentLabel}/' ./src/components/sections/${sectionName}/${sectionName}.stories.js`);
    exec(`sed -i "" -e 's/componentType/Section/' ./src/components/sections/${sectionName}/${sectionName}.stories.js`);
  })

}, 500)
