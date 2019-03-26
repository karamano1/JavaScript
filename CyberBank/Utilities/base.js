var Base = function(){
    this.homeUrl = "http://www.way2automation.com/angularjs-protractor/banking/#/login";
this.navigateToHome = function(Url){
    browser.get(Url);
};
this.ManagerUrl = "http://www.way2automation.com/angularjs-protractor/banking/#/manager"

}
module.exports = new Base();