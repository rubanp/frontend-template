import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  puppeteer: true,
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        executablePath: '/Users/ruban/Code/frontend-template/node_modules/puppeteer/.local-chromium/mac-991974/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
        headless: true,
        devtools: true,
        args: ['--disable-gpu', '--no-sandbox'],
      },
    }),
  ],
};
