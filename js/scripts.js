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

function buildPizzaForm() {
  $(".pizzas").append("<div class='pizza'>" +
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
                          "<h3>$1 toppings</h3>" +
                          "<ul>" +
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
                          "<h3>$2 toppings</h3>" +
                          "<ul>" +
                            "<li><label for='artichokes' class='topping-label'>" +
                            "<input type='checkbox' class='artichokes' name='toppings' value='artichokes'> Artichoke Hearts</label></li>" +
                            "<li><label for='mushrooms' class='topping-label'>" +
                            "<input type='checkbox' class='roastedredpepper' name='toppings' value='roastedredpepper'> Roasted Red Peppers</label></li>" +
                            "<li><label for='mushrooms' class='topping-label'>" +
                            "<input type='checkbox' class='garlic' name='toppings' value='garlic'> Garlic</label></li>" +
                          "</ul>" +
                        "</div>" +
                      "</div>")
}


//"ham", "bacon", "pineapple", "green peppers", "olives", "onions", "mushrooms"];

$(document).ready(function() {
  $("#add").click(function() {
    buildPizzaForm();
  });

var order = new Order();
//make this a function
  $("#pizza-form").submit(function(event) {
    event.preventDefault();
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

//order total
    order.pizzas.forEach(function(pizza) {
      pizza.calcCost();
    })
    order.orderCost();
    $(".total").show();
    for (var i = 0; i < order.pizzas.length; i++) {
      $(".total").append("<p>Pizza #" + (i+1) + ": $" + order.pizzas[i].cost + ". <span class='review' id='pizzaID" + i +"'>Please click to review</span></p>");
    }

    $(".total").append("<p>$" + order.total + "</p>");

//review click
  $(".review").click(function() {
 //TODO - need to be able to grab all numbers after pizzaID, not just last one
    var pizzaIndex = $(this).attr("id")[7];
    var reviewPizza = order.pizzas[pizzaIndex];
    $(this).parent().append("<p>Size: " + reviewPizza.size + "</p>" +
                            "<p>Toppings: " + reviewPizza.toppingsDisplay.join(", "));
    console.log(order.pizzas[pizzaIndex]);


  });


      //var pToppings = $(this).find("input:checkbox[name=toppings]:checked").val();
    //  var newPizza = new Pizza(sizeInput);
  //    debugger;
  //    pToppings.forEach(function(pTopping) {
  //      addTopping(newPizza, pTopping);
  //    })
//    });

    //var sizeInput = $("#size").val();
    //var order = new Pizza(sizeInput);
    //$("input:checkbox[name=toppings]:checked").each(function() {
      //addTopping(order, $(this).val());
    //});

    //order.calcCost();
  //  $(".total").show();
  //  $(".total").append("<p>$" + order.cost + "</p>");

  });




});
