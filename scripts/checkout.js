import { cart, removeFromCart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

// Generate the cart summary HTML
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct = products.find(product => product.id === productId);
  if (!matchingProduct) return;


  

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label" d>${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
            
            <input class="quantity-input" style="display:none;" type="number" min="1" value="${cartItem.quantity}"> 
            <span class="save-quantity-link link-primary js-save-quantity" style="display:none;">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

// Insert the cart summary into the page
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Delete item from cart
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) container.remove();
  });
});

// Function to update the cart quantity
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.return-to-home-link').innerHTML = `${cartQuantity}`;
}

updateCartQuantity(); 

// Update quantity handler
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    if (container) {
      container.classList.add('is-editing-quantity');
      const input = container.querySelector('.quantity-input');
      const saveLink = container.querySelector('.save-quantity-link');
      if (input && saveLink) {
        input.style.display = 'inline';
        saveLink.style.display = 'inline';
        input.focus(); // Focus on the input field for user convenience
      }
    } else {
      console.error(`Container for product ${productId} not found`);
    }
  });
});





// Save updated quantity
document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = link.closest('.cart-item-container');
    const input = container.querySelector('.quantity-input');



    if (input) {
      let inputValue = input.value;
      console.log('Updated quantity:', inputValue);
   
      
      // Update the displayed quantity
      const quantityLabel = container.querySelector('.quantity-label'); // Find the span that displays the quantity
      if (quantityLabel) {
        console.log('Before update:', quantityLabel.textContent); // Log before
        quantityLabel.textContent = inputValue; // Update the text content
        console.log('After update:', quantityLabel.textContent); // Log after
      } else {
        console.error('Quantity label not found.');
      }

      // Optionally hide input and save link after saving
      input.style.display = 'none';
      link.style.display = 'none';
     
    } else {
      console.error('Input not found.');
    }
  });
});
