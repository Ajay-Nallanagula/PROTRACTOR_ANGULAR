'use strict'

var loginObj = require('../../PageObjects/Login.js');
var testData = require('../../TestData/login.json');

describe('Login to RepPortal', function () {

  browser.logger.info('Entered Login Page');
  it('Login to APP', function () {
    browser.ignoreSynchronization = true;
    browser.logger.info("Started Executing Test: Login");
    browser.get(testData[0].baseURL);
    browser.getCurrentUrl().then(function (actualUrl) {
      browser.logger.info(actualUrl);
    });

    browser.browserActions.type(loginObj.uname, testData[0].emailId, "Entered Email");
    browser.browserActions.type(loginObj.password, testData[0].password, "Entered Password");
    browser.browserActions.clickAndWait(loginObj.signinbutton, 5000, "Clicked on Sign in");


    
  });

});