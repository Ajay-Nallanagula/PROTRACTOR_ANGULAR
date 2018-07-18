var materialsObjects = function () {
  var chkboxIdentifier = element.all(by.xpath("//input[@type='checkbox']"));
  this.materialstab = element(by.linkText('Materials'));
  this.searchtextbox = element(by.css('input[type="search"]'));
  this.searchbutton = element(by.partialButtonText('search'));
  this.searchQtyText = element(by.css("input[id^='qtyText']"));
  this.btnAddToCart = element(by.css('.btn-cart'));
  this.btnCancel = element(by.buttonText('x'));
  this.modal = element(by.css("modal-dialog"));
  this.chkDoNotShowAgainCount = chkboxIdentifier.length;
  this.chkDoNotShowAgain = chkboxIdentifier.last();
  this.btnContinue = element(by.xpath("//button[text()='Continue']"));
  this.btnProductSearch = element(by.css('.dropdown-item.active'));
};

module.exports = new materialsObjects();