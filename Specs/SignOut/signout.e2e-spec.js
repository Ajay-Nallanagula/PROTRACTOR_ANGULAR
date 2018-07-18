'use strict';

var signoutconstants = require('../../PageObjects/Signout.js');
var signOutTestData = require('../../TestData/signout.json');

describe('Sign out', function () {
    var logger;
    var browserActions;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    it('Current Session', function () {
        logger.info('Started Executing Sign out !!!');
        browserActions.clickAndWait(signoutconstants.lnkSysAdmin, 5000, "System Admin Button Clicked");
        browserActions.clickAndWait(signoutconstants.lnkSignOut, 5000, "SignOut Clicked");

        signoutconstants.btnSignOut.isPresent().then(function (isSignoutModalPresent) {
            if (isSignoutModalPresent) {
                logger.info('_____________ SIGN OUT MODAL POP-UP IS DISPLAYED______________');
                browserActions.clickAndWait(signoutconstants.btnSignOut, 5000, "SignOut on modal pop-up Clicked");
                browser.getCurrentUrl().then(function (actualUrl) {
                    expect(actualUrl).toContain(signOutTestData.baseURL);
                });
            } else {
                logger.info('_____________ SIGN OUT MODAL POP-UP IS NOT DISPLAYED______________');
                browser.getCurrentUrl().then(function (actualUrl) {
                    expect(actualUrl).toContain(signOutTestData.baseURL);
                });
            }
        });
    });
});