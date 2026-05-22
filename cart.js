let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

/* SHOW MESSAGE */

function showMessage(message){

    const messageBox = document.getElementById("cart-message");

    if(messageBox){

        messageBox.innerHTML = message;

        messageBox.style.display = "block";

        setTimeout(() => {

            messageBox.style.display = "none";

        }, 3000);

    }
}

/* UPDATE CART COUNT */

function updateCartCount(){

    if(cartCount){
        cartCount.textContent = cart.length;
    }
}

/* ADD TO CART */

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,

            price: Number(button.dataset.price)

        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        showMessage(product.name + " has been added to cart");

        updateCartCount();

    });

});

/* DISPLAY CART */

function displayCart(){

    if(cartItems){

        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {

            const li = document.createElement("li");

            li.innerHTML = `
                ${item.name} - P${item.price}

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(li);

            total += item.price;

        });

        cartTotal.textContent = total;
    }
}

/* REMOVE ITEM */

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}

/* CLEAR CART */

function clearCart(){

    cart = [];

    localStorage.removeItem("cart");

    displayCart();

    updateCartCount();
}

/* LOAD FUNCTIONS */

updateCartCount();

displayCart();

/* CHECKOUT FORM */

const checkoutForm = document.getElementById("checkout-form");

if(checkoutForm){

    checkoutForm.addEventListener("submit", function(event){

        event.preventDefault();

        document.getElementById("success-message").innerHTML =
        "Order placed successfully!";

        clearCart();

    });

}