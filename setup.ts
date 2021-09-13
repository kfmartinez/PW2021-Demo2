import UiDriverBuilder from './lib/builders/UiDriverBuilder';
import MyCustomAdapter from './MyCustomAdapter';

require('chromedriver');
require('geckodriver');

UiDriverBuilder.customAdapters.set('mycustomadapter', new MyCustomAdapter());
