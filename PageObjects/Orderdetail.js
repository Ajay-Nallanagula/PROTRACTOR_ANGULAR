var orderDetailConstants = function(){
    this.lnkOrderConfirmation = element(by.css('a[href*="order/detail"]'));
    this.btnEditOrderDetail = element(by.css('.margined,.dark-button'));
    this.divOrderDetails = element.all(by.css(".col-xs-12.col-sm-6.col-md-3"));
    this.divOrderedBy = element.all(by.css('.col-xs-12.shipping-address.well')); 
    this.txtAreaComment = element(by.id('newComment'));

    this.ordernum = this.divOrderDetails.first();
    this.orderDatePlaced = this.divOrderDetails.get(1);
    this.status = this.divOrderDetails.last();
    this.type = this.divOrderDetails.get(2);
    this.orderedBy = this.divOrderedBy.first();
    this.shipAddress = this.divOrderedBy.last();

    this.productName = element(by.cssContainingText('a[href*="product/detail?productId"]'));
    this.orderDetailQuantity = element(by.css('.form-group.number'));//element(by.cssContainingText('input[sgonlynumber="true"]'));
    this.btnCancelOrder = element(by.css(".btn.btn-danger"));
    this.tableloc = element.all(by.css('table[data-table-sort="true"] tbody tr td')).first();

    this.tablelocOrderQty = element.all(by.css('table[data-table-sort="true"] tbody tr td')).get(3);
    
}

module.exports = new orderDetailConstants();
