//this is a replacement cypher that I use for price calculation this should later be replaced with a server call to get the prices
const PriceBook = {
  sizes : {party:"25.0",large:"20.0",medium:"13.0",personal:"8.0",slice:"2.5"},
  crusts: {handtoss:"2.5",thin:"1.5",stuffed:"3.5",orig:"1.5"},
  cFlavor: {garlicButtery:"0.3",toast:"0.8",cheese:"0.45"},
  sauce : {mar:"0.1",garlicParmesan:"1",barbaque:"0.35",buffalo:"0.5"},
  cheese: {light:"0.1",regular:"2",extra:"2.25"},
  toppings: {pepperoni:"2.5",italian:"1.5",meatball:"0.75",ham:"3.2",bacon:"4.50",chicken:"0.2",beef:"0.35",pork:"0.2",mushrooms:"0.2",onions:"0.4",olives:"0.7",bellPeppers:"0.2",bananaPeppers:"0.45",pineapple:"0.44",jalapeno:"0.55",tomato:"0.5",spinach:"0.2"},
  specials: {anchovies:"4.5",will:"-20",none:"0.0"}
}

/* Cart Objects contains all pizzas added to the cart, the active pizza being worked on, the total cost for all pizzas.
Functions:
  getTotal - adds all costs of pizzas in items and sets to this.total 
  setActive - sets a inputted pizzas as the active pizzas. this allows it to persist even when closing the pizza editor and allows the active pizzas to be targeted more easily across other functions
  addToOrder - gets a pizza object (right now just the active but later functionality could add the ability to edit the pizza after it is in reciept.)
*/
function Cart() {
  this.items = [];
  this.currentindex = 0;
  this.total = 0;
  this.active = {};
}

//gets total from each pizza.cost in items
Cart.prototype.getTotal = function() {
  let total = 0;
  this.items.forEach(item => {
    total += parseFloat(item.cost);
  });
  this.total = total.toFixed(2);
}

//sets input pizza object as active in cart
Cart.prototype.setActive = function(pizza) {
  this.active = pizza;
}

//current index increment is technically not needed but will be useful if ability to edit orders is later added
Cart.prototype.addToOrder = function(pizza) {
  this.items[this.currentindex] = pizza;
  this.currentindex += 1;
}

//This creates a new pizza object. The program creates the pizza and sets it to active
function Pizza() {
  this.size = "";
  this.crusts = "";
  this.cFlavor = "";
  this.sauce = "";
  this.cheese = "";
  this.toppings = [];
  this.specials = [];
  this.cost = 0;
  this.rotate = 0;
}

// calculates price of pizza by reading all of pizza objects attributes. needs priceBook which is a object that acts as a replacement cypher. Each attribute needs to be in the priceBook as a key which can then be converted into its equivelent price.
Pizza.prototype.calcprice = function(priceBook) {
  price = 0;
  price += parseFloat(priceBook.sizes[this.size]);
  price += parseFloat(priceBook.crusts[this.crusts]);
  price += parseFloat(priceBook.cFlavor[this.cFlavor]);
  price += parseFloat(priceBook.sauce[this.sauce]);
  price += parseFloat(priceBook.cheese[this.cheese]);

  this.specials.forEach(top => {
    price += parseFloat(priceBook.specials[top])
  })
  this.toppings.forEach(top => {
    price += parseFloat(priceBook.toppings[top])
  })

  this.cost = price.toFixed(2);
}
// This function is for every option for the pizza besides toppings and specials which are lists of the itemToAdd. These 
Pizza.prototype.add = function(typeofItem,itemToAdd) {
  this[typeofItem] = itemToAdd;
};

Pizza.prototype.toggleTop = function(itemToAdd) {
  if (this.toppings.includes(itemToAdd)) {
    this.toppings.splice(this.toppings.indexOf(itemToAdd),1)
  } else this.toppings.push(itemToAdd)
}

Pizza.prototype.toggleSpec = function(itemToAdd) {
  if (this.specials.includes(itemToAdd)) {
    this.specials.splice(this.toppings.indexOf(itemToAdd),1)
  } else this.specials.push(itemToAdd)
}

