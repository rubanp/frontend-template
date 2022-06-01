import Enquirer from 'enquirer';
import childProcess, { exec } from 'child_process';
import fs from 'fs';
import boxen from 'boxen';

// Display current commit intentions
fs.readFile('./templates/new.commit', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(boxen(data.toString('utf8'), {
      title: 'commit intentions', titleAlignment: 'center', borderColor: 'blue', padding: 1,
    }));
  }
});

let editTemplate = false;

// Ask if user would like to edit the intentions
const { Toggle } = Enquirer;
setTimeout(async () => {
  editTemplate = await new Toggle({
    message: 'Would you like to edit your commit intentions to better reflect the changes you made?',
    enabled: 'Yes',
    disabled: 'No',
  }).run().then((answer) => answer).catch((err) => console.error(err));
}, 100);

if (editTemplate) {
  childProcess.spawn('nvim', ['./templates/new.commit'], {
    stdio: 'inherit',
  });
}

exec('git commit --allow-empty -m "$(cat "./templates/new.commit")"');
