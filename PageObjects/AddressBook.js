var addressBookConstants = function () {
    this.lnkSysAdmin = element.all(by.id('hidden-xs-navbar-icons')).first();
    this.lnkAddrBook = element.all(by.cssContainingText('a[href*="address/list"]', 'Address Book')).last();
    this.addresses = element.all(by.css('.col-xs-12.shipping-address.well'));
    this.firstDelete = this.addresses.first().element(by.cssContainingText('Delete'))
    this.btnAddAddress = element(by.css('.add-address-button'));
    this.addrPopup = element(by.css('.modal-content'));
    this.drpdwnAddressTypeOther = element(by.cssContainingText('option', 'Other'));
    this.drpdwnAddressTypeStorage = element(by.cssContainingText('option', 'Storage'));
    this.drpdwnAddressTypeHome = element(by.cssContainingText('option', 'Home'));
    this.btnSetDefault = element.all(by.css('.default-button')).first();
    this.txtFirstName = element(by.id("firstName"));
    this.txtLastName = element(by.id("lastName"));
    this.txtAddr1 = element(by.id("address1Text"));
    this.txtAddr2 = element(by.id("address2Text"));
    this.txtAddr3 = element(by.id("address3Text"));
    this.txtCityName = element(by.id("cityName"));
    this.ddlState = element(by.cssContainingText('option', 'Alaska'));
    this.txtZipCode = element(by.id("zipCode"));
    this.txtPhone = element(by.id("phoneNumber"));
    this.btnSaveChanges = element(by.buttonText('Save as New Address')); 
    this.btnEditedSave = element(by.buttonText('Save Changes'));
    this.divSuccessAddr = element(by.css('.col-xs-11'));
    this.btnCancel = element(by.buttonText('Cancel'));
    this.btnEditAddress = element.all(by.css('.edit-btn')).last();
    //this.btnEditAddressCount = element.all(by.css('.edit-btn'));
    this.lnkDelete = element.all(by.css('.padded')).last();
    this.delPopup = element(by.css('.modal-dialog'));
    this.btnPopupDelAddr = element(by.css('.btn-danger'));
    // this.spinner = element(by.css('.ng-busy-backdrop'));
    this.firstAddr = element.all(by.css('.col-xs-12.shipping-address.well')).last();


}

module.exports = new addressBookConstants();