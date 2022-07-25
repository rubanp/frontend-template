import Enquirer from 'enquirer';
import childProcess, { exec } from 'child_process';
import fs from 'fs';
import boxen from 'boxen';

// Display current commit intentions
fs.readFile('./templates/new.commit', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(boxen(data.toString('utf8').replace(/^\s+|\s+$/g, ''), {
      title: 'commit intentions', titleAlignment: 'center', borderColor: 'blue', padding: 1,
    }));
  }
});

// Ask if user would like to edit the intentions
const { Toggle } = Enquirer;
setTimeout(async () => {
  const editTemplate = await new Toggle({
    message: 'Would you like to edit your commit intentions to better reflect the changes you made?',
    enabled: 'Yes',
    disabled: 'No',
  }).run().then((answer) => answer).catch((err) => console.error(err));
  if(editTemplate === undefined) {
    process.exit(1);
  }
  if(editTemplate === true) {
    childProcess.spawn('nvim', ['./templates/new.commit'], {
      stdio: 'inherit',
    });
  }
  exec('git commit -m "$(cat "./templates/new.commit")"');
  exec('rm ./templates/new.commit');
}, 100);
