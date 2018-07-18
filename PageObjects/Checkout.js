
var checkOutConstants = function () {
     this.cartIdentifier = element.all(by.cssContainingText('a[href*="order/cart"]', 'shopping_cart')).last();
     this.btnCheckOut = element(by.buttonText('Check Out'));
     //this.btnShippingAddress = element(by.buttonText('Select from Address Book')); 
     this.btnShippingAddress = element(by.css('.left-margined'));
     this.btnOk = element(by.buttonText('Ok'));
     this.txtShippingAddress = element(by.css('.address-type'));
     this.addressChkbox = element(by.css('.selected-check .pull-right'));
     this.btnEdit = element(by.css('.edit-btn'));
     this.btnContinueVerification = element(by.buttonText('Continue to Verification'));
     this.btnPlaceOrder = element(by.css('.btn.btn-primary'));
     this.lnkOrderConfirmation = element(by.css('a[href*="order/detail"]'));
     this.orderHistory = element(by.linkText('Order History'));
     this.btnReturnMaterials = element(by.cssContainingText('Return to Materials'));
     this.txtShipAddrNoPopup = element(by.css('.col-xs-12.shipping-address.well'));
};
  
    module.exports = new checkOutConstants();