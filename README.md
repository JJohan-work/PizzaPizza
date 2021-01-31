# Pizza Parlor
#### *Created By: Jonah Johansen*
#### *Order a pizza and get a dynamic price*

* * *

## Description  
  Custom make pizzas and add ingredients.Add as many Pizzas as you want. Upon checkout get a price calculated from size, crust, dough flavor, sauce and toppings.

* * *

## Setup instructions:  
* Go to [Github Pages](https://jjohan-work.github.io/PizzaPizza/.) to see webpage
#### Alt
* Clone Repo
* Open index.html in browser

* * *
## Specs:
### Cart  
Cart contains all objects and persists without reset until page refreshes
|   |   |Input|Expect|
|---|---|---|---|
|new Cart()|   ||this.items = [], this.currentindex = 0, this.total = 0, this.active = {}|

|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.getTotal():
#### Describe: Sets this.total by imcrementing through all Pizza objects in this.items and adds Pizza.cost to total. Pizza.cost is a string and total is saved as float No input or return
|   |   |Input|Expect|
|---|---|---|---|
|getTotal()|   |this.items = {pizza.cost="15.5",pizza="27.5",pizza.cost="16.2"}|this.total="59.2"|

|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.setActive(pizza)
#### Describe: Gets a Pizza object and sets it to Cart.active. No return
|   |   |Input|Expect|
|---|---|---|---|
|setActive(pizza)|   |inputPizza|this.active="inputPizza"|

|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.addToOrder(pizza)
#### Describe: Gets a Pizza object and adds it to this.items array under index of this.currentindex. Then increments this.currentIndex by one. No return
|   |   |Input|Expect|
|---|---|---|---|
|addToOrder(pizza)|   |inputPizza|this.items=[inputPizza]|

### Pizza
Pizza is an object that holds all properties and options a pizza can have. The receipt and graphic both pull data from the object when it is in Cart.items or set to Cart.active
|   |   |Input|Expect|
|---|---|---|---|
|new Pizza()|   ||this.size = ; this.crusts = ; this.cFlavor = ; this.sauce = ; this.cheese  = ; this.toppings = []; this.specials = []; this.cost = 0; this.rotate = 0;|

|   |   |   |   |
|---|---|---|---|
#### Name: Pizza.prototype.calcprice(priceBook)
#### Describe: Takes priceBook as input which acts as a replacement cypher that converts all pizza options added during selectiona and converts them to prices which is then added to this.cost of the pizza object.
|   |   |Input|Expect|
|---|---|---|---|
|calcprice(priceBook)|   |priceBook|this.cost=[]|

|   |   |   |   |
|---|---|---|---|
#### Name: Pizza.prototype.add(typeofItem,itemToAdd)
#### Describe: Sets string itemToAdd under the key of typeofItem to the pizza object. No return
|   |   |Input|Expect|
|---|---|---|---|
|add(typeofItem,itemToAdd)|   |add("size","large")|this.size = "large"|


### Dis

|   |   |   |   |
|---|---|---|---|
#### Name: Dis.prototype.AddtoPizza(typeToAdd,itemToAdd)
#### Describe:For every button in the pizza controller this has a branched path which modifies Dis properties and then applies the relevent properties to the graphic. Most of the toppings are added in by appling multiple background images to an invisible div.
|   |   |Input|Expect|
|---|---|---|---|
|   |   |Dis.AddtoPizza("size","large")|this.pizzaSize = 500|
* * *

## Technologies used
* HTML
* CSS
* Bootstrap v5
* Git and Github
* JavaScript
* JQuery

* * *

## To Do:
* Add Pizza Animation

* * *

## Addition comments:
* Created on 1/29/21  
* Currently in development and unfinished (*as of 1/29/21*)

* * *

## License:
> *&copy; Jonah Johansen, 2021*

Licensed under [MIT license](https://mit-license.org/)

* * *

## Contact Information
_Jonah Johansen: [Email](johansenjonah+git@gmail.com)_