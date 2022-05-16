import chalk from 'chalk';
import Enquirer from 'enquirer';
import fse from 'fs-extra';
import { exec } from 'child_process';
import _ from 'lodash';

const { List, Input } = Enquirer;

const pages = await new List({
  name: 'keywords',
  message: `What extra pages would you like to create? ${chalk.grey.dim('(none)')}`,
}).run().then((answer) => answer).catch(console.error);

pages.forEach((page) => {
  fse.copy('./utils/templates/page.html', `./src/${page}.html`)
    .catch((err) => console.error(err));
  fse.copy('./utils/templates/page.ts', `./src/scripts/${page}.ts`, (err) => {
    if (err) console.error(err);
  });
});

for (const page of pages) {
  const pageTitle = await new Input({
    name: `${page}`,
    message: `${chalk.whiteBright('What title would you like to give the page')} ${chalk.redBright.bold(page)}${chalk.redBright('.html')}`,
    initial: `${_.capitalize(page)}`
  }).run().then((pageTitle) => pageTitle).catch(console.error);
  exec(`sed -i "" -e 's/page-title/${pageTitle}/' ./src/${page}.html`);
  exec(`sed -i "" -e 's/script-name/${page}/' ./src/${page}.html`);
}
