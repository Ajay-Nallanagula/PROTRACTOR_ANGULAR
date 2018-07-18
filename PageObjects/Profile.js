var profileConstants = function(){
    this.lnkSysAdmin =  element.all(by.id('hidden-xs-navbar-icons')).first();
    this.lnkMyProfile = element.all(by.cssContainingText('a[href*="profile/detail"]', 'My Profile')).last(); 
    this.txtFirstName = element(by.id("firstName"));
    this.txtLastName = element(by.id("lastName")); 
    this.txtEmail = element(by.id("email")); 
    this.txtAreaProfileAddress = element.all(by.css('.address-box.well')).last();
    this.btnViewAddressBook = element(by.buttonText('View Address Book'));
    this.btnChangePwd = element(by.buttonText('Change Password'));
    this.txtCurrentPassword =element(by.id("in-cur-pass")); 
    this.txtNewPassword =element(by.id("in-new-pass")); 
    this.txtConfirmPassword =element(by.id("in-con-pass")); 
    this.btnSaveChanges = element(by.buttonText('Save Changes'));
    this.btnCancel = element(by.buttonText('Cancel'));
    this.divSuccess = element(by.css('.col-xs-11'));
    this.lnkBackProfileDetail =  element.all(by.cssContainingText('a[href*="profile/detail"]', '‹ '));
    this.addressBookHome = element.all(by.css('.col-xs-12.shipping-address.well')).last();
}

module.exports = new profileConstants();