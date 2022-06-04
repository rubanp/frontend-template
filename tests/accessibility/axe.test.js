import puppeteer from 'puppeteer';
import axe from 'axe-core';
import fs from 'fs';
import fse from 'fs-extra';
import util from 'util';
import { exec } from 'child_process';
import { expect } from '@esm-bundle/chai';
import now from '../../utils/dateTimeString.js';

const execAsync = util.promisify(exec);

const url = 'http://127.0.0.1:8080';
const folder = 'dist';

const { stdout } = await execAsync(`ls ./${folder}`);
const pageNames = stdout.match(/.*\.html/g);

describe('Accessability', () => {
  pageNames.forEach((pageName) => {
    it(`${pageName}`, async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setBypassCSP(true);
      await page.goto(`${url}/${pageName}`);
      await page.addScriptTag({
        path: 'node_modules/axe-core/axe.min.js',
      });
      const axeResults = await page.evaluate(() => axe.run());
      delete axeResults.passes;
      delete axeResults.inapplicable;
      delete axeResults.incomplete;
      const fileName = `axe-${pageName.split('.')[0]}.json`;
      fse.outputFile(`logs/accessibility-tests/${now}/${fileName}`, JSON.stringify(axeResults, 0, 4), (err) => {
        if (err) {
          console.error(err);
        }
      });
      await browser.close();
      expect(`${axeResults.violations.length} violations`).to.equal(
        '0 violations',
        `${JSON.stringify(axeResults.violations.map((violation) => ({
          id: violation.id,
          description: violation.description,
          help: violation.helpUrl,
        })), 0, 4)}
    `,
      );
    });
  });
});
