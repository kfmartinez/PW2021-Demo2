import IUiDriver from './IUiDriver';
import { Page } from 'puppeteer';
const puppeteer = require('puppeteer');

export default class PuppeteerAdapter implements IUiDriver {
  constructor(private browser: string, private driver?: Page) {
    console.log('Running Puppeteer...');
    this.browser = browser;
  }

  async click(locator: string): Promise<void> {
    return await this.driver?.click(locator);
  }

  async type(locator: string, text: string): Promise<void> {
    return await this.driver?.type(locator, text);
  }

  async waitForElementToLoad(locator: string, timeout: number = 8000): Promise<void> {
    await this.driver?.waitForSelector(locator, { timeout: timeout });
  }

  async scrollIntoView(locator: string): Promise<void> {
    if (await this.driver?.waitForSelector(locator, { visible: true })) {
      await this.driver?.$eval(locator, (elem) => elem.scrollIntoView());
    }
  }

  async searchElement(locator: string): Promise<any> {
    if (locator && locator[0] === '/') {
      if ((await this.driver?.waitForXPath(locator), { timeout: 8000 })) {
        const elements = await this.driver?.$x(locator);
        if (elements && elements.length > 0) {
          return elements[0];
        }
      }
    } else {
      if (await this.driver?.waitForSelector(locator, { timeout: 8000 })) {
        const element = await this.driver?.$(locator);
        if (element) return element;
      }
    }
    return undefined;
  }

  async selectDropdown(locator: string): Promise<void> {
    let selector = '';
    if (locator[0] === '/' && locator[1] === '/') {
      selector = locator.slice(2);
    } else if (locator[0] === '/') {
      selector = locator.slice(1);
    }
    let newSelector = selector.split('/')[0];
    let val = /"([^;]+)"/.exec(selector)![1];
    await this.driver?.select(newSelector, val);
  }

  async isDisplayed(locator: string): Promise<boolean> {
    if (await this.driver?.waitForSelector(locator, { visible: true })) {
      return true;
    }
    return false;
  }

  async maximize(): Promise<void> {
    let browser = await require('puppeteer').launch({
      headless: false,
      product: this.browser,
      defaultViewport: null,
      args: ['--start-maximized'],
    });
    if (this.driver === undefined) {
      this.driver = (await browser!.pages())[0];
    }
  }

  async navigateTo(url: string): Promise<void> {
    await this.driver?.goto(url);
  }

  async close(): Promise<void> {
    this.driver && (await this.driver.close());
  }

  async sleep(ms: number = 3000): Promise<void> {
    await this.driver?.waitForTimeout(ms);
  }
}
