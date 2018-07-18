'use strict'

var addressBookConstants = require('../../PageObjects/AddressBook.js');
var addressBookData = require('../../TestData/addressbook.json');



describe('Address Book', function () {
    var browserActions;
    var logger;
    var addressEvents;

    beforeEach(function () {
        browserActions = browser.browserActions;
        logger = browser.logger;
    });

    describe('My Addresses Tab', function () {

        addressEvents = function (isSetDefault, isEdit) {
            browserActions.clickAndWait(addressBookConstants.drpdwnAddressTypeOther, 5000, "Address Type Dropdown clicked");
            if (isSetDefault) {
                browserActions.clickAndWait(addressBookConstants.btnSetDefault, 5000, "Default button clicked");
            }

            var firstname = isEdit ? addressBookData.firsteditname : addressBookData.firstname;
            var lastname = isEdit ? addressBookData.lasteditname : addressBookData.lastname;
            var txtAddr1 = isEdit ? addressBookData.addr1eddit : addressBookData.addr1;
            var txtAddr2 = isEdit ? addressBookData.addr2edit : addressBookData.addr2;
            var txtAddr3 = isEdit ? addressBookData.addr3edit : addressBookData.addr3;

            browserActions.type(addressBookConstants.txtFirstName, firstname, "First Name Entered");
            browserActions.type(addressBookConstants.txtLastName, lastname, "Last Name Entered");
            browserActions.type(addressBookConstants.txtAddr1, txtAddr1, "address1 Entered");
            browserActions.type(addressBookConstants.txtAddr2, txtAddr2, "address2 Entered");
            browserActions.type(addressBookConstants.txtAddr3, txtAddr3, "address3 Entered");
            if (!isEdit) {
                browserActions.type(addressBookConstants.txtCityName, addressBookData.city, "City Entered");
                browserActions.clickAndWait(addressBookConstants.ddlState, 5000, "State Type Dropdown clicked");
                browserActions.type(addressBookConstants.txtZipCode, addressBookData.zipcode, "Zip Entered");
                browserActions.type(addressBookConstants.txtPhone, addressBookData.phone, "Phone Entered");
                browserActions.clickAndWait(addressBookConstants.btnSaveChanges, 5000, "Save the New Address Changes");
            } else {
                browserActions.clickAndWait(addressBookConstants.btnEditedSave, 5000, "Save the Edited Address");
            }
            //btnEditedSave
        };

        it('Check default address', function () {
            logger.info('STARTED EXECUTING MY ADDRESS BOOK');
            browser.browserActions.clickAndWait(addressBookConstants.lnkSysAdmin, 5000, "System Admin link clicked");
            browser.browserActions.clickAndWait(addressBookConstants.lnkAddrBook, 5000, 'Address Book Menu item clicked');
            addressBookConstants.addresses.count().then(function (addressCount) {
                if (addressCount) {
                    logger.info("Default Address Present " + addressCount);
                    addressBookData.addressCount = addressCount;
                } else {
                    logger.info("Default Address NOT Present");
                }
                expect(addressCount > 0).toBeTruthy();
            });

        });

        it('Add New Address', function () {
            browserActions.clickAndWait(addressBookConstants.btnAddAddress, 5000, "Add New Address button clicked");
            addressBookConstants.addresses.count().then(function (addrcount) {
                logger.info('addrCount: ' + addrcount);
            });
            addressBookConstants.addrPopup.isPresent().then(function (isAddrPopup) {
                if (isAddrPopup) {
                    logger.info('ADDRESS POPUP PRESENT');
                    addressEvents(false, false);
                    addressBookConstants.addresses.count().then(function (addressCount) {
                        if (addressCount > 1) {
                            logger.info("Address Count more than one" + addressCount);
                            addressBookData.addressCount = addressCount;
                        } else {
                            logger.info("Address Count not more than one");
                        }
                    });

                } else {
                    logger.info('ADDRESS POPUP NOT PRESENT')
                }
                browserActions.waitAndFindElement(addressBookConstants.divSuccessAddr, 5000, 'Waiting for Sucess Message Present');
                addressBookConstants.divSuccessAddr.isDisplayed().then(function (sucessMsg) {
                    expect(sucessMsg).toBeTruthy();
                });

                //Check if the address set as the last one in the queue and its set as default, 
                addressBookConstants.addresses.last().getText().then(function (addressText) {
                    var k = addressText.split("\n");
                    logger.info('CHECKING THE DEFAULT ADDRESS THAT IS SET');
                    expect(k).toContain('Other');
                    expect(k).toContain('Ajay Nallanagula');
                    expect(k).toContain('Addr1Test');
                    expect(k).toContain('Secunderabad AK 12345');
                });
            });
        });

        it('Add New Address and Set as Default', function () {
            logger.info('_____________STARTED EXECUTING MY ADDRESS BOOK SET DEFAULT_____________');
            browserActions.clickAndWait(addressBookConstants.btnAddAddress, 5000, "Add New Address button clicked");
            addressBookConstants.addrPopup.isPresent().then(function (isAddrPopup) {
                if (isAddrPopup) {
                    logger.info('ADDRESS POPUP PRESENT');
                    addressEvents(true, false);
                    addressBookConstants.addresses.count().then(function (addressCount) {
                        if (addressCount > 1) {
                            logger.info("Address Count more than one" + addressCount);
                        } else {
                            logger.info("Address Count not more than one");
                        }
                        expect(addressCount > addressBookData.addressCount).toBeTruthy();
                    });

                } else {
                    logger.info('ADDRESS POPUP NOT PRESENT')
                }

                browserActions.waitAndFindElement(addressBookConstants.divSuccessAddr, 5000, 'Waiting for Success Message Present');
                addressBookConstants.divSuccessAddr.isDisplayed().then(function (sucessMsg) {
                    if (sucessMsg) {
                        logger.info('Sucess Msg Present');
                        expect(sucessMsg).toBeTruthy();
                    } else {
                        logger.info('Sucess Msg Not Present');
                    }

                });

                //Check if the address set as the first one in the queue and its set as default, 
                addressBookConstants.addresses.first().getText().then(function (addresssText) {
                    var k = addresssText.split("\n");
                    logger.info('CHECKING THE DEFAULT ADDRESS THAT IS SET');
                    expect(k).toContain('Other (default)');
                    expect(k).toContain('Ajay Nallanagula');
                    expect(k).toContain('Addr1Test');
                    expect(k).toContain('Secunderabad AK 12345');
                    expect(k[k.length - 1]).toContain('Edit'); //default address will not have delete here
                });

            });

        });

        describe('My Address Tab for Edit', function () {
            it('Address', function () {
                browserActions.clickAndWait(addressBookConstants.btnEditAddress, "Edit Address Button Clicked");
                addressBookConstants.addrPopup.isPresent().then(function (isAddrPopupEdit) {
                    if (isAddrPopupEdit) {
                        logger.info('ADDRESS POPUP FOR EDIT PRESENT');
                        addressEvents(false, true);

                        addressBookConstants.addresses.last().getText().then(function (addressText) {
                            var k = addressText.split("\n");
                            logger.info('CHECKING THE FIRST ADDRESS THAT IS EDITED');
                            expect(k).toContain('AjayFirstNameEdited NallanagulaLastNameEdited');
                            expect(k).toContain('Addr1TestEdited'); 
                            expect(k).toContain('Addr2TestEdited');
                            expect(k).toContain('Addr3TestEdited');
                        });
                    } else {
                        logger.info('ADDRESS POPUP NOT PRESENT')
                    }
                });
            })
        }); //nested lev 2

        describe('My Address Tab for Delete', function () {

            it('Adrress', function () {
                addressBookConstants.addresses.count().then(function (addressCount) {
                    if (addressCount > 1) {
                        logger.info("Delete is possible ,Multiple Address Available ", addressCount);

                        browserActions.clickAndWait(addressBookConstants.lnkDelete, "Address is been deleted");

                        addressBookConstants.delPopup.isPresent().then(function (isdelPopup) {
                            if (isdelPopup) {
                                logger.info('Delete Popup is present');
                                browserActions.clickAndWait(addressBookConstants.btnPopupDelAddr, "Popup Del Addr is Clicked");
                                browser.refresh();
                                addressBookConstants.addresses.count().then(function (addressTextCount) {
                                    logger.info("Addr Count after Delete",addressTextCount);
                                    expect(addressTextCount).toEqual(addressCount-1);
                                });
                            } else {
                                logger.info('Delete Popup is not present');
                            }
                        });
                    } else {
                        logger.info("Delete is not possible ,Only Default Address is Present");
                    }
                });
            });
        }); //nested lev 2

    }); //nested lev 1
}); //outerdescribe