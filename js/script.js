function Cart() {
  this.items = [];
  this.currentindex = 0;
  this.total = {};
  this.active = {};
}

Cart.prototype.getTotal = function() {
  let total = 0;
  this.items.forEach(item => {
    total += item.cost;
  });
  this.total = total;
}

Cart.prototype.setActive = function(pizza) {
  this.active = pizza;
}

Cart.prototype.addToOrder = function(pizza) {
  this.items[this.currentindex] = pizza;
  this.currentindex += 1;
}

function Pizza() {
  this.size = "";
  this.crusts = "";
  this.cFlavor = "";
  this.sauce = "";
  this.cheese = "";
  this.toppings = [];
  this.specials = "";
  this.cost = 0;
}

Pizza.prototype.calcprice = function(priceBook) {
  price = 0;
  price += parseInt(priceBook.sizes[this.size]);
  price += parseInt(priceBook.crusts[this.crusts]);
  price += parseInt(priceBook.cFlavor[this.cFlavor]);
  price += parseInt(priceBook.sauce[this.sauce]);
  price += parseInt(priceBook.cheese[this.cheese]);
  price += parseInt(priceBook.specials[this.specials]);
  this.toppings.forEach(top => {
    price += parseInt(priceBook.toppings[top])
  })
  this.cost = price;
}

Pizza.prototype.add = function(type,stuff) {
  if (type === "toppings" && this.toppings.includes(stuff) !== true) this.toppings.push(stuff);
  else if (type !== "toppings") this[type] = stuff;
};

const PriceBook = {
  sizes : {party:"50",large:"30",medium:"20",personal:"10",single:"4"},
  crusts: {handtoss:"3",thin:"2",stuffed:"4",orig:"2"},
  cFlavor: {garlicButtery:"3",toast:"3",cheese:"5"},
  sauce : {mar:"2",garlicParmesan:"1",barbaque:"3",buffalo:"1"},
  cheese: {light:"0",regular:"2",extra:"5"},
  toppings: {pepperoni:"4",italian:"5",meatball:"4",ham:"6",bacon:"6",chicken:"3",beef:"4",pork:"4",mushrooms:"2",onions:"1",olives:"2",bellPeppers:"2",bananaPeppers:"3",pineapple:"4",jalapeno:"3",tomato:"2",spinach:"1"},
  specials: {anchovies:"8",will:"4"}
}





$(document).ready(function(){

  $("#control>div").hide();
  $("#control>div.0").show();
  $("#cart").hide();
  $(".pizzamaker").hide();

  let controlCurrent = 0;

  let cart = new Cart();

  $(".control").on("click", function() {
    if (this.getAttribute("id") == "back" && controlCurrent > 0) controlCurrent -= 1;
    else if (this.getAttribute("id") == "next" && controlCurrent < 6) controlCurrent += 1;

    $("#control>div").hide();
    $(`#control>div.${controlCurrent}`).show()

  });

  $(".opencart").on("click", function() {
    //fill cart with current pizzas in order
    $("#cart>ul").html("");
    for (i=0;i<cart.items.length;i++) {
      console.log(cart.items[i]);
      $("#cart>ul").append(`<li class="${i}"><h3>${cart.items[i].crusts} ${cart.items[i].size} Pizza  Cost:${cart.items[i].cost}</h3></li>`)
    }
    cart.getTotal();
    $("#carttotal").text(cart.total)
    $("#cart").show();
  });

  $("#closeCart").on("click", function() {
    $("#cart").hide();
  });
  
  $("#makepizza").on("click", function() {
    controlCurrent = 0;
    $(".pizzamaker").show();
    cart.setActive(new Pizza())
    //set that pizza as active object to modify
  });

  $("#addpizza").on("click", function() {
    if (cart.active.size == "" || cart.active.crusts == "" || cart.active.cFlavor == "" || cart.active.sauce == "" || cart.active.cheese == "" || cart.active.toppings.length == 0) alert("Completely fill out pizza before submitting")
    else {
      $(".pizzamaker").hide();
      cart.active.calcprice(PriceBook);
      cart.addToOrder(cart.active);
      cart.setActive({});
    }
  });

  $("#control>div>ul>li").on("click", function() {
    const itemToAdd = this.getAttribute("id");
    const parent2 = $(`#${itemToAdd}`).parent().parent();
    const type = parent2[0].getAttribute("id");
    cart.active.add(type, itemToAdd);
    console.log(cart);
    // console.log(`type:${type} item:${itemToAdd}`);
  })

  $("#cancelpizza").on("click", function() {
    $(".pizzamaker").hide();
    //delete current pizza object
    //set active object to none
  });

});