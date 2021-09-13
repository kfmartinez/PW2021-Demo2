import IUiDriver from '../adapters/IUiDriver';

export default abstract class BasePage {
  constructor(protected driver: IUiDriver) {
    this.driver = driver;
  }

  protected async selectDropdown(locator: string): Promise<BasePage> {
    await this.driver.selectDropdown(locator);
    return this;
  }

  protected async isDisplayed(locator: string): Promise<boolean> {
    await this.scrollIntoView(locator);
    return await this.driver.isDisplayed(locator);
  }

  protected async waitForElementToLoad(locator: string, timeout: number = 8000): Promise<BasePage> {
    await this.driver.waitForElementToLoad(locator, timeout);
    return this;
  }

  protected async scrollIntoView(locator: string): Promise<BasePage> {
    await this.driver.scrollIntoView(locator);
    return this;
  }

  public async maximize(): Promise<BasePage> {
    await this.driver.maximize();
    return this;
  }

  public async navigateTo(url: string): Promise<BasePage> {
    await this.driver.navigateTo(url);
    return this;
  }

  public async close(): Promise<void> {
    return await this.driver.close();
  }

  public async sleep(ms: number = 3000): Promise<void> {
    return await this.driver.sleep(ms);
  }
}
