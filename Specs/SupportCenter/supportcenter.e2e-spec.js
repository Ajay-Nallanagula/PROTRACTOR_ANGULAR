'use strict'
var supportCenterConstants = require('../../PageObjects/Supportcenter.js');
var supportCenterData = require('../../TestData/supportcenter.json');


describe('Support Center', function () {
    var browserActions;
    var logger;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });


    it('Landing page', function () {
        logger.info('STARTED EXECUTING SUPPORT CENTER');
        browserActions.clickAndWait(supportCenterConstants.lnkSysAdmin, 5000, "System Admin link clicked");
        browserActions.clickAndWait(supportCenterConstants.lnkAddrBook, 5000, 'Address Book Menu item clicked');
        browser.getCurrentUrl().then(function (actualUrl) {
            logger.info(actualUrl);
            expect(actualUrl).toContain(supportCenterData.supportUrl);
        });
    });

    it('Click on Interactive Guide', function () {
        var path = browserActions.getDownloadPath()+supportCenterData.fileDelimiter+supportCenterData.downloadedPath;
        var fs = require('fs');
        if (fs.existsSync(path))
        {
          logger.info('Interactive User Guide.ppsx exist, hence deleting it from: ',path.replace(supportCenterData.downloadedPath,''));
          fs.unlinkSync(path);
        }
        else
        {
            logger.info('Interactive User Guide.ppsx doesn\'t exist');
        }

        browserActions.clickAndWait(supportCenterConstants.btnGuide, 5000, 'Clicked on Interactive Guide');
        browserActions.waitAndFindElement(supportCenterConstants.btnGuide, 10000, 'Waiting for File to be downloaded');
        supportCenterConstants.btnGuide.isDisplayed().then(function (isbtnGuide) {
            if (isbtnGuide) {
                logger.info('Download complete');
                var isDownloadSucessful = fs.existsSync(path);
                if (isDownloadSucessful){
                    logger.info('File is downloaded and saved at : ',path.replace(supportCenterData.downloadedPath,''));
                }
                expect(isDownloadSucessful).toBeTruthy();
            }
        });
    });

    it('Click on User Manual', function () {
        supportCenterConstants.btnManual.click().then(function () {
            logger.info('Manual button clicked');
            browser.getAllWindowHandles().then(function (handles) {
                var newWindowHandle = handles[1];// this is your new window
                var oldWindowHandle= handles[0]; // this is your old window
                browser.switchTo().window(newWindowHandle).then(function () {
                    logger.info('Switched to new window');
                    browser.getCurrentUrl().then(function (actualUrl) {
                        var decodedUrl = decodeURIComponent(actualUrl);
                        expect(decodedUrl).toContain(supportCenterData.userGuideUrl);
                    });
                });
                //Switch back to old tab
                browser.switchTo().window(oldWindowHandle).then(function () {
                    logger.info('Switched to ol window');
                    browser.getCurrentUrl().then(function (actualUrl) {
                        logger.info('Switched to previous tab: ',actualUrl)
                    });
                });
            });
        });
    });

    it('Enter your comment and email', function () {
        browserActions.type(supportCenterConstants.txtCommentArea, supportCenterData.txtAreaComment, "Comment for email is Entered");
        browserActions.clickAndWait(supportCenterConstants.btnSubmit, 5000, 'Clicked on Submit to send an email');
        supportCenterConstants.divEmailAcknowledge.isDisplayed().then(function (isdivEmailAcknowledge) {
            if (isdivEmailAcknowledge) {
                logger.info('Acknowledgement is present');
                supportCenterConstants.divEmailAcknowledge.getText().then(function (txt) {
                    if (txt) {
                        logger.info('Mail Acknoweledge Text: ', txt);
                        var txtFormatted = browserActions.removeLineBreaks(txt);
                        expect(txtFormatted).toContain(supportCenterData.mailack);
                    }
                });
            } else {
                logger.info('Acknowledgement is not present');
            }
        });
    });

    it('After email return to support center', function () {
        browserActions.clickAndWait(supportCenterConstants.returnSupportCenter, 5000, 'Clicked on Return to support center');
        browser.getCurrentUrl().then(function (actualUrl) {
            browser.logger.info(actualUrl);
            expect(actualUrl).toContain(supportCenterData.supportUrl);
        });
    });

});