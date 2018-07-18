var supportCenterConstants = function(){
    this.lnkSysAdmin = element.all(by.id('hidden-xs-navbar-icons')).first();
    this.lnkAddrBook = element.all(by.cssContainingText('a[href*="support/detail"]', 'Support Center')).last();
    this.guideManualSubmit = element.all(by.css('.btn.btn-primary'));
    this.btnGuide = this.guideManualSubmit.first();
    this.btnManual = this.guideManualSubmit.get(1);
    this.btnSubmit = this.guideManualSubmit.last();
    this.txtCommentArea = element(by.css('.ng-valid'));
    this.divEmailAcknowledge= element(by.css('.panel-body'));
    this.returnSupportCenter = element(by.css('.btn.btn-primary'));
}

module.exports = new supportCenterConstants();