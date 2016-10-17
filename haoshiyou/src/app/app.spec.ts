import {
    TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
    TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from "@angular/platform-browser-dynamic/testing";
import {setBaseTestProviders} from "@angular/core/testing";
import {MyApp} from "./app";

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(
    TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// Mock out Ionic's platform class
class MockClass {
  public ready():any {
    return new Promise((resolve:Function) => {
      resolve();
    });
  }
}

let myApp = null;

describe('MyApp', () => {

  beforeEach(function () {
    let platform = (<any>new MockClass());
    let af = (<any>new MockClass());
    let userService = (<any>new MockClass());
    let threadService = (<any>new MockClass());
    let messageService = (<any>new MockClass());
    let authService = (<any>new MockClass());
    let credService = (<any>new MockClass());
    let logger = (<any>new MockClass());
    let notificationService = (<any>new MockClass());
    let http = (<any>new MockClass());
    let logService = (<any>new MockClass());
    myApp = new MyApp(platform,
         af,
         userService,
         threadService,
         messageService,
         authService,
         credService,
         logger,
         notificationService,
         http,
         logService);
  });

  it('initializes with no null.', () => {
    expect(myApp).not.toBeNull();
  });
});
