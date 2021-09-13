import BasePage from './BasePage';
import IUiDriver from '../adapters/IUiDriver';

export default class NpmTrendsPage extends BasePage {
  private downloadsChart: string = '#download_chart';

  constructor(protected driver: IUiDriver) {
    super(driver);
  }

  public async selectDownloadsDropdown(text: string): Promise<NpmTrendsPage> {
    await super.selectDropdown('//select/option[@value="' + text + '"]');
    return this;
  }

  public async isDownloadsChartDisplayed(): Promise<boolean> {
    return await super.isDisplayed(this.downloadsChart);
  }

  public async waitForChartToLoad(): Promise<NpmTrendsPage> {
    await super.waitForElementToLoad(this.downloadsChart);
    return this;
  }
}
