require('../Utilities/customLocators.js');
var EC = protractor.ExpectedConditions;


var CorporateFlyTapPage = function(){
this.CorporateLink = $(".menu-sites>li:nth-child(3) span:nth-child(1)");
this.TapCorporateLogo = $(".header-logo");
this.TrioHeaderLinks = $$(".menu-sites a");
this.Contacts = $(".menu-user .link-icn-support>span");
this.MyCorporateAndEn = $$(".menu-user button:nth-child(1)");
this.HowItWorksLink = $(".menu-services>li:nth-child(3)>a");
this.HowItWorksList = $$(".menu-sub>li");

this.BusinessTravelsLink = $(".menu-services>li:nth-child(4)>a");
this.BusinessTravelsText = $(".bg-contents>h2");
this.FlyTapLogo = $(".logo.hp");
this.InstitutionalHistory = $(".content-ul>li:nth-child(3)");
this.SelectCountryLanguage = $$(".txt-title.js-modal-title").get(0);
this.CloseSelectCountryLanguage = $(".mod-shown .js-hideModal");

//texts
this.HeadingTexts = $$(".page-section h2");
this.TrioImagesWithText = $$(".corporate-features>.item");
this.TrioImagesText = $$(".item-content");
this.EightImagesWithTexts = $$(".item-list>.item");
this.EightImagesTitles = $$(".item-list>.item .title");
this.FiveImagesTexts = $$(".item-list>.item>span:nth-child(3)");
this.FirstDivText = $(".lead");
this.LastDivTexts = $$(".section-lead");

//elements on link pages
this.elementOnHIW = $(".centered-content>h2");
this.elementOnContacts = $(".box>h3");
this.elementOnBusTravel = $("h3.align-left");
this.elementOnJoinNow = $("#ui-id-5");
this.elementOnLogin = $("h2.page-title");
this.elementOnFindOutMore = $(".banner-contents.wrap h2");
this.elementOnSeeAll = $(".filter-destinations");


//button links
this.SignLogin = $$(".btn-wrapper>a");
this.FlightLinks = $$(".menu-ibe li>a");
this.FindOutMore = $(".advantages-list>.btn-info");
this.SeeAll = $(".destinations-list .btn");


//bookFlightlinkLables
this.LoginPopUp = element(by.xpath("//div[@aria-hidden='false']/div/div/form[@id='loginModalForm']/fieldset"));
this.LoginLabel = element(by.xpath("//div[@aria-hidden='false']/div/div/div[@class='txt-title js-modal-title']"));
this.UserAndPassLabel = $$("[aria-hidden='false'] #loginModalForm>fieldset>label.ipt-label");
this.RecUserAndPass = $$("[aria-hidden='false'] #loginModalForm fieldset>a");
this.showPass = $("[aria-hidden='false'] .pull-right");
this.LoginButton = $("[aria-hidden='false'] .btn.small.btn-border.js-login-modal-submit");
this.LastPar = $("[aria-hidden='false'] .cleanStyle.bottom-links");
this.UserInput = $("[aria-hidden='false'] #js-login-user");
this.PassInput = $("[aria-hidden='false'] #js-login-pass");
this.UserError = $("[aria-hidden='false'] #js-login-user-error");
this.PassError = $("[aria-hidden='false'] #js-login-pass-error");
this.ErrorTitle = element(by.xpath("//*[@id='loginModalForm']/div[@aria-hidden='false' and @class='msg-warning error-message'] /div/span[2]"));
this.CorrectInputsText = element(by.xpath("//*[@id='loginModalForm']/div[@aria-hidden='false' and @class='msg-warning error-message'] /div[2]/strong"));
this.ForgotPassText = element(by.xpath("//*[@id='loginModalForm']/div[@aria-hidden='false' and @class='msg-warning error-message'] /ul/li"));


//checkInLinkLabels
this.CheckInForm = $("[aria-hidden='false'] #js-validation-checkin");
this.CheckInMessage = $("[aria-hidden='false'] .label-strong");
this.CheckInLabels = $$("[aria-hidden='false'] .ipt-label");
this.CheckInInputs = $$("[aria-hidden='false'] .ipt-wrapper>input");
this.DateDropdown = $("[aria-hidden='false'] #reservationDate");
this.ContinueButton = $("[aria-hidden='false'] .box-ibe>button");
this.linksBelow = $$("[aria-hidden='false'] .panel-footer>a");
this.FromErrorOnCheckIn = $("[aria-hidden='false'] #js-origin-airport2-error");
this.ReserveError = $("[aria-hidden='false'] #reservationCode-error");




//Flight Info Labels
this.FlightInfoForm = $("[aria-hidden='false'] .js-form-flight-info-tool");
this.FlightSearch = $("[aria-hidden='false'] .booking-flight-type>legend");
this.RadioButtons = $$("[aria-hidden='false'] .radio-content>.ipt-label");
this.FromLabel = $("[aria-hidden='false'] [for='js-origin-airport3']");
this.ToLabel = $("[aria-hidden='false'] [for='js-destination-airport3']");
this.ToInput = $("[aria-hidden='false'] #js-destination-airport3");
this.FromInput = $("[aria-hidden='false'] #js-origin-airport3");
this.DepartLabel = $("[aria-hidden='false'] [for='origin-combo12']");
this.DepartDropdown = $("[aria-hidden='false'] #origin-combo12");
this.DepartDropdownOptions = $$("[aria-hidden='false'] #origin-combo12>option");
this.DayLabel = $("[aria-hidden='false'] [for='js-flight-date']");
this.DayDropdown = $("js-flight-date");
this.ContinueButtonOnFlightInfo = $("[aria-hidden='false'] .btn-wrapper>button");
this.TPLabel = $("[aria-hidden='false'] [for='tpNumber']");
this.TPInput = $("[aria-hidden='false'] #tpNumber");


this.FromErrorOnFlightInfo = $("[aria-hidden='false'] #js-origin-airport3-error");
this.ToErrorOnFlightInfo = $("[aria-hidden='false'] #js-destination-airport3-error");
this.TPErrorMessage = $("[aria-hidden='false'] #tpNumber-error");


// Manage booking Labels
this.ManageForm = $("[aria-hidden='false'] .js-form-manage-reservations");
this.ManageOptions = $("[aria-hidden='false'] .label-strong");
this.ManageRadioButtons = $$("[aria-hidden='false'] .radio-content .ipt-label");
this.ManageLabels = $$("[aria-hidden='false'] form>fieldset:nth-child(3) .ipt-label");
this.ManageInputs = $$("[aria-hidden='false'] form>fieldset:nth-child(3) input");
this.ManageErrorMessages = $$("[aria-hidden='false'] form>fieldset:nth-child(3) .error-field>label");
this.ManageContinueButton = $("[aria-hidden='false'] .btn-wrapper>button")
this.SearchReservePage = $(".title-container h1");
this.ManageReceiptLabels = $$("[aria-hidden='false'] form>fieldset:nth-child(4) .ipt-label");
this.ManageReciptInputs = $$("[aria-hidden='false'] form>fieldset:nth-child(4) input");
this.ManageReceiptErrorMessage = $$("[aria-hidden='false'] form>fieldset:nth-child(4) .error-field>label");




//Ask for Refunds
this.RefundPage = $(".align-center h2");

this.CurrentURL = function(){
    return browser.getCurrentUrl();
}
this.Title = function(){
    return browser.getTitle();
}

this.checkTitlesOfTheLInks = function(linkName, element, title){
    browser.sleep(2000);
   browser.executeScript("arguments[0].scrollIntoView();", linkName).then(()=>{
    linkName.sendKeys(protractor.Key.ENTER);
    browser.wait(EC.visibilityOf(element), 12000).then(()=>{
        expect(this.Title()).toEqual(title);
    })
     this.TapCorporateLogo.click();
})
}

this.checkHeaderTitles = function(linkName, element, title){
    linkName.click();
browser.wait(EC.visibilityOf(element), 12000).then(()=>{
    expect(this.Title()).toEqual(title);
})
this.TapCorporateLogo.click();
}

this.doubleWindows = function(specialElement, title){
    browser.sleep(2000);
  
    browser.getAllWindowHandles().then(handles=>{
        browser.switchTo().window(handles[1]);
         browser.wait(EC.visibilityOf(specialElement), 12000).then(()=>{
            expect(this.Title()).toContain(title);
         });
         browser.close().then(()=>{
            browser.switchTo().window(handles[0]);
        });
    })
}


this.DisplayMultipleLinks = function(linkName, linkText){
    linkName.count().then(count=>{
        for(let i = 0; i < count; i++){
            expect(linkName.get(i).isDisplayed()).toBe(true);
            expect(linkName.get(i).getText()).toContain(linkText[i].link)
        }
    })
}

this.DisplaySingleLink = function(linkName, linkText){
    expect(linkName.isDisplayed()).toBe(true);
    expect(linkName.getText()).toContain(linkText);
}

this.bookFlightLinkContents = function(link){
    link.count().then(count=>{
        for(let i =0; i < count; i++){
               expect(link.get(i).isDisplayed()).toBe(true);
        }
    }) 
}

this.checkInContents = function(link, linkText){
    link.count().then(count=>{
        for(let i = 0; i < count; i++){
            expect(link.get(i).isDisplayed()).toBe(true);
            expect(link.get(i).getText()).toEqual(linkText[i].link);
        }
    })
}

this.verifyingError = function(error, data){
expect(error.isDisplayed()).toBe(true);
expect(error.getText()).toContain(data);
}


}

module.exports = new CorporateFlyTapPage();