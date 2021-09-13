export default interface IUiDriver {
  click(locator: string): Promise<void>;

  type(locator: string, text: string): Promise<void>;

  waitForElementToLoad(locator: string, timeout?: number): Promise<void>;

  scrollIntoView(locator: string): Promise<void>;

  searchElement(locator: string): Promise<any>;

  selectDropdown(locator: string): Promise<void>;

  isDisplayed(locator: string): Promise<boolean>;

  maximize(): Promise<void>;

  navigateTo(url: string): Promise<void>;

  close(): Promise<void>;

  sleep(ms: number): Promise<void>;
}
