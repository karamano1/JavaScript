require('../Utilities/customLocators.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base = require('../Utilities/base.js');
var fs = require('fs');
var using = require('jasmine-data-provider');
 
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
describe('Bank Manager', () => {
    

describe('As a Bank manager, adding a new Customer', () => {
    beforeEach(()=>{
     Base.navigateToHome(Base.ManagerUrl);
    })
    it('should display form for Adding a Customer', ()=>{
        expect(BankManagerPage.AddCustomer.isDisplayed()).toBe(true);
    });
    it('should list first name on the form', function(){
        BankManagerPage.AddCustomer.click();
expect(BankManagerPage.AddFirstname.isDisplayed()).toBe(true);
    })

    it('should list First Name Label on the form', function(){
        BankManagerPage.AddCustomer.click();
        expect(BankManagerPage.FirstNameLabel.getText()).toEqual("First Name :");
    });

    it('should list Last Name on the form', function(){
        BankManagerPage.AddCustomer.click();
        expect(BankManagerPage.AddLastname.isDisplayed()).toBe(true);
    });
    it('should list Last Name label on the form', function(){
        BankManagerPage.AddCustomer.click();
        expect(BankManagerPage.LastNameLabel.getText()).toEqual("Last Name :");
    });
    it('should list Zip Code label on the form', function(){
        BankManagerPage.AddCustomer.click();
        expect(BankManagerPage.PostCodeLabel.getText()).toEqual("Post Code :");
       
    });
 it('should require a First name field', function(){
     BankManagerPage.AddCustomer.click();
     BankManagerPage.AddCustomerButton.click();
     browser.takeScreenshot().then(function (png) {
         writeScreenShot(png, 'exception'+Date.now+'.png');
     });
 })
it('should require a Last name field', function(){
    BankManagerPage.AddCustomer.click();
    BankManagerPage.AddFirstname.sendKeys("Mike");
    BankManagerPage.AddCustomerButton.click();
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception'+Date.now+'.png');
    });
});
it('should require a Post Code field', function(){
    BankManagerPage.AddCustomer.click();
    BankManagerPage.AddFirstname.sendKeys("Mike");
    BankManagerPage.AddLastname.sendKeys("Smith");
    BankManagerPage.AddCustomerButton.click();
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception'+Date.now+'.png');
    });
})

it('should Add a New Customer', function(){
    BankManagerPage.AddCustomer.click();
    BankManagerPage.AddFirstname.sendKeys("Mike");
    BankManagerPage.AddLastname.sendKeys("Smith");
    BankManagerPage.AddPostCode.sendKeys(15217);
    BankManagerPage.AddCustomerButton.click();
    let myAlert = browser.switchTo().alert();
    expect(myAlert.getText()).toEqual("Customer added successfully with customer id :6");
    myAlert.accept();
});

it('should require first', function(){
    BankManagerPage.AddCustomer.click();
    BankManagerPage.AddCustomerButton.click();
    expect(BankManagerPage.AddFirstname.getAttribute('class')).toContain('ng-invalid-required');
})
});
});