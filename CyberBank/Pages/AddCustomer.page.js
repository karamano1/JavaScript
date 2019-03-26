require('../Utilities/customLocators.js');
var BankManagerPage = require('./BankManager.page.js');

var AddCustomerPage = function(){
    this.FirstNameLabel = element(by.cssContainingText('label', 'First Name :'));
    this.AddFirstname = element(by.model("fName"));
    this.LastNameLabel = element(by.cssContainingText('label', 'Last Name :'));
    this.AddLastname = element(by.model("lName"));
    this.PostCodeLabel = element(by.cssContainingText('label', 'Post Code :'));
    this.AddPostCode = element(by.model("postCd"));
    this.AddCustomerButton = $(".btn-default");
    this.formRequiredFields = $$("input:required");
    this.customerForm = element(by.name('myForm'));
    

this.goToAddCustomer = function(){
   BankManagerPage.AddCustomer.click();
}

}

module.exports=new AddCustomerPage();