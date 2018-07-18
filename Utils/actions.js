BrowserACtions = function() {

    /**
      *Pass value on text box
    */
    this.type = function(oElement, value, message,shouldwait=false) {
        this.waitAndFindElement(oElement, MAXWAITTIME);
        message = message || 'Enter data';
        return oElement.clear().then(function(iscleared) {
            browser.logger.info('Text field cleared' + iscleared);
            return oElement.sendKeys(value).then(function(status) {
                browser.logger.info('PASS', message);
                // if (shouldwait){
                //   browser.logger.info('input command to wait');
                // }
                return status;

            });

        });
    };

    /**
      *Click on button
    */
    this.clickOn = function (oElement, message) {
      this.waitAndFindElement(oElement, MAXWAITTIME);
      try {
        message = message || 'Perform Click Operation on page control';
        return oElement.click().then(function () {
          browser.logger.info('PASS', message);
          return true;
        })
      } catch (err) {
        message = message || 'Perform Click Operation on page control';
        browser.logger.info('ERROR', "Failed to execute  clickOn action due to " + err.message);
        return false;
      }
    };

    /**
     *Click And Wait operation on object button , link, text box, text area ...etc.  on current page
     */
    this.clickAndWait = function(oElement, waittime, message) {

        try {
            this.waitAndFindElement(oElement, MAXWAITTIME);
            message = message || 'Perform Click Operation and wait for' + waittime + '  second(s)';
            oElement.click().then(function() {
                browser.sleep(waittime);
                browser.logger.info('PASS', message);
            })

        } catch (err) {
            browser.logger.info('ERROR', "Failed to execute  clickAndWait action due to " + err.message);

        }

  };


    /**
     *    Check box button on current page
     */
    this.selectCheckBox = function (oElement, message) {

      this.waitAndFindElement(oElement, MAXWAITTIME);

      message = message || 'Perform checkCheckBox Operation to check CheckBox on page';
      oElement.click().then(function (value) {
        // expect(value).toBeTruthy();
        logger.info('PASS', message);
        return value;
      });
    };



 //Utility Method- For Wait and Find Element
    this.waitAndFindElement = function (oElement, timeout) {
      browser.controlFlow().execute(function () {
        timeout = typeof timeout !== 'undefined' ? timeout : 40000;

        browser.wait(function () {
          return oElement.isDisplayed().then(function (displayed) {
            browser.sleep(500);
            return displayed;
          });
        }, timeout);

        browser.wait(function () {
          return oElement.isEnabled().then(function (enabled) {
            browser.sleep(500);
            return enabled;
          });
        }, timeout);
      });

    };
   
    this.isOnExpectedView = function( actualUrl,expectedurl){
      return actualUrl.indexOf(expectedurl) > -1;
    }

    this.getDatemmddyyyy = function(){
            var today = new Date();
            var dd = today.getDate().toString();
            dd =  dd.length === 1 ? '0'+dd : dd;
            browser.logger.info()
            var mm = (today.getMonth() + 1).toString();
            mm = mm.length === 1 ? '0'+mm : mm;
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            return today;
    }

    this.removeLineBreaks = function(noformatStr){
      var regex = new RegExp(/(\r\n\t|\n|\r\t)/gm);
      return noformatStr.replace(regex,"");
    }

    this.getDownloadPath = function(){
      var path = require('path');
      return  path.resolve(__dirname.replace('Utils',''), 'Downloads').toString();
    }

 };





module.exports.BrowserACtions = BrowserACtions;
