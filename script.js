// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

function getCart(){
	return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
	sessionStorage.setItem("cart",JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button)=>{
	button.addEventListener('click',(e)=>{
		const prodId=parseInt(e.target.getAttribute("data-id"));
		addToCart(prodId);
	});
  });
}

// Render cart list
function renderCart() {
	let cart=getCart();
	cartList.innerHTML='';

	cart.forEach((item)=>{
		const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
        cartList.appendChild(li);
	});

	document.querySelectorAll('.remove-from-cart-btn').forEach((item)=>{
		item.addEventListener('click', (e)=> {
			let prodId=parseInt(e.target.getAttribute('data-id'));
			removeFromCart(prodId);
		})
	});
}

// Add item to cart
function addToCart(productId) {
	const prod=products.find((p)=>p.id===productId);

	if(!prod) return;

	const cart = getCart();

	let flag=cart.find((p)=>p.id===productId);
	if(flag) return;
	
	cart.push(prod);
	saveCart(cart);
	renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
	let cart=getCart();

	cart=cart.filter((p)=>p.id!==productId);
	saveCart(cart);
	renderCart();
}

// Clear cart
function clearCart() {
	sessionStorage.removeItem("cart");
	renderCart();
}

// Initial render
renderProducts();
renderCart();
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);