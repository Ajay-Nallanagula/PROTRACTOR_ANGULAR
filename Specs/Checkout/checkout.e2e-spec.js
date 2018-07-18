var checkOutConstants = require('../../PageObjects/Checkout.js');
var checkoutData = require('../../TestData/checkout.json');

describe('checkout product',() =>{
    var browserActions;
    var logger;
    
    beforeEach(function() {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });
        
   it("click shopping cart",()=>{

    logger.info("Start Executing test : SHOPPING CART");
    browser.ignoreSynchronization = true;
    browserActions.clickAndWait(checkOutConstants.cartIdentifier, 5000, "Shopping cart Icon Clicked");
    browserActions.clickAndWait(checkOutConstants.btnCheckOut, 5000, "Checkout Button Clicked");
    });
   
});