//Object for handling visual related variables and functions for the pizza graphic and the pizza builder
//convert is for converting the database names to the text as presented in the receipt.
//visualconverter is for converting the database names to the names of the svg toppings saved in img/
function Dis() {
  this.converter = {party:"Party Pizza",large:"Large Pizza",medium:"Medium Pizza",personal:"Personal Pizza",slice:"Single Slice",handtoss:"Hand Tossed",thin:"Thin 'N Crispy" ,stuffed:"Stuffed Crust",orig:"Original Pan",garlicButtery:"Garlic Buttery",toast:"Toasted Parmesan",cheese:"Cheesy 'N Loaded",mar:"Classic Marinara",garlicParmesan:"Garlic Parmesan",barbaque:"Barbeque",buffalo:"Buffalo",light:"Light",regular:"Cheese",extra:"Extra",pepperoni:"Pepperoni",italian:"Italian Sausages",meatball:"Meatballs",ham:"Ham",bacon:"Bacon",chicken:"Grilled Chicken",beef:"Beef",pork:"Pork",mushrooms:"Mushrooms",onions:"Red Onions",olives:"Mediterranean Black Olives",bellPeppers:"Green Bell Peppers",bananaPeppers:"Banana Peppers",pineapple:"Pineapple",jalapeno:"Jalapeno Peppers",tomato:"Roma Tomatoes",spinach:"Roasted Spinach",anchovies:"Anchovies",will:"Will to Live",none:"none"}
  this.visualconverter = {pepperoni:"pepperoni.svg",italian:"sausage.svg",meatball:"meatball.svg",ham:"meat2.svg",bacon:"bacon.svg",chicken:"chicken.svg",beef:"meat1.svg",pork:"meat1.svg",mushrooms:"mushroom.svg",onions:"onion.svg",olives:"olives.svg",bellPeppers:"bellpepper.svg",bananaPeppers:"banpepper.svg",pineapple:"pinapple.svg",jalapeno:"pepper.svg",tomato:"tomato.svg",spinach:"green.svg",anchovies:"anchovies.svg"}
  this.controlCurrent = 0;
  this.pizzaSize = 500;
  this.pizzaborder = 20;
  this.crustcolor = "#ffb428";
  this.covering = "burlywood";
  this.cheese = 'url("../img/lCheese.svg")';
  this.topping = [];
}

//resets the visual properties of the pizza graphic without needing to call a new Dis object
Dis.prototype.new = function() {
  change = document.documentElement
  this.pizzaSize = 500;
  this.pizzaborder = 20;
  this.crustcolor = "burlywood";
  this.covering = "burlywood";
  this.cheese = '';
  this.topping = [];
  change.style.setProperty('--pizza-size',`${this.pizzaSize+this.pizzaborder*2}px`);
  change.style.setProperty('--pizza-crust',`${this.pizzaborder}px`);
  change.style.setProperty('--pizza-size2',`${this.pizzaSize}px`);
  change.style.setProperty('--crust-type',this.crustcolor);
  change.style.setProperty('--cheese',this.cheese);
  change.style.setProperty('--covering',this.covering);
  change.style.setProperty('--topping',"url('')");
  $("#pizzaslice").hide();
  $(".selected").removeClass("selected");
}

//converts given string item to the string to be displayed on the receipt using the converter replacement cypher
Dis.prototype.convert = function(item) {
  return this.converter[item]
}

//resets the pizza toppings menu selector
Dis.prototype.resetmenu = function() {
  this.controlCurrent = 0;
}

//capable of adding multiple toppings to pizza graphic. If itemToAdd is in this.toppings it removes it from list and adds it if it isnt. Then using a for loop it builds a style made out of a string of url links to apply to the pizza topping div
Dis.prototype.addtopping = function(itemToAdd) {
  if (this.topping.includes(itemToAdd)) this.topping.splice(this.topping.indexOf(itemToAdd),1)
  else this.topping.unshift(itemToAdd)
  let addString = ""
  for(i = 0; i < this.topping.length; i ++) {
    addString += `url('../img/${this.visualconverter[this.topping[i]]}')`
    if (i+1 !== this.topping.length) {addString += ",";}
  }
  document.documentElement.style.setProperty('--topping',addString);
};

