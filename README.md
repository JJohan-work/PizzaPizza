# Pizza Parlor
#### *Created By: Jonah Johansen*
#### *Order a pizza and get a dynamic price*

* * *

## Description  
  Custom make a pizza and add ingredients. Upon checkout get a price calculated from size and toppings.

* * *

## Setup instructions:  
* Go to [Github Pages](https://jjohan-work.github.io/PizzaPizza/.) to see webpage
#### Alt
* Clone Repo
* Open index.html in browser

* * *
## Specs:
### Cart
|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.getTotal():
#### Describe: Sets this.total by imcrementing through all Pizza objects in this.items and adds Pizza.cost to total. Pizza.cost is a string and total is saved as float No input or Output
|   |   |Input|Expect|
|---|---|---|---|
|getTotal()|   |this.items = {pizza.cost="15.5",pizza="27.5",pizza.cost="16.2"}|this.total="59.2"|

|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.setActive(pizza)
#### Describe: gets a Pizza object and sets it to Cart.active.
|   |   |Input|Expect|
|---|---|---|---|
|setActive(pizza)|   |inputPizza|this.active="inputPizza"|

|   |   |   |   |
|---|---|---|---|
#### Name: Cart.prototype.addToOrder(pizza)
#### Describe: gets a Pizza object and adds it to this.items array under index of this.currentindex. Then increments this.currentIndex by one.
|   |   |Input|Expect|
|---|---|---|---|
|addToOrder(pizza)|   |inputPizza|this.items=[inputPizza]|

### Pizza
|   |   |   |   |
|---|---|---|---|
#### Name: Pizza.prototype.calcprice(priceBook)
#### Describe: Takes priceBook as input which acts as a replacement cypher that converts all pizza options added during selectiona and converts them to prices which is then added to this.cost of the pizza object.
|   |   |Input|Expect|
|---|---|---|---|
|calcprice(priceBook)|   |priceBook|this.cost=[]|

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