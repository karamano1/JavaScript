require('../Utilities/customLocators.js');
var HomePage = require('../Pages/Home.page.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base = require('../Utilities/base.js');
var AddCustomerPage = require('../Pages/AddCustomer.page.js');
var BankData = require('../TestData/BankData.json');

describe('Login', () => {   
    beforeEach(()=>{
        Base.navigateToHome(Base.homeUrl);
    });
    it('should have correct page title', () => {
        expect(browser.getTitle()).toEqual("Protractor practice website - Banking App");
    });
    it('should display Home button', () => {
        expect(HomePage.homeButton.isDisplayed()).toBe(true);
        expect(HomePage.homeButton.getText()).toEqual("Home");
        
    });
    it('should display page header', ()=>{
        expect(HomePage.bankName.isDisplayed()).toBe(true);
        expect(HomePage.bankName.getText()).toEqual(BankData.appData.bankName);
    });
    it('should display a Login option for Bank Manager', ()=>{
    expect(HomePage.bankManagerLoginButton.isDisplayed()).toBe(true);
    expect(HomePage.bankManagerLoginButton.getText()).toEqual(BankData.appData.bankManagerLoginButtonText);
    });

    it('should stay at homepage when Home button is clicked', () => {
       HomePage.homeButton.click();
        expect(browser.getCurrentUrl()).toEqual("http://www.way2automation.com/angularjs-protractor/banking/#/login");
        //expect(HomePage.bankManagerLoginButton.getText()).toEqual("Bank Manager Login");
    });
    it('should Login as a Bank Manager', ()=>{
        HomePage.bankManagerLoginButton.click();
        expect(browser.getCurrentUrl()).toEqual("http://www.way2automation.com/angularjs-protractor/banking/#/manager");
        expect(BankManagerPage.AddCustomer.isDisplayed()).toBe(true);
    });
    it('should display options for Bank Manager', () => {
        HomePage.bankManagerLoginButton.click();
        expect(BankManagerPage.AddCustomer.isDisplayed()).toBe(true);
        expect(BankManagerPage.OpenAccount.isDisplayed()).toBe(true);
        expect(BankManagerPage.Customers.isDisplayed()).toBe(true);
       
    });
    it("should tale back to the Home page from Manager Login page", function(){
        HomePage.bankManagerLoginButton.click();
        HomePage.homeButton.click();
        expect(HomePage.bankManagerLoginButton.getText()).toEqual(BankData.appData.bankManagerLoginButtonText);
    })
});


describe('Bank Manager', () => {
var CustomerListPage = require('../Pages/CustomersList.page.js');
    describe('Manager Login', () => {
    });

    describe('Adding a Customer', () => {
        beforeAll(()=>{
            Base.navigateToHome(Base.homeUrl);
            HomePage.bankManagerLoginButton.click();
            AddCustomerPage.goToAddCustomer();
        })

        it('should display form for Adding a Customer', function(){
            expect(AddCustomerPage.FirstNameLabel.isDisplayed(), AddCustomerPage.LastNameLabel.isDisplayed(),AddCustomerPage.PostCodeLabel.isDisplayed()).toBe(true);
            expect(AddCustomerPage.customerForm.isDisplayed()).toBe(true);
        })
    
    it('should list all the labels', function(){
        expect(AddCustomerPage.FirstNameLabel.getText()).toEqual("First Name :");
        expect(AddCustomerPage.LastNameLabel.getText()).toEqual("Last Name :");
        expect(AddCustomerPage.PostCodeLabel.getText()).toEqual("Post Code :");
        
    })
    it('should require firstName', function(){
        expect(AddCustomerPage.formRequiredFields.get(0).getAttribute('required')).toEqual('true');
    });

    it('should Add a New Customer', function(){
        for(let i = 0; i < BankData.customers.length; i++){
        AddCustomerPage.AddFirstname.sendKeys(BankData.customers[i].firstName);
        AddCustomerPage.AddLastname.sendKeys(BankData.customers[i].lastName);
        AddCustomerPage.AddPostCode.sendKeys(BankData.customers[i].postCode);
        AddCustomerPage.AddCustomerButton.click();
        let myAlert = browser.switchTo().alert();
        expect(myAlert.getText()).toContain("Customer added successfully with customer id :");
        myAlert.accept();
        //myAlert.dismiss();
CustomerListPage.Customers.click();
expect(CustomerListPage.getLastRowValue(1).getText()).toEqual(BankData.customers[i].firstName);
expect(CustomerListPage.getLastRowValue(2).getText()).toEqual(BankData.customers[i].lastName);
expect(CustomerListPage.getLastRowValue(3).getText()).toEqual(BankData.customers[i].postCode);
expect(CustomerListPage.getLastRowValue(4).getText()).toEqual(BankData.customers[i].accountNumber);
      browser.navigate().back();
}   

    });


//     xit("should display all customers", function(){
//         CustomerListPage.Customers.click();
//         let arrCustomers = [];
//         for(let i = 0; i < CustomerListPage.firstNameTable.length; i++){
//             if(CustomerListPage.firstNameTable[i]!==""){
//                 arrCustomers.push(CustomerListPage.firstNameTable[i]);
//             }
           
//         }
        
//     })
//     it('should delete the Customer', function(){
//         CustomerListPage.deleteCustomerButton.click();
//         expect(CustomerListPage.getLastRowValue(1).getText()).not.toEqual("Mike");
//     });


 });
});