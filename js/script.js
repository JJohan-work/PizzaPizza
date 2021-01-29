function Cart() {
  this.items = [];
  this.total = {};
}

Cart.prototype.getTotal = function() {
  let total = 0;
  this.items.forEach(item => {
    total += item.cost
  });
  this.total = total;
}

function Pizza() {
  this.size = "";
  this.crust = "";
  this.cFlavor = "";
  this.sauce = "";
  this.cheese = "";
  this.toppings = {meat:[],vegg:[]};
  this.specials = "";
  this.cost = 0;
}

Pizza.calcprice = function() {

}





























$(document).ready(function(){
  
});