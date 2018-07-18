'use strict'

var orderDetailObj = require('../../PageObjects/Orderdetail.js');
var orderDetailTestData = require('../../TestData/orderdetail.json');
var shareData = require('../../TestData/share.json');

describe('Order Detail', function () {
    var browserActions;
    var logger;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    it('click on the generated OrderId', function () {

        logger.info('START EXECUTION OF ORDER DETAIL');
        logger.info('OrderId is generated after placing order via Order placement flow');
        browserActions.clickAndWait(orderDetailObj.lnkOrderConfirmation, 5000, "Click on Generated OrderId");
        browser.getCurrentUrl().then(function (actualUrl) {
            logger.info('Actual URL is :' + actualUrl);
            expect(browserActions.isOnExpectedView(actualUrl, orderDetailTestData.orderDetailUrl)).toBeTruthy();
        });

    });
    
    it('Check Edit Order detail is displayed', function () {
        orderDetailObj.btnEditOrderDetail.isPresent().then(function (isBtnEditOrderDetailPresent) {
            logger.info('Is Edit Order Detail Button Present: ' + isBtnEditOrderDetailPresent);
            expect(isBtnEditOrderDetailPresent).toBeTruthy();
        });
    });

    it('Check orderid,date,type,status', function () {

        browserActions.waitAndFindElement(orderDetailObj.ordernum, 5000);

        orderDetailObj.ordernum.getAttribute("outerHTML").then(function (orderIdText) {
            logger.info('Order Id Info is displayed');
            expect(orderIdText).toContain(shareData.neworderid);
        });

        orderDetailObj.orderDatePlaced.getAttribute("outerHTML").then(function (orderDate) {
            logger.info('Order date is displayed');
            expect(orderDate).toContain(browserActions.getDatemmddyyyy());
        });

        orderDetailObj.status.getAttribute("outerHTML").then(function (orderStatus) {
            logger.info('Order Status is Displayed');
            expect(orderStatus).toContain(orderDetailTestData.orderStatusConst);
        });

        orderDetailObj.type.getAttribute("outerHTML").then(function (orderType) {
            logger.info('Order Type is displayed');
            expect(orderType).toContain('Standard');
        });
    });

    it('Check the Shipping Address is present or not', function () {

        orderDetailObj.orderedBy.getText().then(function (orderedByText) {
            logger.info('OrderedBy Address is Displayed');
            expect(orderedByText.length > 0).toBeTruthy();
        });

        orderDetailObj.shipAddress.getText().then(function (shipAddText) {
            logger.info('Shipping Address is Displayed');
            expect(shipAddText.length > 0).toBeTruthy();
            expect(shareData.shippingAddress).toContain(browserActions.removeLineBreaks(shipAddText));
        });

    });

    it('Check Comment Section is displayed or not', function () {
        orderDetailObj.txtAreaComment.isDisplayed().then(function (isTxtAreaComment) {
            logger.info('Text Area for Comment is Displayed', isTxtAreaComment);
            expect(isTxtAreaComment).toBeTruthy();
        });
    });

    it('Product Name is Correct or not', function () {
        orderDetailObj.tableloc.getText().then(function (productNameTxt) {
            logger.info('Product Name is Displayed', productNameTxt);
            expect(shareData.productId).toEqual(productNameTxt);
        });
    });

    it('Product Quantity is displayed or not', function () {
        orderDetailObj.tablelocOrderQty.isDisplayed().then(function (qty) {
            logger.info('Quantity Displayed ', qty);
            expect(qty).toBeTruthy();
        });
    });

    it('Cancel Order is there are not', function () {
        orderDetailObj.btnCancelOrder.isDisplayed().then(function (isbtnCancelOrder) {
            logger.info('Cancel Order Button Is Displayed');
            expect(isbtnCancelOrder).toBeTruthy();
        });
    });
    
});