var signoutconstants = function(){
    this.lnkSysAdmin =  element.all(by.id('hidden-xs-navbar-icons')).first(); //hidden-xs-navbar-icons
    this.lnkSignOut = element(by.css('.logout')); 
    this.modal = element(by.css("modal-dialog"));
    this.btnSignOut = element(by.partialButtonText('Sign Out'));
}

module.exports = new signoutconstants();