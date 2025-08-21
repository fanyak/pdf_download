// https://scrapingant.com/blog/puppeteer-download-file

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// const https = require('https');

// function moveFile(filename, destination = 'assets/pdf_downloads') {
 
//   const oldPath = path.join('../', 'Downloads', filename);
//   const newPath = path.join(__dirname, destination, filename);

//   fs.rename(oldPath, newPath, (err) => {
//     if (err) throw err;
//     console.log('File moved successfully!');
//   });
// }

// function readFromCSVAndDownload( ) {
//   const rl = readline.createInterface({
//     input: fs.createReadStream(filePath),
//     crlfDelay: Infinity
//   });
//   rl.on('line', async (line) => {
//     urls.push(line);
//   })
// }


(async () => {
  const filePath = 'assets/pdfs_404-504.csv'
  const urls = []

  const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });
  rl.on('line', async (url) => {
    urls.push(url)
    
  });
  rl.on('close', async () => {
    for(url of urls) {
      // const filename = url.split('=').pop();
      console.log(url)
      const browser = await puppeteer.launch({
        headless: false,
        // Use 'firefox' if you want to use Firefox browser
        browser: 'firefox',
        defaultViewport: null,
        args: ['--start-maximized']
      });
      // const context = browser.defaultBrowserContext();
      const page = await browser.newPage();
      await page.goto(url)    
      // Click the download button
      //.click('#download');
      await page.click('#cardDownload').then(async () => {
        try {
          // fake wait for no show - wait for 5000
          //await page.waitForFileChooser({ timeout: 5000 })
          await  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        } catch (error) {
        } finally {
            await browser.close()
        }
      })
    }
    

    /// Wait for download to complete when a new window is opened with the address to the downloaded file
    // context.on('targetcreated', async (target) => {
    //   await browser.close()
    //   //.then(() => {
    //     // const oldPath = path.join('../', 'Downloads', filename);
    //     // const newPath = path.join(__dirname, 'assets/pdf_downloads', filename);

    //     // fs.rename(oldPath, newPath, (err) => {
    //     //   if (err) throw err;
    //     //   console.log('File moved successfully!');
    //     // });
    //   //});

    // });
  });
})();
