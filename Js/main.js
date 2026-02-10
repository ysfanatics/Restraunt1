let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if(cartItemsDiv){
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(div);
            total += item.price;
        });
        cartTotal.innerText = total;
    }

    if(cartCount){
        cartCount.innerText = cart.length;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price){
    cart.push({name, price});
    updateCartDisplay();
}

function removeFromCart(index){
    cart.splice(index,1);
    updateCartDisplay();
}

const orderForm = document.getElementById('order-form');
if(orderForm){
    orderForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment-method').value;

        let message = `New Order:%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0APayment: ${payment}%0AItems:%0A`;

        let total = 0;
        cart.forEach(item=>{
            message += `${item.name} - ₹${item.price}%0A`;
            total += item.price;
        });
        message += `Total: ₹${total}`;

        const whatsappNumber = "+917696904810"; 
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl,'_blank');

        cart = [];
        updateCartDisplay();
        orderForm.reset();
    });
}

updateCartDisplay();
