describe("testing", function(){
    var EC = protractor.ExpectedConditions;
    beforeAll(()=>{
        browser.waitForAngularEnabled(false);
        browser.get("https://the-internet.herokuapp.com");
        element(by.linkText("JavaScript Alerts")).click();
    })
    it("first alert", function(){
        
        element(by.buttonText("Click for JS Alert")).click();
        let myAlert = browser.switchTo().alert();
        browser.wait(EC.alertIsPresent(), 12000);
        expect(myAlert.getText()).toEqual("I am a JS Alert");
        myAlert.accept();
        expect($("#result").getText()).toBe("You successfuly clicked an alert");

    })
    it("second alert", function(){
        element(by.partialButtonText("Confirm")).click();
        let myAlert = browser.switchTo().alert();
        browser.wait(EC.alertIsPresent(), 12000);
        expect(myAlert.getText()).toEqual("I am a JS Confirm");
        myAlert.dismiss();
        browser.sleep(2000);
        expect($("#result").getText()).toEqual("You clicked: Cancel");
    });
    it("third alert", function(){
        element(by.partialButtonText("Prompt")).click();
        let myAlert = browser.switchTo().alert();
        browser.wait(EC.alertIsPresent(), 12000);
        expect(myAlert.getText()).toEqual("I am a JS prompt");
        myAlert.sendKeys("Aidana");
        myAlert.accept();
        browser.sleep(2000);
        expect($("#result").getText()).toEqual("You entered: Aidana");
    })
})