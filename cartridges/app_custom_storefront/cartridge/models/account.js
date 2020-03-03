'use strict';

var base = module.superModule;

module.exports = function account(currentCustomer, addressModel, orderModel) {
	base.call(this, currentCustomer, addressModel, orderModel);
   this.profile=getUpdatedProfile(currentCustomer);
    
}


function getUpdatedProfile(currentCustomer) {
    var result;
    if (currentCustomer.profile) {
        result = {
            firstName: currentCustomer.profile.firstName,
            lastName: currentCustomer.profile.lastName,
            email: currentCustomer.profile.email,
            phone: currentCustomer.profile.phone,
            password: '********',
            DOB: currentCustomer.raw.profile.custom.DOB
        };
    } else {
        result = null;
    }
    return result;
}