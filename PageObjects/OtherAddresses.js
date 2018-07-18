//Other Addresses

var otherAddressConstants = function(){
    this.lnkSysAdmin = element.all(by.id('hidden-xs-navbar-icons')).first();
    this.lnkAddrBook = element.all(by.cssContainingText('a[href*="address/list"]', 'Address Book')).last();
    this.lnkOtherAddressTab =  element.all(by.css('.nav.nav-tabs')).last();
    //this.allTabs = element.all(by.css('.nav.nav-tabs')); dark-button btn-add
    this.btnAddAddress = element(by.css('.dark-button.btn-add'));
    this.divEmailSearch = element(by.css('.dropdown-item.active'));
    this.divSuccessAddr = element(by.css('.col-xs-11'));

    this.addrPopup = element(by.css('.modal-content'));
    this.drpdwnAddressTypeOther = element(by.cssContainingText('option', 'Other'));
    this.drpdwnAddressTypeStorage = element(by.cssContainingText('option', 'Storage'));
    this.drpdwnAddressTypeHome = element(by.cssContainingText('option', 'Home'));
    this.btnSetDefault = element.all(by.css('.default-button')).first();

    this.txtEmailSearch = element.all(by.name("userSearch")).last();

    this.txtFirstName = element.all(by.id("firstName")).last();
    this.txtLastName = element.all(by.id("lastName")).last();
    this.txtAddr1 = element.all(by.id("address1Text")).last();
    this.txtAddr2 = element.all(by.id("address2Text")).last();
    this.txtAddr3 = element.all(by.id("address3Text")).last();
    this.txtCityName = element.all(by.id("cityName")).last();
    this.ddlState = element(by.cssContainingText('option', 'Alaska'));
    this.txtZipCode = element.all(by.id("zipCode")).last();
    this.txtPhone = element.all(by.id("phoneNumber")).last();
    this.btnSaveChanges = element(by.buttonText('Save as New Address')); 
    this.btnEditedSave = element(by.buttonText('Save Changes'));
    this.divSuccessAddr = element(by.css('.col-xs-11'));
    this.btnCancel = element(by.buttonText('Cancel'));
    this.btnEditAddress = element.all(by.css('.edit-btn')).last();

    this.filterChevron =  element.all(by.css('.sidebar-match-height')).last();
    this.btnApplyFilters = element.all(by.partialButtonText('Apply Filters')).first();
    this.radioStorageFilter = element.all(by.name('filterAddressTypeSelected')).last();
    this.tableloc = element.all(by.css('table[data-table-sort="true"] tbody tr'));

    this.tablelocLast = this.tableloc.get(0);
    this.tableloctd= this.tablelocLast.all(by.tagName("td")).last();
    this.tableloctd= this.tablelocLast.all(by.tagName("td")).first();

    this.tableloctder = element.all(by.css('table[data-table-sort="true"] tbody tr a'));

    //this.tableloctd = element.all(by.css('table[data-table-sort="true"] tbody tr'));

    this.delPopup = element(by.css('.modal-dialog'));
    this.btnPopupDelAddr = element(by.css('.btn-danger'));
}

module.exports = new otherAddressConstants();