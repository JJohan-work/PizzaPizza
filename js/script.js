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

function Dis() {
  this.converter = {party:"Party",large:"Large",medium:"Medium",personal:"Personal",slice:"Single Slice",handtoss:"Hand Tossed",thin:"Thin 'N Crispy" ,stuffed:"Stuffed Crust",orig:"Original Pan",garlicButtery:"Garlic Buttery",toast:"Toasted Parmesan",cheese:"Cheesy 'N Loaded",mar:"Classic Marinara",garlicParmesan:"Garlic Parmesan",barbaque:"Barbeque",buffalo:"Buffalo",light:"Light",regular:"Cheese",extra:"Extra",pepperoni:"Pepperoni",italian:"Italian Sausage",meatball:"Meatball",ham:"Ham",bacon:"Bacon",chicken:"Grilled Chicken",beef:"Beef",pork:"Pork",mushrooms:"Mushrooms",onions:"Red Onions",olives:"Mediterranean Black Olives",bellPeppers:"Green Bell Peppers",bananaPeppers:"Banana Peppers",pineapple:"Pineapple",jalapeno:"Jalapeno Peppers",tomato:"Roma Tomatoes",spinach:"Roasted Spinach",anchovies:"Anchovies",will:"Will to Live"}
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
        topping += `<li>${dis.convert(top)}</li>`
      })
      $("#cart>ul").append(`<li class="${i}"><h3>${dis.convert(cart.items[i].cFlavor)} ${dis.convert(cart.items[i].crusts)} ${dis.convert(cart.items[i].size)} pizza  Cost:${cart.items[i].cost}</h3><ul><h4>Toppings</h4>${topping}<li>Specials: ${dis.convert(cart.items[i].specials)}</li></ul></li>`)
    }
    cart.getTotal();
    $("#carttotal").text(cart.total)
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