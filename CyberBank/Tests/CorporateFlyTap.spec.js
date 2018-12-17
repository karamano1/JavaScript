require('../Utilities/customLocators2.js');
var Base = require('../Utilities/Base2.js');
var AppData = require('../TestData/AppData.json');
var CorporateFlyTapPage = require('../Pages/CorporateFlyTap.page.js');


describe('Verify the Corporate page on the FlyTap application', () => {
    var EC = protractor.ExpectedConditions;
    var browserHandles = [];
     beforeAll(()=>{
        browser.waitForAngularEnabled(false);
        Base.navigateTo(Base.homeCorporateUrl);
      CorporateFlyTapPage.CorporateLink.click();
      browser.getAllWindowHandles().then(handles=>{
      browserHandles=handles;
          browser.switchTo().window(browserHandles[0]);
          });
          browser.close().then(()=>{
            browser.switchTo().window(browserHandles[1]);   
      })
     });

    it('should display the accurate title and URL of the page', ()=>{
        browser.wait(EC.visibilityOf(CorporateFlyTapPage.TapCorporateLogo), 12000).then(()=>{
            expect(CorporateFlyTapPage.Title()).toEqual(AppData.titles.corporateHome);
            expect(CorporateFlyTapPage.CurrentURL()).toContain("https://www.tapcorporate.com/");
        });
    });

    it('should display the Objects on the header menu of the page', ()=>{
      CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.TrioHeaderLinks, AppData.linkTextsTrio);
      CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.Contacts, AppData.linkTextContact.link);
      CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.MyCorporateAndEn, AppData.linkTextMyCorpEn);
      CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.HowItWorksLink, AppData.linkTextHIW.link);
      CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.BusinessTravelsLink, AppData.linkTextBusTravel.link);
      expect(CorporateFlyTapPage.TapCorporateLogo.isDisplayed()).toBe(true);
             
    });

    it('should navigate to the Home Corporate Page when clicked on "Tap | Corporate" link', ()=>{
        CorporateFlyTapPage.TapCorporateLogo.click();
        expect(CorporateFlyTapPage.Title()).toEqual(AppData.titles.corporateHome);
    });

    it('should navigate to the FlyTap page when clicked on FlyTap link', ()=>{
        CorporateFlyTapPage.TrioHeaderLinks.get(0).click();
        CorporateFlyTapPage.doubleWindows(CorporateFlyTapPage.FlyTapLogo, "FlyTAP");
    });
 
    it('should navigate to the Institutional Page when clicked on INSTITUTIONAL link', ()=>{
        CorporateFlyTapPage.TrioHeaderLinks.get(1).click();
        CorporateFlyTapPage.doubleWindows(CorporateFlyTapPage.InstitutionalHistory, AppData.titles.institutional);
    });

    it('should navigate to the Home Corporate Page when clicked on CORPORATE link', ()=>{
        CorporateFlyTapPage.TrioHeaderLinks.get(2).click();
        expect(CorporateFlyTapPage.Title()).toEqual(AppData.titles.corporateHome);
    });

    it('should navigate to the Contacts page when clicked on the CONTACTS link', ()=>{
        CorporateFlyTapPage.checkHeaderTitles(CorporateFlyTapPage.Contacts, CorporateFlyTapPage.elementOnContacts, AppData.titles.contacts);
      
    });

    it('should display a quick Login Form when clicked on "MY CORPORATE" button', () => {
       CorporateFlyTapPage.MyCorporateAndEn.get(0).click();
        expect($("#js-login-quick").isDisplayed()).toBe(true);
        CorporateFlyTapPage.TapCorporateLogo.click();
    });

    it('should display a window with a list of different languages when clicked on "EN" button', () => {
        CorporateFlyTapPage.MyCorporateAndEn.get(1).click();
        expect(CorporateFlyTapPage.SelectCountryLanguage.getText()).toContain("Select your country and ");
        CorporateFlyTapPage.CloseSelectCountryLanguage.click();
    });

    it('should display the list of items when mouse hovered over the link "How it Works"', ()=>{

    var mouseOverScript = "var evObj = document.createEvent('MouseEvents');evObj.initEvent('mouseover', true, false); arguments[0].dispatchEvent(evObj);";
    browser.executeScript(mouseOverScript, CorporateFlyTapPage.HowItWorksLink);
             CorporateFlyTapPage.HowItWorksList.count().then(count=>{
            for(let i = 0; i < count; i++){
                expect(CorporateFlyTapPage.HowItWorksList.get(i).isDisplayed()).toBe(true);
                expect(CorporateFlyTapPage.HowItWorksList.get(i).getText()).toEqual(AppData.howItWorksList[i].list);
            }
       })
    });

    it('should navigate to the How It Works page when clicked on "How It Works"', ()=>{
        CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.HowItWorksLink, CorporateFlyTapPage.elementOnHIW, AppData.titles.howItWorks);
      
    });

 it('should navigate to the Business Travels link', ()=>{
    CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.BusinessTravelsLink, CorporateFlyTapPage.elementOnBusTravel, AppData.titles.businessTravels);
 
 });
   
 it('should display all the Text Contents belonging to headings (<h>) of the page', () => {
    CorporateFlyTapPage.HeadingTexts.count().then(countHeading=>{
        for(let i = 0; i < countHeading; i++){
            expect(CorporateFlyTapPage.HeadingTexts.get(i).getText()).toEqual(AppData.headingText[i].head);
        }
   });
 });


  it('should display all the images and text contents below them on the Corporate page ', ()=>{
      CorporateFlyTapPage.EightImagesWithTexts.count().then(count=>{
        for(let i = 0; i < count; i++){
            expect(CorporateFlyTapPage.EightImagesWithTexts.get(i).isDisplayed()).toBe(true);
           expect(CorporateFlyTapPage.EightImagesTitles.get(i).getText()).toEqual(AppData.titleAndText[i].imagesTitle); 
          CorporateFlyTapPage.FiveImagesTexts.count().then(countFiveImages=>{
            if(i>=0 && i < countFiveImages){
                expect(CorporateFlyTapPage.FiveImagesTexts.get(i).getText()).toContain(AppData.titleAndText[i].imagesText);
                }
          })
           CorporateFlyTapPage.TrioImagesText.count().then(countTrio=>{
            if(i >=0 && i < countTrio){
                expect(CorporateFlyTapPage.TrioImagesWithText.get(i).isDisplayed()).toBe(true);
                expect(CorporateFlyTapPage.TrioImagesText.get(i).getText()).toEqual(AppData.headerPicText[i].picText);
            }
       }); 
       CorporateFlyTapPage.LastDivTexts.count().then(countDiv=>{
       if(i >=0 && i < 2){
           expect(CorporateFlyTapPage.LastDivTexts.get(i).getText()).toContain(AppData.randomTexts[i+1].div);
       }
    });   
        }
      });
      expect(CorporateFlyTapPage.FirstDivText.getText()).toContain(AppData.randomTexts[0].div);
  });

   it('should display JOIN NOW and LOGIN links', ()=>{
       CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.SignLogin, AppData.signUpLogin);
   });

   it('should navigate to the Sign-Up page after clicking on JOIN NOW link', ()=>{
     CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.SignLogin.get(0), CorporateFlyTapPage.elementOnJoinNow, AppData.titles.signUp);
    })

    it('should navigate to the Login page after clicking on Login link', ()=>{
        CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.SignLogin.get(1), CorporateFlyTapPage.elementOnLogin, AppData.titles.login);
    });

    it('should display the list of the links on the middle section of the page', () => {
        CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.FlightLinks, AppData.flightLinks);
    });

   it('should display a "Login" window pop-up after clicking on Book Flight link', ()=>{
       browser.executeScript("arguments[0].scrollIntoView();", CorporateFlyTapPage.SignLogin.get(0)).then(()=>{
       CorporateFlyTapPage.FlightLinks.get(0).click();
       //.then(()=>{
                browser.wait(EC.visibilityOf(CorporateFlyTapPage.LoginLabel), 12000).then(()=>{
                    expect(CorporateFlyTapPage.LoginPopUp.isDisplayed()).toBe(true);
                });
              //  });
      }) 
    });

    it('should display all the Contents on the Login window pop-up', ()=>{
        expect(CorporateFlyTapPage.LoginLabel.isDisplayed()).toBe(true);
        expect(CorporateFlyTapPage.LoginLabel.getText()).toEqual(AppData.bookFlightLink.loginLabel);
     CorporateFlyTapPage.bookFlightLinkContents(CorporateFlyTapPage.UserAndPassLabel);
    expect(CorporateFlyTapPage.UserAndPassLabel.get(0).getText()).toEqual(AppData.bookFlightLink.usernameLabel);
    expect(CorporateFlyTapPage.UserAndPassLabel.get(1).getText()).toEqual(AppData.bookFlightLink.password);
     CorporateFlyTapPage.bookFlightLinkContents(CorporateFlyTapPage.RecUserAndPass);
     expect(CorporateFlyTapPage.RecUserAndPass.get(0).getText()).toEqual(AppData.bookFlightLink.recUsername);
     expect(CorporateFlyTapPage.UserInput.isDisplayed()).toBe(true);
     expect(CorporateFlyTapPage.PassInput.isDisplayed()).toBe(true);
     expect(CorporateFlyTapPage.RecUserAndPass.get(1).getText()).toEqual(AppData.bookFlightLink.recPassword);
     expect(CorporateFlyTapPage.showPass.isDisplayed()).toBe(true);
     expect(CorporateFlyTapPage.showPass.getText()).toEqual(AppData.bookFlightLink.passwordLabel);
     expect(CorporateFlyTapPage.LoginButton.isDisplayed()).toBe(true);
     expect(CorporateFlyTapPage.LoginButton.getText()).toEqual(AppData.bookFlightLink.loginButton);
     expect(CorporateFlyTapPage.LastPar.isDisplayed()).toBe(true);
     expect(CorporateFlyTapPage.LastPar.getText()).toEqual(AppData.bookFlightLink.corpProgram); 
       
    });

