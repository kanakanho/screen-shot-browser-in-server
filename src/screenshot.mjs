import puppeteer from "puppeteer";

console.log("Start screenshot");

async function screenshot() {
  const browser = await puppeteer.launch({
    channel: "chrome",
    headless: true,
    args: ["--lang=ja"],
  });
  console.log("Browser launched");
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const uri = "https://example.com";
  await page.goto(uri, { waitUntil: "networkidle0" });

  console.log("Page loaded");
  await page.evaluate((_) => {
    window.scrollTo(0, 0);
  });

  await page.screenshot({ path: `./${new Date().getTime().toString()}.png` });
  console.log("Screenshot saved");
  await browser.close();
  console.log("Browser closed");
}

(async () => {
  try {
    await screenshot();
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
})();

// Run
// $ node --experimental-modules src/screenshot.mjs
