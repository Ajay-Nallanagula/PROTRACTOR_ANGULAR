'use strict'
var ordSrcNumConstants = require('../../PageObjects/Orderhistory_Filter_Ordernumber.js')
var ordSrcData = require('../../TestData/orderhistory_filter_ordernumber.json')
var shareData = require('../../TestData/share.json');

describe('Order History', function () {
    var logger;

    beforeEach(function () {
        logger = browser.logger;
    });

    it('search by order number', function () {
        logger.info(' STARTED EXECUTING ORDER HISTORY');
        browser.browserActions.clickAndWait(ordSrcNumConstants.lnkSysAdmin, 5000, "System Admin link clicked");
        browser.browserActions.clickAndWait(ordSrcNumConstants.lnkOrderHistory, 5000, 'Order History Menu item clicked');
        browser.browserActions.clickAndWait(ordSrcNumConstants.filterChevron, 5000, 'Filter Chevron Clicked');
        logger.info('OrderHistory-Order Id Generated :',shareData.neworderid )
        browser.browserActions.type(ordSrcNumConstants.orderNumberFilter, shareData.neworderid, "Order Number Entered for Filter");
        browser.browserActions.clickAndWait(ordSrcNumConstants.btnApplyFilters,5000,'Apply Filters Button Clicked');
        
        ordSrcNumConstants.tableloc.isPresent().then(function(isTablelocPresent){
         expect(isTablelocPresent).toBeTruthy();
            if(isTablelocPresent){
                ordSrcNumConstants.tableloc.then(function(tr){
                    logger.info("After Filtering : "+ tr.length);
                    expect(tr.length).toEqual(1);
                });
            }
        });
        
    });


});