it('should display an error message when Username and Password fields left blank', ()=>{
CorporateFlyTapPage.LoginButton.click();
CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.UserError, AppData.bookFlightLink.emptyErrorMessage);
CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.PassError, AppData.bookFlightLink.emptyErrorMessage)

});

it('should display an error message when less than 6 characters entered in Password field', ()=>{
    CorporateFlyTapPage.PassInput.sendKeys(AppData.bookFlightLink.failExamplePass);
   CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.PassError, AppData.bookFlightLink.passErrorMessage);
});

it('should display no error message when more than 6 characters entered in Password field', ()=>{
    CorporateFlyTapPage.PassInput.clear().sendKeys(AppData.bookFlightLink.passExamplePass);
    expect(CorporateFlyTapPage.PassError.getText()).toEqual("");
});

it('should display an error message on the Login window pop-up when invalid credentials entered', ()=>{
   CorporateFlyTapPage.UserInput.sendKeys("abc@gmail.com");
   CorporateFlyTapPage.LoginButton.click();
   browser.wait(EC.visibilityOf(CorporateFlyTapPage.ErrorTitle), 12000).then(()=>{
   CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.ErrorTitle, AppData.bookFlightLink.errorTitle);
   CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.CorrectInputsText, AppData.bookFlightLink.correctInputs);
   CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.ForgotPassText, AppData.bookFlightLink.forgotPass);
  CorporateFlyTapPage.UserInput.sendKeys(protractor.Key.ESCAPE);
})
});

