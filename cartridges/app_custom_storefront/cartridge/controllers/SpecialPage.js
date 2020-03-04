'use strict';

var server = require('server');
var dobValidate = require('../scripts/dob-validation');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
server.get('Show',  function (req, res, next) {
  var sitePrefs = dw.system.Site.getCurrent().getPreferences();
  var restrictedAge = sitePrefs.getCustom()["restrictedAge"];
  var customerLoggedIn = checkIfLoggedInCustomer(req);
  var customerIsAdult = false;

  if(customerLoggedIn) {
    var customerDOB = new Date(req.currentCustomer.raw.profile.custom.DOB);
    customerIsAdult = dobValidate.checkIfCustomerIsAdult(customerDOB);
  }
  if (customerLoggedIn && customerIsAdult) {
    res.render('Category/SpecialCategory');
  } else {
    res.render('Category/DenialPage', {
      restrictedAge: restrictedAge
     });
  }
  next();
});

function checkIfLoggedInCustomer(req) {
	return req.currentCustomer.profile;
}


module.exports = server.exports();
