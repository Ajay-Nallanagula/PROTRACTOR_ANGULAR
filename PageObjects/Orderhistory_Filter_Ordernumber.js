var ordSrcNumConstants = function(){
this.lnkSysAdmin =  element.all(by.id('hidden-xs-navbar-icons')).first();
this.lnkOrderHistory = element.all(by.cssContainingText('a[href*="order/history"]', 'Order History')).last(); 
this.filterChevron =  element.all(by.css('.sidebar-match-height')).last();
this.orderNumberFilter = element(by.id("orderNumber"));
this.btnApplyFilters = element.all(by.partialButtonText('Apply Filters')).first();
this.resultTable = element.all(by.css('div[class="table-overflow-container"] tbody tr'));
this.tableloc = element.all(by.css('table[data-table-sort="true"] tbody tr'));
}

module.exports = new ordSrcNumConstants();