it('should display the form to check in when clicked on Check-In link', ()=>{
    browser.executeScript("arguments[0].scrollIntoView();", CorporateFlyTapPage.FlightLinks.get(1)).then(()=>{
       browser.executeScript("arguments[0].click();", CorporateFlyTapPage.FlightLinks.get(1)).then(()=>{
   expect(CorporateFlyTapPage.CheckInForm.isDisplayed()).toBe(true);
    })
    })
});

it('should display all the Contents under the Check-In link', ()=>{
    Base.navigateTo(Base.CorporatePage);
    browser.executeScript("arguments[0].scrollIntoView();", CorporateFlyTapPage.FlightLinks.get(1)).then(()=>{
        browser.executeScript("arguments[0].click();", CorporateFlyTapPage.FlightLinks.get(1)).then(()=>{
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.CheckInMessage, AppData.checkInFlight.messageToCheckIn);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.CheckInLabels, AppData.checkInFlight.checkInLabels);
    CorporateFlyTapPage.bookFlightLinkContents(CorporateFlyTapPage.CheckInInputs);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ContinueButton, AppData.checkInFlight.continueButton);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.checkInFlight.belowLinks); 
        })
        })
});

it('Should display an error message when "Flight Form" and "Reservation Code" fields left blank', ()=>{
    CorporateFlyTapPage.ContinueButton.click();
    CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.FromErrorOnCheckIn, AppData.checkInFlight.emptyErrorMessage);
    CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.ReserveError, AppData.checkInFlight.emptyErrorMessage);
});

