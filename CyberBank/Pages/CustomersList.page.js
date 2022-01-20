require('../Utilities/customLocators.js');

var CustomersListPage = function(){
    this.Customers = element(by.ngClick("showCust()"));
    this.table = element(by.xpath("//table[contains(@class, 'table-bordered')]"));
    this.deleteCustomerButton = element(by.xpath("//tbody/tr[last()]/td[5]/button"));
    this.firstNameTable = element.all(by.xpath("//td[1]"));

    this.getLastRowValue = function(colNumber){
   return this.table.element(by.xpath("//tbody/tr[last()]/td["+colNumber+"]"));
}
}
module.exports= new CustomersListPage();