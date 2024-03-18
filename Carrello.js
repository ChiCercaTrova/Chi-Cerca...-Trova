document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const totalPriceDisplay = document.querySelector('.total-price');

    let cartItems = [];
    let totalPrice = 0;

    // Function to update total price
    function updateTotalPrice() {
        totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Function to update cart items display
    function updateCartItems() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <span>${item.name} - ${item.quantity}</span>
                <button class="remove-item">Remove</button>
                <button class="increase-quantity">+</button>
                <button class="decrease-quantity">-</button>
            `;
            cartItemsList.appendChild(listItem);
        });
    }

    // Add to cart button click event
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const name = product.querySelector('h2').textContent;
            const price = parseFloat(this.getAttribute('data-price'));

            // Check if item already exists in cart
            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            // Update cart display and total price
            updateCartItems();
            updateTotalPrice();
        });
    });

    // Event delegation for remove item button
    cartItemsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const itemToRemove = event.target.parentElement;
            const itemName = itemToRemove.querySelector('span').textContent.split(' - ')[0];
            cartItems = cartItems.filter(item => item.name !== itemName);
            updateCartItems();
            updateTotalPrice();
        }
    });

    // Event delegation for increase quantity button
    cartItemsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('increase-quantity')) {
            const itemToIncrease = event.target.parentElement;
            const itemName = itemToIncrease.querySelector('span').textContent.split(' - ')[0];
            const item = cartItems.find(item => item.name === itemName);
            item.quantity++;
            updateCartItems();
            updateTotalPrice();
        }
    });

    // Event delegation for decrease quantity button
    cartItemsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('decrease-quantity')) {
            const itemToDecrease = event.target.parentElement;
            const itemName = itemToDecrease.querySelector('span').textContent.split(' - ')[0];
            const item = cartItems.find(item => item.name === itemName);
            if (item.quantity > 1) {
                item.quantity--;
                updateCartItems();
                updateTotalPrice();
            }
        }
    });
});
