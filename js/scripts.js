function Order() {
  this.pizzas = [];
  this.total = 0;
}

Order.prototype.orderCost = function() {
  var totalCost = 0;
  this.pizzas.forEach(function(pizza) {
    console.log(pizza.cost);
    totalCost += pizza.cost;
  });
  return this.total = totalCost;
}


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
  var topCost = 0;
  this.toppings.forEach(function(top) {
    topCost = topCost + top.type;
  });
  this.cost += topCost;
}

function addTopping(pizza, topping) {
  var toppingArray = [{name:"pepperoni", type:1},
                  {name:"sausage", type:1},
                  {name:"ham", type:1},
                  {name:"bacon", type:1},
                  {name:"pineapple", type:1},
                  {name:"peppers", type:1},
                  {name:"olives", type:1},
                  {name:"onions", type:1},
                  {name:"mushrooms", type:1},
                  {name:"artichokes", type:2},
                  {name:"roastedredpepper", type:2},
                  {name:"garlic", type:2}
                ];
  i = 0;
  toppingArray.forEach(function(top) {
    if (top.name === topping){
      pizza.toppings.push(toppingArray[i]);
    }
    i++;
});
}



//"ham", "bacon", "pineapple", "green peppers", "olives", "onions", "mushrooms"];

$(document).ready(function() {

  $("#pizza-form").submit(function(event) {
    event.preventDefault();
    var sizeInput = $("#size").val();
    //var order = new Pizza(sizeInput);
    $("input:checkbox[name=toppings]:checked").each(function() {
      addTopping(order, $(this).val());
    });

    order.calcCost();
    $(".total").show();
    $(".total").append("<p>$" + order.cost + "</p>");
    debugger;
  });




});
