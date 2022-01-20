var Base = function(){
    this.homeCorporateUrl = "https://www.flytap.com/en-us/";
this.CorporatePage = "https://www.tapcorporate.com/en-us/";
    this.navigateTo = function(url){
        browser.get(url);
    }
}

module.exports = new Base();