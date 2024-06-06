import puppeteer from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";

console.log("Start screenshot");

async function screenshot() {
    const browser = await puppeteer.launch({
        channel: "chrome",
        headless: true,
        args: ["--lang=ja"],
    });
    console.log("Browser launched");
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    const uri = "https://kanakanho.github.io/munsell-colors/";
    await page.goto(uri, { waitUntil: "networkidle0" });

    console.log("Page loaded");
    await page.evaluate((_) => {
        window.scrollTo(0, 0);
    });

    console.log("Scrolling page to bottom");
    await scrollPageToBottom(page, {
        size: 400,
        delay: 250,
        stepsLimit: 50,
    });

    console.log("Page scrolled to bottom");
    await page.screenshot({ path: "./screenshot.png", fullPage: true });
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
