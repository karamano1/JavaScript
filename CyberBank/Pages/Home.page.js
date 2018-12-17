require('../Utilities/customLocators.js');

var HomePage = function(){
this.homeButton = element(by.buttonText("Home"));
this.bankName = $(".box.mainhdr>strong");
this.bankManagerLoginButton = element(by.ngClick('manager()'));
this.AddCustomer = element(by.ngClick("addCust()"));









};

module.exports = new HomePage();