it('should display an error message when airport is not found in the list of "Flight from"', ()=>{
    CorporateFlyTapPage.CheckInInputs.get(0).sendKeys(AppData.bookFlightLink.passExamplePass);
    expect(CorporateFlyTapPage.FromErrorOnCheckIn.getText()).toEqual(AppData.checkInFlight.airportNotFound);
});

it('should display the flight search options when clicked on Flight INFO', ()=>{
    CorporateFlyTapPage.TapCorporateLogo.click();
        CorporateFlyTapPage.FlightLinks.get(2).click();
        expect(CorporateFlyTapPage.FlightInfoForm.isDisplayed()).toBe(true);
    
});
it('should display All the Contents under the Flight Info link and when "By Airport" dropdown checked', ()=>{
    browser.executeScript("arguments[0].scrollIntoView();", CorporateFlyTapPage.FlightLinks.get(2)).then(()=>{
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FlightSearch, AppData.flightInfo.flightSearch);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.RadioButtons, AppData.flightInfo.radioButtonLabels);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FromLabel, AppData.flightInfo.fromLabel);
   expect(CorporateFlyTapPage.FromInput.isDisplayed()).toBe(true);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DepartLabel, AppData.flightInfo.departLabel);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DayLabel, AppData.flightInfo.dayLabel);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ContinueButtonOnFlightInfo, AppData.flightInfo.continueButton);
   CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.flightInfo.belowLinks);
});
})

it('should display an error message when From field left blank', ()=>{
    CorporateFlyTapPage.ContinueButtonOnFlightInfo.click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FromErrorOnFlightInfo, AppData.flightInfo.emptyErrorMessage);

});

it('should display an error message when entered Airport not found in the From list', ()=>{
    CorporateFlyTapPage.FromInput.sendKeys(AppData.flightInfo.fromExampleInput);
    CorporateFlyTapPage.FromInput.sendKeys(protractor.Key.ENTER);
    CorporateFlyTapPage.verifyingError(CorporateFlyTapPage.FromErrorOnFlightInfo, AppData.flightInfo.airportNotFound);
})
 it('should display options under the "With Departure/Arrival dropdown"', ()=>{
     CorporateFlyTapPage.DepartDropdown.sendKeys(protractor.Key.ENTER);
     CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.DepartDropdownOptions, AppData.flightInfo.departDropdown);
 })

