const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener("click", () =>{
        nav.classList.add("active");
    })
}

if (close){
    close.addEventListener("click", () =>{
        nav.classList.remove("active");
    })
}


/*FOR CART PAGE*/

var removecart = document.getElementsByClassName('close')
console.log(removecart)

for( i=0; i < removecart.length; i++){
   var button = removecart[i]
   button.addEventListener('click', function(event) {
    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.parentElement.remove()
    /*Updating total everytime you remove item*/
    updateCartTotal()
   })


}
// Calculate and update subtotal for each item
var items = document.querySelectorAll('.item-row');
var subtotalElements = document.querySelectorAll('.subtotal');

items.forEach(function(item) {
  var priceElement = item.querySelector('.price');
  var quantityElement = item.querySelector('.quantity input');
  var subtotalElement = item.querySelector('.subtotal');

  function updateSubtotal() {
    var price = parseFloat(priceElement.innerText.replace('₹', ''));
    var quantity = parseInt(quantityElement.value);
    var subtotal = price * quantity;

    subtotalElement.innerText = '₹' + subtotal;
    updateCartTotal();
  }

  quantityElement.addEventListener('input', updateSubtotal);
  updateSubtotal();
});

// Calculate and update overall cart total
function updateCartTotal() {
  var cartTotal = 0;

  subtotalElements.forEach(function(subtotalElement) {
    var subtotal = parseFloat(subtotalElement.innerText.replace('₹', ''));
    cartTotal += subtotal;
  });

  var cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.innerText = '₹' + cartTotal;
}

updateCartTotal();


const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    var itemRow = buttonClicked.parentElement.parentElement;
    var itemImage = itemRow.querySelector('.item-image');
    var itemName = itemRow.querySelector('.item-name').innerText;
    var itemPrice = itemRow.querySelector('.item-price').innerText;

    addItemToCart(itemImage.src, itemName, itemPrice);
  });
});

const addToCartButtons = document.querySelectorAll('.single-pro-details');

addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    var itemRow = buttonClicked.closest('.item-row');
    var itemImage = itemRow.querySelector('.item-image').src;
    var itemName = itemRow.querySelector('.item-name').innerText;
    var itemPrice = itemRow.querySelector('.price').innerText;
    var itemQuantity = itemRow.querySelector('.quantity input').value;

    addItemToCart(itemImage, itemName, itemPrice, itemQuantity);
  });
});

function addItemToCart(image, name, price, quantity) {
  var cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  var cartItemImage = document.createElement('img');
  cartItemImage.src = image;
  cartItemImage.alt = name;
  cartItem.appendChild(cartItemImage);

  var cartItemDetails = document.createElement('div');
  cartItemDetails.classList.add('cart-item-details');

  var itemName = document.createElement('span');
  itemName.innerText = name;
  cartItemDetails.appendChild(itemName);

  var itemPrice = document.createElement('span');
  itemPrice.innerText = price;
  cartItemDetails.appendChild(itemPrice);

  var itemQuantity = document.createElement('span');
  itemQuantity.innerText = 'Quantity: ' + quantity;
  cartItemDetails.appendChild(itemQuantity);

  cartItem.appendChild(cartItemDetails);

  var cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.appendChild(cartItem);
}


