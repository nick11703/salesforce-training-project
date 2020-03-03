'use strict';

var server = require('server');
var dobValidate = require('../scripts/dob-validation');
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
server.get('Show',  function (req, res, next) {
	var customerLoggedIn = checkIfLoggedInCustomer(req);
	var customerIsAdult = false;

	if(customerLoggedIn) {
		var accountModel = getModel(req);
		var customerDOB = accountModel.profile.DOB;
		var customerDOB = new Date (accountModel.profile.DOB);
		customerIsAdult = dobValidate.checkIfCustomerIsAdult(customerDOB);
	}
	if (customerLoggedIn && customerIsAdult) {
    res.render('Category/SpecialCategory');
    next();
	} else {
	    res.render('Category/DenialPage');
	    next();	
	}
});

function checkIfLoggedInCustomer(req) {
	return req.currentCustomer.profile;
}

function getModel(req) {
    var OrderMgr = require('dw/order/OrderMgr');
    var Order = require('dw/order/Order');
    var AccountModel = require('*/cartridge/models/account');
    var AddressModel = require('*/cartridge/models/address');
    var OrderModel = require('*/cartridge/models/order');
    var Locale = require('dw/util/Locale');

    var orderModel;
    var preferredAddressModel;

    if (!req.currentCustomer.profile) {
        return null;
    }

    var customerNo = req.currentCustomer.profile.customerNo;
    var customerOrders = OrderMgr.searchOrders(
        'customerNo={0} AND status!={1}',
        'creationDate desc',
        customerNo,
        Order.ORDER_STATUS_REPLACED
    );

    var order = customerOrders.first();

    if (order) {
        var currentLocale = Locale.getLocale(req.locale.id);

        var config = {
            numberOfLineItems: 'single'
        };

        orderModel = new OrderModel(order, { config: config, countryCode: currentLocale.country });
    } else {
        orderModel = null;
    }

    if (req.currentCustomer.addressBook.preferredAddress) {
        preferredAddressModel = new AddressModel(req.currentCustomer.addressBook.preferredAddress);
    } else {
        preferredAddressModel = null;
    }

    return new AccountModel(req.currentCustomer, preferredAddressModel, orderModel);
}

module.exports = server.exports();
