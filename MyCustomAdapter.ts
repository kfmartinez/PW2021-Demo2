import IUiDriver from './lib/adapters/IUiDriver';

export default class MyCustomAdapter implements IUiDriver {
  searchElement(locator: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  click(locator: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  type(locator: string, text: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  selectDropdown(locator: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  isDisplayed(locator: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  waitForElementToLoad(locator: string, timeout?: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  scrollIntoView(locator: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  maximize(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  navigateTo(url: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  close(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sleep(ms: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
