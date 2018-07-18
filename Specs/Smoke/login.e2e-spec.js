'use strict'

var loginObj = require('../../PageObjects/Login.js');
var testData = require('../../TestData/login.json');

describe('Login to RepPortal', function () {

  it('Login to APP', function () {

    browser.logger.info("Started Executing Test: Login");

    browser.ignoreSynchronization = true;

      browser.get(browser.baseURL);
   
    browser.browserActions.type(loginObj.uname, testData[0].emailId, "Entered Email");
    browser.browserActions.type(loginObj.password, testData[0].password, "Entered Password");
    browser.browserActions.clickAndWait(loginObj.signinbutton,5000, "Clicked on Sign in");
  });

});
