var trx = require('jasmine-trx-reporter');
var today = new Date();
var timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' +
    today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();

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

    specs: [
        './Specs/Smoke/login.e2e-spec.js',
        './Specs/Smoke/materials.e2e-spec.js',
        './Specs/Smoke/checkout.e2e-spec.js',
    ],

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
                    'directory_upgrade': true,
                    'default_directory': './Automation/downloads'
                }
            }
        }
    },


    onPrepare() {
        //jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        dataProvider = require('jasmine-data-provider');

        browser.driver.manage().timeouts().implicitlyWait(30000);
        browser.driver.manage().window().maximize();

        browser.baseURL = "https://nni-sit.knipper.com/#/login";

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
