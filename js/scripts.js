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

//toppingArray = ["pepperoni", "sausage", "ham", "bacon", "pineapple", "green peppers", "olives", "onions", "mushrooms"];

$(document).ready(function() {

  $("#pizza-form").submit(function(event) {
    event.preventDefault();
    var sizeInput = $("#size").val();
    var order = new Pizza(sizeInput);
    $("input:checkbox[name=toppings]:checked").each(function() {
      order.toppings.push($(this).val());
    });

    order.calcCost();

    $(".total").append("<p>$" + order.cost + "</p>");
    debugger;
  });




});
