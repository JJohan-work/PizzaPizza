function Cart() {
  this.items = [];
  this.currentindex = 0;
  this.total = {};
  this.active = {};
}

Cart.prototype.getTotal = function() {
  let total = 0;
  this.items.forEach(item => {
    total += parseFloat(item.cost);
  });
  this.total = total.toFixed(2);
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
  this.specials = "none";
  this.cost = 0;
}

Pizza.prototype.calcprice = function(priceBook) {
  price = 0;
  price += parseFloat(priceBook.sizes[this.size]);
  price += parseFloat(priceBook.crusts[this.crusts]);
  price += parseFloat(priceBook.cFlavor[this.cFlavor]);
  price += parseFloat(priceBook.sauce[this.sauce]);
  price += parseFloat(priceBook.cheese[this.cheese]);
  price += parseFloat(priceBook.specials[this.specials]);
  this.toppings.forEach(top => {
    price += parseFloat(priceBook.toppings[top])
  })
  this.cost = price.toFixed(2);
}

Pizza.prototype.add = function(type,stuff) {
  if (type === "toppings" && this.toppings.includes(stuff) !== true) this.toppings.push(stuff);
  else if (type !== "toppings") this[type] = stuff;
};

const PriceBook = {
  sizes : {party:"50.0",large:"30.0",medium:"20.0",personal:"10.0",single:"4.0"},
  crusts: {handtoss:"2.5",thin:"1.5",stuffed:"3.5",orig:"1.5"},
  cFlavor: {garlicButtery:"0.3",toast:"0.8",cheese:"0.45"},
  sauce : {mar:"0.1",garlicParmesan:"1",barbaque:"0.35",buffalo:"0.5"},
  cheese: {light:"0.1",regular:"2",extra:"5.25"},
  toppings: {pepperoni:"2.5",italian:"1.5",meatball:"0.75",ham:"3.2",bacon:"4.50",chicken:"0.2",beef:"0.35",pork:"0.2",mushrooms:"0.2",onions:"0.4",olives:"0.7",bellPeppers:"0.2",bananaPeppers:"0.45",pineapple:"0.44",jalapeno:"0.55",tomato:"0.5",spinach:"0.2"},
  specials: {anchovies:"4.5",will:"-20",none:"0.0"}
}

function Dis() {
  this.converter = {party:"Party",large:"Large",medium:"Medium",personal:"Personal",slice:"Single Slice",handtoss:"Hand Tossed",thin:"Thin 'N Crispy" ,stuffed:"Stuffed Crust",orig:"Original Pan",garlicButtery:"Garlic Buttery",toast:"Toasted Parmesan",cheese:"Cheesy 'N Loaded",mar:"Classic Marinara",garlicParmesan:"Garlic Parmesan",barbaque:"Barbeque",buffalo:"Buffalo",light:"Light",regular:"Cheese",extra:"Extra",pepperoni:"Pepperoni",italian:"Italian Sausage",meatball:"Meatball",ham:"Ham",bacon:"Bacon",chicken:"Grilled Chicken",beef:"Beef",pork:"Pork",mushrooms:"Mushrooms",onions:"Red Onions",olives:"Mediterranean Black Olives",bellPeppers:"Green Bell Peppers",bananaPeppers:"Banana Peppers",pineapple:"Pineapple",jalapeno:"Jalapeno Peppers",tomato:"Roma Tomatoes",spinach:"Roasted Spinach",anchovies:"Anchovies",will:"Will to Live",none:"none"}
  this.controlCurrent = 0;
}

Dis.prototype.convert = function(item) {
  return this.converter[item]
}

Dis.prototype.resetmenu = function() {
  this.controlCurrent = 0;
}

$(document).ready(function(){

  $("#control>div").hide();
  $("#control>div.0").show();
  $("#cart").hide();
  $(".pizzamaker").hide();

  let cart = new Cart();
  let dis = new Dis;

  $(".control").on("click", function() {
    if (this.getAttribute("id") == "back" && dis.controlCurrent > 0) dis.controlCurrent -= 1;
    else if (this.getAttribute("id") == "next" && dis.controlCurrent < 6) dis.controlCurrent += 1;

    $("#control>div").hide();
    $(`#control>div.${dis.controlCurrent}`).show()

  });

  $(".opencart").on("click", function() {
    //fill cart with current pizzas in order
    $("#cart>ul").html("");
    for (i=0;i<cart.items.length;i++) {
      console.log(cart.items[i]);
      topping = ""
      cart.items[i].toppings.forEach(top => {
        topping += `<li>${dis.convert(top)}<span class="topcost">$${PriceBook.toppings[top]}</span></li>`
      })
      const special = cart.items[i].specials;
      $("#cart>ul").append(`<li class="${i}"><h3>${dis.convert(cart.items[i].cFlavor)} ${dis.convert(cart.items[i].crusts)} ${dis.convert(cart.items[i].size)} pizza </h3><ul><h4>Toppings</h4>${topping}<li>Specials: ${dis.convert(cart.items[i].specials)}<span class="topcost">$${PriceBook.specials[special]}</span></li></ul><div class="itemAmount">Cost:$<span>${cart.items[i].cost}</span></li>`)
    }
    cart.getTotal();
    $("#carttotal").html(`$${cart.total}`);
    $("#cart").show();
  });

  $("#closeCart").on("click", function() {
    $("#cart").hide();
  });
  
  $("#makepizza").on("click", function() {
    dis.resetmenu();
    $("#control>div").hide();
    $(`#control>div.${dis.controlCurrent}`).show()
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