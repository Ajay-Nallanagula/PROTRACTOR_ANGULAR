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
  });


});
