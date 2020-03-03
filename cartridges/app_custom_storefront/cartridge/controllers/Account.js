var account = module.superModule;
var server = require('server');

server.extend(account);

server.append('SubmitRegistration', function (req, res, next) {
  var CustomerMgr = require('dw/customer/CustomerMgr');
  var Transaction = require('dw/system/Transaction');
  var Resource = require('dw/web/Resource');
  var formErrors = require('*/cartridge/scripts/formErrors');
  var registrationForm = server.forms.getForm('profile');

  // We are appending this functionality to thje default
  // If the form is valid we have a new user.
  var data = res.getViewData() || {};
  if (registrationForm.valid) {
    var dob = registrationForm.customer.dob.value;
    data.dob = dob;

    // SFRA will handle creating the user, we need to hook in
    // after that and get the user and add the DOB to the profile
    this.on('route:Complete', function (req, res) {
      var viewData = res.getViewData();
      var login = viewData.email;
      try {
        Transaction.wrap(function () {
          var customer = CustomerMgr.getCustomerByLogin(login);
          if (customer) {
            // customer.profile.DOB = dob;
            customer.profile.custom.DOB = dob;
          }
        });
      } catch (err) {
        viewData.dob = false;
        viewData.form.customer.dob.valid = false;
        viewData.form.customer.dob.error = Resource.msg('error.message.dob.error', 'forms', null);
      }
    });
  }

  res.setViewData(data);
  return next();
});

module.exports = server.exports();