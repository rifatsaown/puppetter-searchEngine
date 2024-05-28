import puppeteer from "puppeteer";

const searchWord = async (word: string): Promise<void> =>{
  const browser = await puppeteer.launch({headless: false});
  try {
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(word)}`
    );

    await page.waitForSelector("h3");
    const searchResults = await page.evaluate(() => {
      const results: string[] = [];
      const titles = document.querySelectorAll("h3");
      titles.forEach((title: Element) => {
        results.push(title.textContent as string);
      });
      return results;
    });

    console.log("Search results:");
    searchResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result}`);
    });
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await browser.close();
  }
}
searchWord("TypeScript");
