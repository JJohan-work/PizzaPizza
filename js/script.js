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

Pizza.prototype.add = function(type,stuff) {
  if (type == "meat" || type == "vegg") this.toppings.type.push(stuff);

  this.type = stuff;
};

const PriceBook = {
  sizes : {party:"50",large:"30",medium:"20",personal:"10",single:"4"},
  crusts: {handtoss:"3",thin:"2",stuff:"4",orig:"2"},
  flavor: {garlic:"3",toast:"3",cheese:"5"},
  sauce : {mar:"2",garlic:"1",barbaque:"3",buffalo:"1"},
  cheese: {light:"0",regular:"2",extra:"5"},
  topping:
  {
    meats: {pepperoni:"4",italian:"5",meatball:"4",ham:"6",bacon:"6",chicken:"3",beef:"4",pork:"4"},
    veg: {mushrooms:"2",onions:"1",olives:"2",bellPeppers:"2",bananaPeppers:"3",pineapple:"4",jalapeno:"3",tomato:"2",spinach:"1"}
  },
  specials: {anchovies:"8",will:"4"}
}










$(document).ready(function(){

  $("#control>div").hide();
  $("#control>div.0").show();
  $("#cart").hide();

  let controlCurrent = 0;

  $(".control").on("click", function() {
    if (this.getAttribute("id") == "back" && controlCurrent > 0) controlCurrent -= 1;
    else if (this.getAttribute("id") == "next" && controlCurrent < 5) controlCurrent += 1;

    $("#control>div").hide();
    $(`#control>div.${controlCurrent}`).show()

  });

  $(".opencart").on("click", function() {
    $("#cart").show();
  });

  $("#closeCart").on("click", function() {
    $("#cart").hide();
  });
});