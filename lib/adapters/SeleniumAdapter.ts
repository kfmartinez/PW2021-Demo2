import { Builder, By, IWebElement, until, WebDriver } from 'selenium-webdriver';
import IUiDriver from './IUiDriver';

export default class SeleniumAdapter implements IUiDriver {
  constructor(private browser: string, private driver?: WebDriver) {
    console.log('Running Selenium...');
    this.browser = browser;
    this.driver = new Builder().forBrowser(this.browser).build();
  }

  async click(locator: string): Promise<void> {
    await ((await this.searchElement(locator)) as IWebElement).click();
  }

  async type(locator: string, text: string): Promise<void> {
    await ((await this.searchElement(locator)) as IWebElement).sendKeys(text);
  }

  async waitForElementToLoad(locator: string, timeout: number = 8000): Promise<void> {
    await this.driver!.wait(await until.elementIsVisible(await this.searchElement(locator)), timeout);
  }

  async scrollIntoView(locator: string): Promise<void> {
    return await this.driver!.executeScript('arguments[0].scrollIntoView(true);', this.searchElement(locator));
  }

  async searchElement(locator: string, ms: number = 1000, ctr: number = 0): Promise<any> {
    let by;
    if (locator[0] === '/') {
      by = By.xpath(locator);
    } else {
      by = By.css(locator);
    }
    let elem = undefined;
    while (elem === undefined && ctr < 10) {
      try {
        elem = await this.driver!.findElement(by);
        break;
      } catch (err) {
        await this.sleep(ms);
        ctr++;
      }
    }
    return elem!;
  }

  async selectDropdown(locator: string): Promise<void> {
    await ((await this.searchElement(locator)) as IWebElement).click();
  }

  async isDisplayed(locator: string): Promise<boolean> {
    return await ((await this.searchElement(locator)) as IWebElement).isDisplayed();
  }

  async maximize(): Promise<void> {
    return await this.driver!.manage().window().maximize();
  }

  async navigateTo(url: string): Promise<void> {
    return await this.driver!.get(url);
  }

  async close(): Promise<void> {
    return await this.driver!.quit();
  }

  async sleep(ms: number = 3000): Promise<void> {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