//this function is called everythime a object is clicked in the handler for adding options to the pizza in the pizza maker.
//The way I am handling making the pizza graphic is pretty sketchy and I am looking for a better way to do this.
//Currently it applies more background images to a positioned div that each topic is using.
Dis.prototype.AddtoPizza = function(typeToAdd,itemToAdd) {
  change = document.documentElement
  if (typeToAdd == "size") {
    $("#pizzaslice").hide();
    switch(itemToAdd) {
      case "party":
        this.pizzaSize = 600
        break;
      case "large":
        this.pizzaSize = 500;
        break;
      case "personal":
        this.pizzaSize = 200;
        break;
      case "slice":
        $("#pizzaslice").show();
      case "medium":
        this.pizzaSize = 400;
        break;
    }
    change.style.setProperty('--pizza-size',`${this.pizzaSize+this.pizzaborder*2}px`);
    change.style.setProperty('--pizza-size2',`${this.pizzaSize}px`);
  }
  else if (typeToAdd == "crusts") {
    switch(itemToAdd) {
      case "handtoss":
        this.pizzaborder = this.pizzaSize * 0.05;
        break;
      case "thin":
        this.pizzaborder = this.pizzaSize * 0.02;
        break;
      case "stuffed":
        this.pizzaborder = this.pizzaSize * 0.1;
        break;
      case "orig":
        this.pizzaborder = this.pizzaSize * 0.04;
        break;
    }
    change.style.setProperty('--pizza-crust',`${this.pizzaborder}px`);
    change.style.setProperty('--pizza-size',`${this.pizzaSize+this.pizzaborder*2}px`);
  }
  else if (typeToAdd == "cFlavor") {
    switch(itemToAdd) {
      case "garlicButtery":
        this.crustcolor = `#D8BC97`;
        break;
      case "toast":
        this.crustcolor = `#e4924f`;
        break;
      case "cheese":
        this.crustcolor = `#ffb428`;
        break;
    }
    change.style.setProperty('--crust-type',this.crustcolor);
  }
  else if (typeToAdd == "sauce") {
    switch(itemToAdd) {
      case "mar":
        this.covering = `#ad2907`;
        break;
      case "garlicParmesan":
        this.covering = `#dec670`;
        break;
      case "barbaque":
        this.covering = `#540001`;
        break;
      case "buffalo":
        this.covering = `#ee5b00`;
        break;
    }
    change.style.setProperty('--covering',this.covering);
  }
  else if (typeToAdd == "cheese") {
    switch(itemToAdd) {
      case "light":
        this.cheese = 'url("../img/lCheese.svg")';
        break;
      case "regular":
        this.cheese = 'url("../img/rCheese.svg")';
        break;
      case "extra":
        this.cheese = 'url("../img/eCheese.svg")';
        break;
    }
    document.documentElement.style.setProperty('--cheese',this.cheese);
  }
  else if (typeToAdd == "toppings") {
    this.addtopping(itemToAdd);
  }
  else if (typeToAdd == "specials" && itemToAdd == "anchovies") {
    this.addtopping(itemToAdd);
  }
  }




