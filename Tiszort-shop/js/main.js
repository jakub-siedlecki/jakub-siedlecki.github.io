simpleCart({
  // array representing the format and columns of the cart,
  // see the cart columns documentation
  cartColumns: [
    { attr: "name", label: "Nazwa"},
    { attr: "size", label: "Rozmiar"},
    { view: "currency", attr: "price", label: "Cena"},
    { view: "decrement", label: false, text: '<span class="glyphicon glyphicon-minus" style="color: #ed4b29;"></span>'},
    { attr: "quantity", label: "Ilość"},
    { view: "increment", label: false, text: '<span class="glyphicon glyphicon-plus" style="color: #ed4b29;"></span>'},
    { view: "currency", attr: "total", label: "Razem" },
    { view: "remove", text: '<span class="glyphicon glyphicon-trash" style="color: #ed4b29;"></span>', label: false}
  ],

  // "div" or "table" - builds the cart as a
  // table or collection of divs
  cartStyle: "table",

  // how simpleCart should checkout, see the
  // checkout reference for more info
  checkout: {
    type: "PayPal" ,
    email: "poczta@gmail.com"
  },

  // set the currency, see the currency
  // reference for more info
  currency: "PLN",

  // collection of arbitrary data you may want to store
  // with the cart, such as customer info
  data: {},

  // set the cart langauge
  // (may be used for checkout)
  language: "english-us",

  // array of item fields that will not be
  // sent to checkout
  excludeFromCheckout: [],

  // custom function to add shipping cost
      shippingCustom: function(){
         if( simpleCart.total() > 200 ){
              return 0;
         } else {
              return 10;
         }
    },

  // flat rate shipping option
  shippingFlatRate: 0,

  // added shipping based on this value
  // multiplied by the cart quantity
  shippingQuantityRate: 0,

  // added shipping based on this value
  // multiplied by the cart subtotal
  shippingTotalRate: 0,

  // tax rate applied to cart subtotal
  taxRate: 0,

  // true if tax should be applied to shipping
  taxShipping: false,

  // event callbacks
  beforeAdd     : null,
  afterAdd      : null,
  load        : null,
  beforeSave    : null,
  afterSave     : null,
  update      : null,
  ready     : null,
  checkoutSuccess : null,
  checkoutFail    : null,
  beforeCheckout    : null,
  beforeRemove           : null
});


// basic callback example
simpleCart.bind( "afterAdd" , function(){
    $( ".shop-basket" ).fadeOut(300).fadeIn(300);
});
// hide shop-basket if it's empty
simpleCart.bind( 'update' , function(){
    if (simpleCart.quantity() == 0)
    {
        $( ".hideIfEmpty" ).hide();
        $( ".showIfEmpty" ).show();
    }
    else
    {
        $( ".hideIfEmpty" ).show();
        $( ".showIfEmpty" ).hide();
    }
});

$(function(){
    $('#Container').mixItUp();
});

// handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});

// Prevents puting negatives and letters in to Ilość field
var number = document.getElementById('Qty');
number.onkeydown = function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
}

