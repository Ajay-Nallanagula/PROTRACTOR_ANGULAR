'use strict'

var otherAddressConstants = require('../../PageObjects/OtherAddresses.js');
var otherAddressData = require('../../TestData/otheraddresses.json');


describe('Address book Other Adrresses Tab', function () {
    var browserActions;
    var logger;
    var addressEvents;
    var filterAddr;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    addressEvents = function (isSetDefault, isEdit) {

        otherAddressConstants.txtEmailSearch.isPresent().then(function (istxtEmailSearch) {
            if (istxtEmailSearch) {
                logger.info('Email Search Textbox present');

                if (!isEdit) {
                    browserActions.type(otherAddressConstants.txtEmailSearch, otherAddressData.email, "Email Entered");

                    otherAddressConstants.divEmailSearch.isPresent().then(function (isDivEmailSearch) {
                        if (isDivEmailSearch) {
                            logger.info('Email Search is Displayed');
                            browserActions.clickAndWait(otherAddressConstants.divEmailSearch, 5000, "Email Search is Clicked");
                        }
                    });
                    browserActions.clickAndWait(otherAddressConstants.drpdwnAddressTypeStorage, 5000, "Address Type Dropdown clicked");
                    if (isSetDefault) {
                        browserActions.clickAndWait(otherAddressConstants.btnSetDefault, 5000, "Default button clicked");
                    }
                }

                var firstname = isEdit ? otherAddressData.firsteditname : otherAddressData.firstname;
                var lastname = isEdit ? otherAddressData.lasteditname : otherAddressData.lastname;
                var txtAddr1 = isEdit ? otherAddressData.addr1eddit : otherAddressData.addr1;
                var txtAddr2 = isEdit ? otherAddressData.addr2edit : otherAddressData.addr2;
                var txtAddr3 = isEdit ? otherAddressData.addr3edit : otherAddressData.addr3;

                browserActions.type(otherAddressConstants.txtFirstName, firstname, "First Name Entered");
                browserActions.type(otherAddressConstants.txtLastName, lastname, "Last Name Entered");
                browserActions.type(otherAddressConstants.txtAddr1, txtAddr1, "address1 Entered");
                browserActions.type(otherAddressConstants.txtAddr2, txtAddr2, "address2 Entered");
                browserActions.type(otherAddressConstants.txtAddr3, txtAddr3, "address3 Entered");
                if (!isEdit) {
                    browserActions.type(otherAddressConstants.txtCityName, otherAddressData.city, "City Entered");
                    browserActions.clickAndWait(otherAddressConstants.ddlState, 5000, "State Type Dropdown clicked");
                    browserActions.type(otherAddressConstants.txtZipCode, otherAddressData.zipcode, "Zip Entered");
                    browserActions.type(otherAddressConstants.txtPhone, otherAddressData.phone, "Phone Entered");
                    browserActions.clickAndWait(otherAddressConstants.btnSaveChanges, 5000, "Save the New Address Changes");
                } else {
                    browserActions.clickAndWait(otherAddressConstants.btnEditedSave, 5000, "Save the Edited Address");
                }
            } else {
                logger.info('Email Search Textbox is not present');
            }
        });
    };

    filterAddr = function (isEdit,isDelete) {
        var firstname = isEdit ? otherAddressData.firsteditname : otherAddressData.firstname;
        var lastname = isEdit ? otherAddressData.lasteditname : otherAddressData.lastname;
        if (!isEdit || isDelete) {
            browserActions.clickAndWait(otherAddressConstants.filterChevron, 5000, 'Filter Chevron Clicked');
            browserActions.clickAndWait(otherAddressConstants.radioStorageFilter, 5000, 'Storage Radio button clicked');
        }

        browserActions.type(otherAddressConstants.txtFirstName, firstname, "First Name Filter Entered");
        browserActions.type(otherAddressConstants.txtLastName, lastname, "Last Name Filter Entered");
        browser.browserActions.clickAndWait(otherAddressConstants.btnApplyFilters, 5000, 'Apply Filters Button Clicked');
        otherAddressConstants.tableloc.isPresent().then(function (isTablelocPresent) {
            expect(isTablelocPresent).toBeTruthy();
            if (isTablelocPresent) {
                otherAddressConstants.tableloc.count().then(function (trCount) {
                    otherAddressConstants.tableloc.get(0).getText().then(function (text) {
                        
                        if (trCount > 0) {
                            if(isDelete){
                                logger.info('______TEXT FOR DELETE______', text);
                                expect(text).toContain(otherAddressData.nofilterItems);
                            }
                            else{
                                var removeNewLine = browserActions.removeLineBreaks(text);
                                expect(removeNewLine).toContain(otherAddressData.email);
                                expect(removeNewLine).toContain(otherAddressData.addressType);
                                if (isEdit) {
                                    expect(removeNewLine).toContain(otherAddressData.firsteditname);
                                    expect(removeNewLine).toContain(otherAddressData.lasteditname);
                                } else {
                                    expect(removeNewLine).toContain(otherAddressData.firstname);
                                    expect(removeNewLine).toContain(otherAddressData.lastname);
                                }
                            }
                        }
                    });
                });
            }
        });
    }

    it('Check landing page of Other Address', function () {
        logger.info('STARTED EXECUTING OTHER ADDRESSES');
        browserActions.clickAndWait(otherAddressConstants.lnkSysAdmin, 5000, "System Admin link clicked");
        browserActions.clickAndWait(otherAddressConstants.lnkAddrBook, 5000, 'Address Book Menu item clicked');
        browserActions.clickAndWait(otherAddressConstants.lnkOtherAddressTab, 5000, 'Other Address Tab is clicked');
        browser.getCurrentUrl().then(function (actualUrl) {
            browser.logger.info(actualUrl);
            expect(actualUrl).toContain(otherAddressData.otherAddressUrl);
        });
    });

    it('Add new Address', function () {
        browserActions.clickAndWait(otherAddressConstants.btnAddAddress, 5000, 'Add New Address Button Clicked');

        otherAddressConstants.addrPopup.isPresent().then(function (isAddrPopup) {
            if (isAddrPopup) {
                logger.info('ADDRESS POPUP PRESENT');
                addressEvents(false, false);
            } else {
                logger.info('ADDRESS POPUP NOT PRESENT')
            }
            browserActions.waitAndFindElement(otherAddressConstants.divSuccessAddr, 5000, 'Waiting for Success Message Present');
            otherAddressConstants.divSuccessAddr.isDisplayed().then(function (sucessMsg) {
                expect(sucessMsg).toBeTruthy();
            });
        });

    });

    it('Filter newly added address', function () {
        filterAddr(false);
    });

    it('Edit added Addresss', function () {
        otherAddressConstants.tableloctder.count().then(function (tdCount) {
            logger.info('td Count', tdCount);
            var editTd = otherAddressConstants.tableloctder.first();
            browserActions.clickAndWait(editTd, 'Edit Clicked');
            otherAddressConstants.addrPopup.isPresent().then(function (isAddrPopup) {
                if (isAddrPopup) {
                    logger.info('EDIT ADDRESS POPUP PRESENT');
                    addressEvents(false, true);
                } else {
                    logger.info('EDIT ADDRESS POPUP NOT PRESENT')
                }
            });

            filterAddr(true);;
        });
    });

    it('Delete newly added Addresss', function () {
        otherAddressConstants.tableloctder.count().then(function (tdCount) {
            logger.info('td Count', tdCount);
            var delTd = otherAddressConstants.tableloctder.last();
            browserActions.clickAndWait(delTd, 'Delete Clicked');
            otherAddressConstants.delPopup.isPresent().then(function (isdelPopup) {
                if (isdelPopup) {
                    logger.info('Delete Popup is present');
                    browserActions.clickAndWait(otherAddressConstants.btnPopupDelAddr, "Popup Del Addr is Clicked");
                    browser.refresh();
                } else {
                    logger.info('Delete Popup is not present');
                }
            });
            filterAddr(true,true);
        });
    });

});