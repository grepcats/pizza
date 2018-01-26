//business functions
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
  this.toppingsDisplay = [];
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

//UI functions
function buildPizzaForm() {
  $(".pizzas").prepend("<div class='pizza well'>" +
                        "<div class='form-group'>" +
                          "<label for='size'>What size pizza would you like?</label>" +
                          "<select class='size form-control'>" +
                            "<option value='small'>Small - 10</option>" +
                            "<option value='medium'>Medium - 12</option>" +
                            "<option value='large'>Large - 14</option>" +
                          "</select>" +
                        "</div>" +
                        "<div class='form-group'>" +
                          "<h2>What toppings would you like?</h2>" +
                          "<h3 class='oneTopHead'>$1 toppings <span class='caret'></span></h3>" +
                          "<ul class='oneTopList'>" +
                            "<li><label for='pepperoni' class='topping-label'>" +
                            "<input type='checkbox' class='pepperoni' name='toppings' value='pepperoni'> Pepperoni</label></li>" +
                            "<li><label for='sausage' class='topping-label'>" +
                            "<input type='checkbox' class='sausage' name='toppings' value='sausage'> Sausage</label></li>" +
                            "<li><label for='ham' class='topping-label'>" +
                            "<input type='checkbox' class='ham' name='toppings' value='ham'> Ham</label></li>" +
                            "<li><label for='bacon' class='topping-label'>" +
                            "<input type='checkbox' class='bacon' name='toppings' value='bacon'> Bacon</label></li>" +
                            "<li><label for='pineapple' class='topping-label'>" +
                            "<input type='checkbox' class='pineapple' name='toppings' value='pineapple'> Pineapple</label></li>" +
                            "<li><label for='peppers' class='topping-label'>" +
                            "<input type='checkbox' class='peppers' name='toppings' value='peppers'> Green Peppers</label></li>" +
                            "<li><label for='olives' class='topping-label'>" +
                            "<input type='checkbox' class='olives' name='toppings' value='olives'> Olives</label></li>" +
                            "<li><label for='onions' class='topping-label'>" +
                            "<input type='checkbox' class='onions' name='toppings' value='onions'> Onions</label></li>" +
                            "<li><label for='mushrooms' class='topping-label'>" +
                            "<input type='checkbox' class='mushrooms' name='toppings' value='mushrooms'> Mushrooms</label></li>" +
                          "</ul>" +
                          "<h3 class='twoTopHead'>$2 toppings <span class='caret'></span></h3>" +
                          "<ul class='twoTopList'>" +
                            "<li><label for='artichokes' class='topping-label'>" +
                            "<input type='checkbox' class='artichokes' name='toppings' value='artichokes'> Artichoke Hearts</label></li>" +
                            "<li><label for='mushrooms' class='topping-label'>" +
                            "<input type='checkbox' class='roastedredpepper' name='toppings' value='roastedredpepper'> Roasted Red Peppers</label></li>" +
                            "<li><label for='mushrooms' class='topping-label'>" +
                            "<input type='checkbox' class='garlic' name='toppings' value='garlic'> Garlic</label></li>" +
                          "</ul>" +
                        "</div>" +
                        "<span class='btn btn-danger remove'>Remove Pizza</span>" +
                      "</div>")
}

function createOrder(order) {
  $(".pizza").each(function() {
    var pToppings = []
    var sizeInput = $(this).find(".size").val();
    $(this).find("input:checkbox[name=toppings]:checked").each(function() {
      pToppings.push($(this).val());
    });
    var pizza = new Pizza(sizeInput)
    pToppings.forEach(function(topping) {
      addTopping(pizza, topping);
      pizza.toppingsDisplay.push(topping);
    });
    order.pizzas.push(pizza);
  });
}

function displayTotal(order) {
  order.pizzas.forEach(function(pizza) {
    pizza.calcCost();
  })
  order.orderCost();
  $(".total").show();
  for (var i = 0; i < order.pizzas.length; i++) {
    $(".total").append("<div class='well total-well review pizza-num' id='pizzaID" + i +"'><h3>Pizza #" + (i+1) + ": $" + order.pizzas[i].cost + "</h3><h4>Please click to see details for this pizza!</h4><p class='review-text'></p></div>");
  }

  $(".total").append("<p id='total-text'>The total for your order is: $" + order.total + "</p>");
}


$(document).ready(function() {
  $("#add").first().click(function() {
    buildPizzaForm();
    $("#submit-button").show();
    $(".remove").click(function() {
      $(this).parent().remove();
    });
    //$(".oneTopHead").click(function() {
    //  $(".oneTopList").toggle();
    //});
  //  $(".twoTopHead").click(function() {
  //    $(".twoTopList").toggle();
  //  });
  });



//create order
var order = new Order();

  $("#pizza-form").submit(function(event) {
    event.preventDefault();
    createOrder(order);

//display order total
  displayTotal(order);
  $(".pizzas").hide();
  $("#add").hide();
  //$(".retry").show()

//review click
  $(".review").click(function() {
 //TODO - need to be able to grab all numbers after pizzaID, not just last one
    var pizzaIndex = $(this).attr("id")[7];
    var reviewPizza = order.pizzas[pizzaIndex];
    $(this).find("h4").remove();
    $(this).find(".review-text").html("<p>Size: " + reviewPizza.size + "</p><p>Toppings: " + reviewPizza.toppingsDisplay.join(", "));

  });

  //$(".retry").click(function() {
  //  $(".pizzas").show();
  //  $(".review").remove();
  //  $(".total div").remove();
  //  $(".total p").remove();

  //});



  });




});
