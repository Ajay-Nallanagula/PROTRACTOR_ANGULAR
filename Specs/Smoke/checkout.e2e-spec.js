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
    
    checkOutConstants.btnEdit.isPresent().then(function(isEditButtonPresent){
        //If Address is not selected select an address.
        if(!isEditButtonPresent){
            browserActions.clickAndWait(checkOutConstants.btnShippingAddress, 5000, "Shipping Address Button Clicked");
            browserActions.clickAndWait(checkOutConstants.txtShippingAddress,5000,"Shipping Address Selected");
            browserActions.clickAndWait(checkOutConstants.btnOk, 5000, "Shipping Address Confirmed");
        }
        //If Address is already selected use , the selected address.
        browserActions.clickAndWait(checkOutConstants.btnContinueVerification, 5000, "Continue Verification Button clicked"); 
        browserActions.clickAndWait(checkOutConstants.btnPlaceOrder, 5000,'Order Placed button clicked')
    });

    checkOutConstants.lnkOrderConfirmation.isPresent().then((isOrderConfirmLinkPresent) =>{
        logger.info('ORDER CONFIRM LINK PRESENT: '+isOrderConfirmLinkPresent);
        expect(isOrderConfirmLinkPresent).toBeTruthy();
    });
    checkOutConstants.lnkOrderConfirmation.isPresent().then((isOrderHistoryLinkPresent) =>{
        logger.info('ORDER HISTORY LINK PRESENT: '+isOrderHistoryLinkPresent);
        expect(isOrderHistoryLinkPresent).toBeTruthy();
    });
   
   });

});