$(document).ready(function(){
  $("#control>div").hide();
  $("#control>div.0").show();
  $("#cart").hide();
  $(".pizzamaker").hide();

  //database objects
  let cart = new Cart();
  let dis = new Dis;

  //buttons inside make pizza control, handles moving back and forth between pizza option menus and 
  $(".control").on("click", function() {
    if (this.getAttribute("id") == "back" && dis.controlCurrent > 0) dis.controlCurrent -= 1;
    else if (this.getAttribute("id") == "next" && dis.controlCurrent < 6) dis.controlCurrent += 1;
    $("#control>div").hide();
    $(`#control>div.${dis.controlCurrent}`).show();
    if (dis.controlCurrent == 6) $(this).css('visibility', 'hidden');
    else if (dis.controlCurrent == 0) $(this).css('visibility', 'hidden');
    else $(".control").css('visibility', 'visible');
  });

  $(".opencart").on("click", function() {
    //fill cart with current pizzas in order
    if (cart.items.length !== 0) {
      $("#cart>ul").html("");
      for (i=0;i<cart.items.length;i++) {
        let topping = "";
        let reg = /.[0-9]$/;
        cart.items[i].toppings.forEach(top => {
          topping += `<li>${dis.convert(top)}<span class="topcost">$${PriceBook.toppings[top].length==3 ? PriceBook.toppings[top]+"0":PriceBook.toppings[top]}</span></li>`
        })
        let specials = "";
        cart.items[i].specials.forEach(top => {
          specials += `<li>${dis.convert(top)}<span class="topcost">$${PriceBook.specials[top].length==3 ? PriceBook.specials[top]+"0":PriceBook.specials[top]}</span></li>`
        })
        $("#cart>ul").append(`<li class="${i}"><h3>${dis.convert(cart.items[i].cFlavor)} ${dis.convert(cart.items[i].crusts)} ${dis.convert(cart.items[i].size)}</h3><ul><h4>Toppings</h4>${topping}<li>${specials}</li></ul><div class="itemAmount">Cost:$<span>${cart.items[i].cost.length==3 ? cart.items[i].cost+0:cart.items[i].cost}</span></li>`)
    }
    cart.getTotal();
    $("#carttotal").html(`$${cart.total}`);
    $("#cart").show();
  }});

  $("#closeCart").on("click", function() {
    $("#cart").hide();
  });
  
  $("#makepizza").on("click", function() {
    dis.resetmenu();
    $("#control>div").hide();
    $("#back").css('visibility','hidden');
    $("#next").css('visibility','visible');
    $(`#control>div.${dis.controlCurrent}`).show()
    $(".pizzamaker").show();
    cart.setActive(new Pizza())
    $("#completepizza").css("top","0px")
  });

  $("#addpizza").on("click", function() {
    if (cart.active.size == "" || cart.active.crusts == "" || cart.active.cFlavor == "" || cart.active.sauce == "" || cart.active.cheese == "" || cart.active.toppings.length == 0) alert("Completely fill out pizza before submitting")
    else {
      $("#completepizza").css("top","1000px")
      setTimeout(function(){
        $(".pizzamaker").hide();
        cart.active.calcprice(PriceBook);
        cart.addToOrder(cart.active);
        cart.setActive({});
        dis.new();
        $("#will").addClass("hidden")
    }, 1500);
    }
  });

  $("#control>div>ul>li").on("click", function() {
    const itemToAdd = this.getAttribute("id");
    const parent = $(`#${itemToAdd}`).parent().parent();
    const type = parent[0].getAttribute("id");
    if (type=="toppings") {
      $(this).toggleClass("selected");
      cart.active.toggleTop(itemToAdd);
    }
    else if (type=="specials") {
      $(this).toggleClass("selected");
      cart.active.toggleSpec(itemToAdd);
    }
    else {
      $(`#${itemToAdd}`).siblings().removeClass("selected");
      $(this).addClass("selected");
      cart.active.add(type, itemToAdd);
    }
    dis.AddtoPizza(type,itemToAdd);
    // console.log(`type:${type} item:${itemToAdd}`);
  })

  $("#cancelpizza").on("click", function() {
    $("#completepizza").css("top","1000px");
    setTimeout(function(){
      $(".pizzamaker").hide();
      $(".control").css('visibility', 'visible');
    }, 1500);
  });


  //this is a handler just for fun and can be cleanly removed without causing any issues(tip try clicking the pizza)
  $('#completepizza').on( "click",function(){
    $('#completepizza').toggleClass('rotate');
    cart.active.rotate += 1;
    $('#completepizza').css("pointer-events","none");
    if (cart.active.rotate > 8){
      $("#will").removeClass("hidden");}
    setTimeout(function() {$('#completepizza').css("pointer-events","auto")}, 1500);
});

});