it('should display all the Contents when "By origin and Destination" option clicked', ()=>{
    CorporateFlyTapPage.TapCorporateLogo.click();
    browser.executeScript("arguments[0].scrollIntoView();", CorporateFlyTapPage.SignLogin.get(0)).then(()=>{
        browser.wait(EC.visibilityOf(CorporateFlyTapPage.FlightLinks.get(2)), 12000).then(()=>{
        CorporateFlyTapPage.FlightLinks.get(2).click(); 
    CorporateFlyTapPage.RadioButtons.get(1).click();
    expect(CorporateFlyTapPage.FlightInfoForm.isDisplayed()).toBe(true);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.RadioButtons, AppData.flightInfo.radioButtonLabels);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FromLabel, AppData.flightInfo.fromLabel);
    expect(CorporateFlyTapPage.FromInput.isDisplayed()).toBe(true);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ToLabel, AppData.flightInfo.toLabel);
   expect(CorporateFlyTapPage.ToInput.isDisplayed()).toBe(true);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DepartLabel, AppData.flightInfo.departLabel);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DayLabel, AppData.flightInfo.dayLabel);
   CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ContinueButtonOnFlightInfo, AppData.flightInfo.continueButton);
   CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.flightInfo.belowLinks);
        });
});
});

it('should display an error message when "From" and "TO" input fields left blank', ()=>{
    CorporateFlyTapPage.ContinueButtonOnFlightInfo.click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FromErrorOnFlightInfo, AppData.flightInfo.emptyErrorMessage);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ToErrorOnFlightInfo, AppData.flightInfo.emptyErrorMessage);
});

it('should display an error message when entered Airport is not found in the "From" and "TO" lists', ()=>{
    CorporateFlyTapPage.FromInput.sendKeys(AppData.flightInfo.fromExampleInput);
    CorporateFlyTapPage.ToInput.sendKeys(AppData.flightInfo.toExampleInput);
    CorporateFlyTapPage.ContinueButtonOnFlightInfo.click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.FromErrorOnFlightInfo, AppData.flightInfo.airportNotFound);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ToErrorOnFlightInfo, AppData.flightInfo.airportNotFound);
});

it('should display an error message when the same Airport is entered in "From" and "To" inputs', ()=>{
    CorporateFlyTapPage.ToInput.clear().sendKeys(AppData.flightInfo.fromExampleInput);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ToErrorOnFlightInfo, AppData.flightInfo.sameInputErrorMessage);
});

it('should display All the Contents when By Flight option clicked under the Flight Info link', ()=>{
    CorporateFlyTapPage.RadioButtons.get(2).click();
    expect(CorporateFlyTapPage.FlightInfoForm.isDisplayed()).toBe(true);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.RadioButtons, AppData.flightInfo.radioButtonLabels);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.TPLabel, AppData.flightInfo.tp);
    expect(CorporateFlyTapPage.TPInput.isDisplayed()).toBe(true);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DepartLabel, AppData.flightInfo.departLabel);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.DayLabel, AppData.flightInfo.dayLabel);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ContinueButtonOnFlightInfo, AppData.flightInfo.continueButton);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.flightInfo.belowLinks);
});

it('should display an error message when "TP" input field left blank', ()=>{
    CorporateFlyTapPage.ContinueButtonOnFlightInfo.click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.TPErrorMessage, AppData.flightInfo.emptyErrorMessage);
});

it('should display an error message when letters entered in "TP" input', ()=>{
    CorporateFlyTapPage.TPInput.sendKeys(AppData.flightInfo.toExampleInput);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.TPErrorMessage, AppData.flightInfo.tpErrorMessage);
});

it('should display a form to manage the booked flight', ()=>{
    CorporateFlyTapPage.FlightLinks.get(3).click();
    expect(CorporateFlyTapPage.ManageForm.isDisplayed()).toBe(true);
});

it('should display all the Contents under the Manage Booking link', ()=>{
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageOptions, AppData.manageBooking.chooseOptionLabel);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.ManageRadioButtons, AppData.manageBooking.radioButtons);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.ManageLabels, AppData.manageBooking.labelTexts);
    CorporateFlyTapPage.bookFlightLinkContents(CorporateFlyTapPage.ManageInputs);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageContinueButton, AppData.manageBooking.continueButton);
});

it('should display an error messages when fields left blank', ()=>{
CorporateFlyTapPage.ManageContinueButton.click();
CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageErrorMessages.get(0), AppData.manageBooking.emptyErrorMessage);
CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageErrorMessages.get(1), AppData.manageBooking.emptyErrorMessage);
});

