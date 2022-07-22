import fs from 'fs';
import boxen from 'boxen';

fs.readFile('./templates/new.commit', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(boxen(data.toString('utf8'), {
      title: 'commit intentions', titleAlignment: 'center', borderColor: 'blue', padding: 1,
    }));
  }
});
