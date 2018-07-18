var loginObjects =function(){

    this.uname = element(by.id('in-username'));
    this.password = element(by.id('in-password'));
    this.signinbutton = element(by.id('btn-signin'));

};

module.exports = new loginObjects();

