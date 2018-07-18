var checkOutConstants = require('../../PageObjects/Checkout.js');
var checkoutData = require('../../TestData/checkout.json');
var shareData = require('../../TestData/share.json');

describe('Order placement', () => {
    var browserActions;
    var logger;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    it("click for orderplacement", () => {

        browserActions.waitAndFindElement(checkOutConstants.btnEdit, 5000);
        checkOutConstants.btnEdit.isPresent().then(function (isEditButtonPresent) {
            logger.info('Is Edit button Present: ', isEditButtonPresent);
            //If Address is not selected select an address.
            if (!isEditButtonPresent) {
                browserActions.clickAndWait(checkOutConstants.btnShippingAddress, 5000, "Shipping Address Button Clicked");
                browserActions.clickAndWait(checkOutConstants.txtShippingAddress, 5000, "Shipping Address Selected");
                browserActions.clickAndWait(checkOutConstants.btnOk, 5000, "Shipping Address Confirmed");
            } else {
                logger.info('The Address is already filled , take the same address');
            }
             // Collect The address here 
             checkOutConstants.txtShipAddrNoPopup.isPresent().then(function(isTxtShipAddrNoPopupPresent){
                if(isTxtShipAddrNoPopupPresent){
                  checkOutConstants.txtShipAddrNoPopup.getText().then(function(addressText){
                      shareData.shippingAddress = browserActions.removeLineBreaks(addressText);
                  });
                }
          });
            //If Address is already selected use , the selected address.
            browserActions.clickAndWait(checkOutConstants.btnContinueVerification, 5000, "Continue Verification Button clicked");
            browserActions.waitAndFindElement(checkOutConstants.btnPlaceOrder, 5000);
            checkOutConstants.btnPlaceOrder.isDisplayed().then(function (isbtnPlaceOrder) {
                if (isbtnPlaceOrder) {
                    logger.info('Is Place Order button Present: ', isbtnPlaceOrder);
                    browserActions.clickAndWait(checkOutConstants.btnPlaceOrder, 5000, 'PLACED THE ORDER SUCESSFULLY.THANK YOU FOR VISITING!!!');
                } else {
                    logger.info('Is Place Order button Present: ', isbtnPlaceOrder);
                }
            });


        });
        //Preserving the generated OrderId, this will be checked in OrderHistory 
        checkOutConstants.lnkOrderConfirmation.isPresent().then((isOrderConfirmLinkPresent) => {
            logger.info('ORDER CONFIRM LINK PRESENT: ' + isOrderConfirmLinkPresent);
            expect(isOrderConfirmLinkPresent).toBeTruthy();
            checkOutConstants.lnkOrderConfirmation.getText().then(function(lnkOrderConfirmationText){
               logger.info("OrderPlacement-ORDER NUMBER GENERATED IS : " +lnkOrderConfirmationText);
               shareData.neworderid = lnkOrderConfirmationText;
            });
        });

        //Check If OrderHistory link is present or not
        checkOutConstants.lnkOrderConfirmation.isPresent().then((isOrderHistoryLinkPresent) => {
            logger.info('ORDER HISTORY LINK PRESENT: ' + isOrderHistoryLinkPresent);
            expect(isOrderHistoryLinkPresent).toBeTruthy();
        });
    });
});