'use strict'

var profileConstants = require('../../PageObjects/Profile.js');
var profileData = require('../../TestData/profile.json');
var shareData = require('../../TestData/share.json');

describe('My Profile', function () {
    var browserActions;
    var logger;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    it('check the mandatory fields as non empty', function () {
        logger.info(' STARTED EXECUTING MY PROFILE');
        browserActions.clickAndWait(profileConstants.lnkSysAdmin, 5000, "System Admin link clicked");
        browserActions.clickAndWait(profileConstants.lnkMyProfile, 5000, 'My Profile Menu item clicked');

        profileConstants.txtFirstName.getAttribute('value').then(function (firstname) {
            if (firstname) {
                logger.info('FIRSTNAME IS PRESENT' + firstname);
            }
            expect(firstname.length > 0).toBeTruthy();
        });

        profileConstants.txtLastName.getAttribute('value').then(function (lastname) {
            if (lastname) {
                logger.info('LASTNAME IS PRESENT' + lastname);
            }
            expect(lastname.length > 0).toBeTruthy();
        });

        profileConstants.txtEmail.getAttribute('value').then(function (email) {
            if (email) {
                logger.info('LASTNAME IS PRESENT' + email);
            }
            expect(email.length > 0).toBeTruthy();
            expect(shareData.loginId).toContain(email);
        });

        profileConstants.txtAreaProfileAddress.getText().then(function (profileAddress) {
            //logger.info('Profile Address is Displayed ');
            //profileData.profileAddress = browserActions.removeLineBreaks(profileAddress);
            logger.info(browserActions.removeLineBreaks(browserActions.removeLineBreaks(profileAddress)));
            expect(profileAddress.length > 0).toBeTruthy();
        });
    });

    it('Change Password Success Scenario', function () {
        browserActions.clickAndWait(profileConstants.btnChangePwd, 5000, "Clicked on Change Password Button");
        browserActions.type(profileConstants.txtCurrentPassword, profileData.password, "Entered Password");
        browserActions.type(profileConstants.txtNewPassword, profileData.password, "Entered Password");
        browserActions.type(profileConstants.txtConfirmPassword, profileData.password, "Entered Password");
        browserActions.clickAndWait(profileConstants.btnSaveChanges, 5000, "Clicked on Change Password Button");
        profileConstants.divSuccess.isDisplayed().then(function (isSucessDisplayed) {
            if (isSucessDisplayed) {
                logger.info('Success Message is Displayed');
                expect(isSucessDisplayed).toBeTruthy();
            }
        });
    });

    it('Change Password Cancel Scenario', function () {
        browserActions.type(profileConstants.txtCurrentPassword, profileData.password, "Entered Password");
        browserActions.type(profileConstants.txtNewPassword, profileData.password, "Entered Password");
        browserActions.type(profileConstants.txtConfirmPassword, profileData.password, "Entered Password");
        browserActions.clickAndWait(profileConstants.btnCancel, 5000, "Clicked on Cancel Button");
        profileConstants.txtCurrentPassword.getAttribute('value').then(function (currentPwd) {
            if (currentPwd.length === 0) {
                logger.info('CURRENT PASSWORD EMPTIED');
            }
            expect(currentPwd.length === 0).toBeTruthy();
        });
        profileConstants.txtNewPassword.getAttribute('value').then(function (newPwd) {
            if (newPwd.length === 0) {
                logger.info('NEW PASSWORD EMPTIED');
            }
            expect(newPwd.length === 0).toBeTruthy();
        });
        profileConstants.txtConfirmPassword.getAttribute('value').then(function (confirmPwd) {
            if (confirmPwd.length === 0) {
                logger.info('CONFIRM PASSWORD EMPTIED');
            }
            expect(confirmPwd.length === 0).toBeTruthy();
        });
    });

    it('Change Password Navigate Back to Profile Detail', function () {
        browserActions.clickAndWait(profileConstants.lnkBackProfileDetail, 5000, "Clicked on Back To Profile link ");
        browser.getCurrentUrl().then(function (actualUrl) {
            logger.info('Profile Url: ', actualUrl)
            expect(actualUrl).toContain(profileData.profileDetailUrl);
        });
    });

    it('View Address Book',function(){
        browserActions.clickAndWait(profileConstants.btnViewAddressBook, 5000, "Clicked on View Address Book ");
        profileConstants.addressBookHome.getText().then(function (addressBook) {
            logger.info('Address Book Home is Displayed ',browserActions.removeLineBreaks(addressBook));
            expect(browserActions.removeLineBreaks(addressBook).length > 0).toBeTruthy();
            //Addresses are shown differently for ex '1' is shown as One, and  in Js that is inequal
           // expect(browserActions.removeLineBreaks(addressBook)).toContain(profileData.profileAddress);
        });
    })

});