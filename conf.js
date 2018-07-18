var trx = require('jasmine-trx-reporter');
var path = require('path');
var downloadsPath = path.resolve(__dirname, './Downloads');
var today = new Date();
var timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' +
    today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();



var suiteConstants = {
login:'./Specs/Login/**/*.e2e-spec.js',
signout:'./Specs/SignOut/signout.e2e-spec.js',
productsearch : './Specs/Material/productsearch.e2e-spec.js',
checkout: './Specs/Checkout/checkout.e2e-spec.js',
orderplacement: './Specs/OrderPlacement/orderplacement.e2e-spec.js',
orderdetail : './Specs/OrderDetail/orderdetail.e2e-spec.js',
orderhistory:'./Specs/OrderHistory/orderhistory_filter_ordernumber.e2e-spec.js',
myprofile:'./Specs/Profile/profile.e2e-spec.js',
addressbook:'./Specs/AddressBook/addressbook.e2e-spec.js',
otheraddresses:'./Specs/AddressBook/otheraddresses.e2e-spec.js',
supportcenter:'./Specs/SupportCenter/supportcenter.e2e-spec.js'
};

exports.config = {
    framework: 'jasmine',
   
    afterLaunch: function () {
        return new Promise(function (resolve, reject) {
           
        });
    },
    params: {
        executeKey: {
            smokeTest: false,
            func: true
        }
    },

    suites: {
      login_support_signout:[suiteConstants.login,suiteConstants.supportcenter,suiteConstants.signout],
      login_addressbook_signout:[suiteConstants.login,suiteConstants.addressbook,suiteConstants.otheraddresses,suiteConstants.signout],
      login_myprofile_signout:[suiteConstants.login,suiteConstants.myprofile,suiteConstants.signout],
      login_orderplacement_signout: [suiteConstants.login, suiteConstants.productsearch,suiteConstants.checkout, suiteConstants.orderplacement,suiteConstants.orderdetail,suiteConstants.orderhistory,suiteConstants.signout], //suiteConstants.signout
      login_orderhistory_signout:[suiteConstants.login,suiteConstants.orderhistory,suiteConstants.signout],
      smoke:[suiteConstants.login, suiteConstants.productsearch,suiteConstants.checkout, suiteConstants.orderplacement,suiteConstants.orderhistory,suiteConstants.addressbook,suiteConstants.otheraddresses,suiteConstants.myprofile,suiteConstants.supportcenter,suiteConstants.signout]
    },

    useAllAngular2AppRoots: true,
    capabilities: {
        browserName: 'chrome'
    },

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {

            prefs: {
                download: {
                    'prompt_for_download': false,
                    'default_directory': path.resolve(__dirname, '\Downloads'),//This is to download the Interactive Guide 
                    'directory_upgrade': true
                }
            }
        }
    },


    onPrepare() {
        //jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        dataProvider = require('jasmine-data-provider');

        browser.driver.manage().timeouts().implicitlyWait(30000);
        browser.driver.manage().window().maximize();

        return browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName').toUpperCase();
            minwait = 60000;
            MAXWAITTIME = 60000;

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            today = mm + '_' + dd + '_' + yyyy;

            browser.browserActions = new (require('./Utils/actions.js')).BrowserACtions();

            var log4js = require('log4js');
            log4js.configure({
                appenders: {
                    out: { type: 'stdout' },
                    app: { type: 'file', filename: 'RepPortal-Logs/RepPortal.Web_Execution_' + timeStamp + '.log' }
                },
                categories: {
                    default: { appenders: ['out', 'app'], level: 'debug' }
                }
            });
            browser.logger = log4js.getLogger('RepPortal');

            var jasmineTrxConfig = {
                reportName: 'Functional Test Results',
                folder: 'Reports/TRX',
                outputFile: 'Test.trx',
                browser: browserName,
                groupSuitesIntoSingleFile: true
            };

            jasmine.getEnv().addReporter(new trx(jasmineTrxConfig));

        });

    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },

};
