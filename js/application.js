// This function calculates the subtotal of each product depending on the quantity, and displays the subtotal in the page.
var updateProductSubtotal = function (ele) {
  var productPrice = parseFloat($(ele).children('.product-price').text().replace('$', ''));
  var productQuantity = parseFloat($(ele).find('.product-quantity input').val());
  var productSubtotal = productPrice * productQuantity;
  $(ele).children('.product-subtotal').html('$' + productSubtotal);
  return productSubtotal;
};

// This function calculates the toal of the cart and displays it on the page. 
var updateTotal = function () {
  var allSubtotals = [];
  
  $('.product').each(function (i, ele) {
    var productSubtotal = updateProductSubtotal(ele);
    allSubtotals.push(productSubtotal);
  });  
  var cartTotal = allSubtotals.reduce(sum);
  //console.log(cartTotal);
  $('#total-price').html('$' + cartTotal);

};

// reducer function used to sum the number of products. 
sum = function (acc, cur) {return acc + cur};

// Main logic runs once the document is ready.
$(document).ready(function () {  
  
  // Main function is run when document is ready. 
  updateTotal();
  
  // Main function is run every time the number of products change through user input.
  // Debouncing is used to prevent events happenning faster than half a second. 
  var timeout;
  $(document).on('input','.product-quantity input',function () {
    clearInterval(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 500);    
  });
  
  // Main function is run when a product is deleted from the list. 
  $(document).on('click','button.remove',function (event) {
    $(this).closest('.product').remove();
    updateTotal();
  });

  $('#addProduct').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();
    console.log(name, price);
    
    $('#product-list').append('<div class="row product">' +
        '<div class="product-name col-xs-3">' + name +
        '</div>' +
        '<div class="product-price col-xs-3">' + '$' + price +
        '</div>' +
        '<div class="product-quantity col-xs-3">' +
          '<label>Cantidad</label >' +
          '<input class="quantity" type="number" value="0"/>' +
        '</div>' +
        '<div class="col-xs-1">' +
        '<button class="remove">Remover</button>' +
        '</div>' +
        '<div class="product-subtotal col-xs-2">' +
          '$--.-- ' +
        '</div >' +
      '</div>'
    );

    updateTotal();
    $(this).children('[name=name]').val('');
    $(this).children('[name=price]').val('');

  });

});

// console.log(cartTotal);