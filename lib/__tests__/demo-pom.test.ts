import IUiDriver from '../adapters/IUiDriver';
import UiDriverBuilder from '../builders/UiDriverBuilder';
import NpmTrendsPage from '../pom/NpmTrendsPage';

const CONFIG = require('../../config');

describe('Demo POM Invocation', () => {
  const url = `${CONFIG.baseUrl}/cypress-vs-nightmare-vs-puppeteer-vs-selenium-webdriver-vs-webdriverio-vs-testcafe`;

  let driver: IUiDriver;
  let npmTrendsPage: NpmTrendsPage;

  beforeEach(async () => {
    driver = await new UiDriverBuilder().setDriver(CONFIG.uiDriver).setBrowser(CONFIG.browser).build();
    npmTrendsPage = new NpmTrendsPage(driver!);

    await npmTrendsPage.maximize();
    await npmTrendsPage.navigateTo(url);
  });

  it('should display the downloads chart', async () => {
    await npmTrendsPage.waitForChartToLoad();
    await npmTrendsPage.selectDownloadsDropdown('2015-01-04');
    expect(await npmTrendsPage.isDownloadsChartDisplayed()).toBeTruthy();

    await npmTrendsPage.sleep();
  });

  afterEach(async () => {
    await npmTrendsPage.close();
  });
});
