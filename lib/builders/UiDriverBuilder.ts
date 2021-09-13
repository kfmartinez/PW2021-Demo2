import IUiDriver from '../adapters/IUiDriver';
import PuppeteerAdapter from '../adapters/PuppeteerAdapter';
import SeleniumAdapter from '../adapters/SeleniumAdapter';

export default class UiDriverBuilder {
  public static customAdapters: Map<string, any> = new Map();

  constructor(private driver?: string, private browser?: string) {
    if (driver) this.driver = driver;
    if (browser) this.browser = browser;
  }

  public setDriver(driver: string) {
    this.driver = driver;
    return this;
  }

  public setBrowser(browser: string) {
    this.browser = browser;
    return this;
  }

  public build(): IUiDriver {
    if (this.driver?.toLocaleLowerCase() === 'puppeteer') {
      return new PuppeteerAdapter(this.browser!);
    } else if (this.driver?.toLocaleLowerCase() === 'selenium') {
      return new SeleniumAdapter(this.browser!);
    } else {
      return UiDriverBuilder.customAdapters.get(this.driver!);
    }
  }
}
