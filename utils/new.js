import Enquirer from 'enquirer';
import chalk from 'chalk';
import inquirer from 'inquirer';
import MaxLengthInputPrompt from 'inquirer-maxlength-input-prompt';
import childProcess, { exec } from 'child_process';
import fs from 'fs';
import boxen from 'boxen';

import descriptions from './descriptions.js';
import emojis from './emojis.js';

exec('rm ./templates/new.commit');

console.log(chalk.blue.underline("Set your intentions for the changes you're about to make"));

// Create list of options for commit type
// Create an array of options by combing the object with emojis for each type
// and the object with descriptions for each type
const options = [];
for (const [key, value] of Object.entries(descriptions)) {
  options.push(`${emojis[key]} ${key}: ${chalk.italic.yellow(value)}`);
}

// Get user to pick one of the options for the commit type
const { AutoComplete } = Enquirer;
const typeWithDescription = await new AutoComplete({
  name: 'commit',
  message: 'What changes are you making?',
  choices: options,
}).run().then((option) => option).catch((err) => console.error(err));

if (!typeWithDescription) process.exit(1);

const type = typeWithDescription.replace(/:.*/, ':');

if (type.includes('init')) {
  exec(`echo "${type} Initialise project with boilerplate code." > ./templates/new.commit`);
  process.exit(1);
}

if (type.includes('start')) {
  exec(`echo "${type} Start new empty project." > ./templates/new.commit`);
  process.exit(1);
}

// Get user to write a summary of max length 50 characters for the commit
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);
const { summary } = await inquirer.prompt([
  {
    type: 'maxlength-input',
    name: 'summary',
    message: 'Write a brief summary of the changes you intend on making:',
    maxLength: 50,
  },
]).then((answer) => answer);

if (!summary) {
  // Create an empty git commit
  exec(`echo "${type} ${summary}" > ./templates/new.commit`);
  process.exit(1);
}


// Prompt for an optional detailed description
const { Toggle } = Enquirer;

const detailed = await new Toggle({
  message: 'Would you like to write a more detailed description or todo list?',
  enabled: 'Yes',
  disabled: 'No',
}).run((answer) => answer).catch((err) => console.error(err));

// Open vim to write detailed description
if (detailed) {
  exec('echo "\n -" >> ./templates/new.commit');
  const child = childProcess.spawn('nvim', ['./templates/new.commit'], {
    stdio: 'inherit',
  });
  child.on('exit', () => {
    fs.readFile('./templates/new.commit', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(boxen(data.toString('utf8').replace(/^\s+|\s+$/g, ''), {
          title: 'commit intentions', titleAlignment: 'center', borderColor: 'blue', padding: 1,
        }));
      }
    });
  });
} else {
  fs.readFile('./templates/new.commit', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(boxen(data.toString('utf8').replace(/^\s+|\s+$/g, ''), {
        title: 'commit intentions', titleAlignment: 'center', borderColor: 'blue', padding: 1,
      }));
    }
  });
}
