function Pizza(size) {
  this.size = size;
  this.base = 5;
  this.cost = 0;
  this.toppings = [];
  }

Pizza.prototype.calcCost = function() {
  //size cost
  if (this.size === "small") {
    this.cost = this.base + 0;
  } else if (this.size === "medium") {
    this.cost = this.base + 2;
  } else if (this.size === "large") {
    this.cost = this.base + 4;
  }

  //toppings costs
  this.cost = this.cost + this.toppings.length;

}

sizeArray = ["small", "medium", "large"];
toppingArray = ["pepperoni", "sausage", "ham", "bacon", "pineapple", "green peppers", "olives", "onions", "mushrooms"];

$(document).ready(function() {
  var order = new Pizza("small");

});
