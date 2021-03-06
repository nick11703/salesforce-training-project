var checkIfCustomerIsAdult = function (customerDOB) {
    var sitePrefs = dw.system.Site.getCurrent().getPreferences();
    var minimumAge = sitePrefs.getCustom()["restrictedAge"];
    var month=(customerDOB.getMonth() +1);
    var day=customerDOB.getDate();
    var year=customerDOB.getFullYear();
    var mydate = new Date();
    mydate.setFullYear(year, month-1, day);

    var currdate = new Date();
    var setDate = new Date();

    setDate.setFullYear(mydate.getFullYear() + minimumAge, month-1, day);

    if ((currdate - setDate) > 0){
        return true;
    }else{
        return false;
    }
};
var checkIfCustomerIsAdultByFormField = function(formfield) {
    return checkIfCustomerIsAdult(formfield.value);
};

module.exports = {
    checkIfCustomerIsAdult: checkIfCustomerIsAdult,
    checkIfCustomerIsAdultByFormField: checkIfCustomerIsAdultByFormField
}