it('should navigate to the Search Reservation page when Continue button on "See Reservation" dropdown clicked', ()=>{
   CorporateFlyTapPage.ManageInputs.count().then(count=>{
       for(let i = 0; i < count; i++){
       CorporateFlyTapPage.ManageInputs.get(i).sendKeys(AppData.manageBooking.manageInput);
       }
   })
   CorporateFlyTapPage.ManageContinueButton.click();
   CorporateFlyTapPage.doubleWindows(CorporateFlyTapPage.SearchReservePage, AppData.titles.searchReservation);
});

it('should display all the Contents when "Print Receipt" radiobutton clicked under the Manage Booking link', ()=>{
    CorporateFlyTapPage.ManageRadioButtons.get(1).click();
    expect(CorporateFlyTapPage.ManageForm.isDisplayed()).toBe(true);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageOptions, AppData.manageBooking.chooseOptionLabel);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.ManageRadioButtons, AppData.manageBooking.radioButtons);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.ManageReceiptLabels, AppData.manageBooking.receiptLabel);
   CorporateFlyTapPage.bookFlightLinkContents(CorporateFlyTapPage.ManageReciptInputs);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageContinueButton, AppData.manageBooking.continueButton);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.manageBooking.belowLinks)
})

it('should display an error message when "Last name" and "Ticket number" fields left blank', ()=>{
    CorporateFlyTapPage.ManageContinueButton.click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageReceiptErrorMessage.get(0), AppData.manageBooking.emptyErrorMessage);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageReceiptErrorMessage.get(1), AppData.manageBooking.emptyErrorMessage);
});

it('should display an error message when numbers entered in the "Last Name" field', ()=>{
    CorporateFlyTapPage.ManageReciptInputs.get(0).sendKeys(AppData.manageBooking.manageInput+123);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageReceiptErrorMessage.get(0), AppData.manageBooking.letterError);
})

it('should display an error message when letters entered in the Ticket Number field', ()=>{
    CorporateFlyTapPage.ManageReciptInputs.get(1).sendKeys(AppData.manageBooking.manageInput);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageReceiptErrorMessage.get(1), AppData.manageBooking.numberError);
});

it("should display an error message when less than 10 charachters entered in the Ticket Number field", ()=>{
    CorporateFlyTapPage.ManageReciptInputs.get(1).clear().sendKeys(123);
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageReceiptErrorMessage.get(1), AppData.manageBooking.lessThan10);
});

it('should display contents under the "Ask for / check refund" radio button', ()=>{
    CorporateFlyTapPage.ManageRadioButtons.get(2).click();
    CorporateFlyTapPage.DisplaySingleLink(CorporateFlyTapPage.ManageContinueButton, AppData.manageBooking.continueButton);
    CorporateFlyTapPage.DisplayMultipleLinks(CorporateFlyTapPage.linksBelow, AppData.manageBooking.belowLinks);
});

it('should navigate to the Refunds page when clicked on Continue under Ask for / check refund', ()=>{
    CorporateFlyTapPage.ManageContinueButton.click();
    CorporateFlyTapPage.doubleWindows(CorporateFlyTapPage.RefundPage, AppData.titles.refund);
});

it('should display the "Find out More" link on the page', ()=>{
  //  CorporateFlyTapPage.TapCorporateLogo.click();
  expect(CorporateFlyTapPage.FindOutMore.isDisplayed()).toBe(true);

});

it('should navigate to the Program Advantages page after clicking on "Find out more" link on the current window', ()=>{
    CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.FindOutMore, CorporateFlyTapPage.elementOnFindOutMore, AppData.titles.findOutMore);
});

it('should display the "See all" link on the page', ()=>{
    expect(CorporateFlyTapPage.SeeAll.isDisplayed()).toBe(true);
});
it('should navigate to the Business Travels page on the current window when clicked on See All link', ()=>{
    CorporateFlyTapPage.checkTitlesOfTheLInks(CorporateFlyTapPage.SeeAll, CorporateFlyTapPage.elementOnSeeAll, AppData.titles.businessTravels);
})
});