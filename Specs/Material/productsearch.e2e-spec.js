'use strict'

var materialsObjects = require('../../PageObjects/Materials.js');
var testDataArray = require('../../TestData/materials.json');

describe('Materials', function () {
  var productTestData = null;

  beforeEach(() => {
    productTestData = testDataArray[0];
  });

  it('Search Product', function () {
    browser.logger.info("Started Executing Test: Materials");
    browser.ignoreSynchronization = true;
    browser.browserActions.clickAndWait(materialsObjects.materialstab, 5000, "Materials Tab Clicked");
    browser.browserActions.type(materialsObjects.searchtextbox, productTestData.productId, "Entered Product ID");
    browser.browserActions.clickAndWait(materialsObjects.searchbutton, 5000, "Product Search Clicked");
     //Order Placement
     browser.browserActions.type(materialsObjects.searchQtyText, productTestData.quantity, 'Quantity Order Entered', true);
     browser.browserActions.clickAndWait(materialsObjects.btnAddToCart, 5000, 'Add To Cart Clicked');
     if (materialsObjects.chkDoNotShowAgainCount > 0) {
       browser.logger.info("Don't show again button is present action required");
       browser.browserActions.clickAndWait(materialsObjects.chkDoNotShowAgain, 5000, "Don't show again button is been clicked");
       browser.browserActions.clickAndWait(materialsObjects.btnContinue, 5000, "Continue button on popup is been clicked");
     } else {
       browser.logger.info("Don't show again button is not present");
     }

    // materialsObjects.btnProductSearch.isPresent().then(function (isbtnProductSearch) {
    //   if (isbtnProductSearch) {
    //     browser.logger.info('Product Search Result is Displayed');
    //     browserActions.clickAndWait(materialsObjects.btnProductSearch, 5000, "Product Search Result is Clicked");
    //     browser.browserActions.clickAndWait(materialsObjects.searchbutton, 5000, "Product Search Clicked");
    //     //Order Placement
    //     browser.browserActions.type(materialsObjects.searchQtyText, productTestData.quantity, 'Quantity Order Entered', true);
    //     browser.browserActions.clickAndWait(materialsObjects.btnAddToCart, 5000, 'Add To Cart Clicked');
    //     if (materialsObjects.chkDoNotShowAgainCount > 0) {
    //       browser.logger.info("Don't show again button is present action required");
    //       browser.browserActions.clickAndWait(materialsObjects.chkDoNotShowAgain, 5000, "Don't show again button is been clicked");
    //       browser.browserActions.clickAndWait(materialsObjects.btnContinue, 5000, "Continue button on popup is been clicked");
    //     } else {
    //       browser.logger.info("Don't show again button is not present");
    //     }
    //   }
    //   else{
    //     browser.logger.info('Product Search did not yeild any result')
    //   }
    // });


    //browser.logger.info(materialsObjects.chkDoNotShowAgain);
    //expect(materialsObjects.chkDoNotShowAgain === null).toBeTruthy();

    // materialsObjects.chkDoNotShowAgain.isDisplayed(function(ischkDoNotShowAgainPresent){
    //   if (ischkDoNotShowAgainPresent) {
    //   logger.info("XXXXXXXXXXXXXXXXXXXX  ischkDoNotShowAgainPresent is present XXXXXXXXXXXXXXXXXXXXXX");
    //   browser.browserActions.clickAndWait(materialsObjects.chkDoNotShowAgain, 5000, "Don't show again button is been clicked");
    //   browser.browserActions.clickAndWait(materialsObjects.btnContinue, 5000, "Continue button on popup is been clicked");
    //   }
    //   else{
    //     logger.info("XXXXXXXXXXXXXXXXXXXX  ischkDoNotShowAgainPresent is not present XXXXXXXXXXXXXXXXXXXXXX");
    //   }
    // });


    // materialsObjects.chkDoNotShowAgain.isPresent().then(function (ischkDoNotShowAgainPresent) {
    //   if (ischkDoNotShowAgainPresent) {
    //     logger.info("XXXXXXXXXXXXXXXXXXXX  ischkDoNotShowAgainPresent is present XXXXXXXXXXXXXXXXXXXXXX");
    //     browser.browserActions.clickAndWait(materialsObjects.chkDoNotShowAgain, 5000, "Don't show again is been clicked");
    //     materialsObjects.btnContinue.isPresent().then(function (isbtnContinuePresent) {
    //       if (isbtnContinuePresent) {
    //         browser.logger.info("isbtnContinuePresent is present");
    //       }
    //     });
    //   } else {
    //     logger.info("XXXXXXXXXXXXXXXXXXXX  chkDoNotShowAgain is not present XXXXXXXXXXXXXXXXXXXXXX");
    //   }
    // });

  });


});