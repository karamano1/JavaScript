require('../Utilities/customLocators.js');

var BankManagerPage = function(){
this.AddCustomer = element(by.ngClick("addCust()"));
this.OpenAccount = element(by.ngClick("openAccount()"));
this.Customers = element(by.ngClick("showCust()"));



}
module.exports = new BankManagerPage();