const productContainer = document.getElementById("product-container");
const currentCartId = "";


async function logoff() {
	let fetchOptions = {
		method: "GET",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	}
	await fetch("/api/auth/logoff", fetchOptions)
	let  data = await res.json();
	console.log(data)
}

async function getCart() {
	let fetchOptions = {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	}
	let res = await fetch("/api/cart", fetchOptions)
	let  data = await res.json();
	console.log(data)
	if(data.success) {
	}
}

async function addToCart(id) {
	if(!currentCartId) {
		await getCart();
	}
}	

async function getProducts() {
	let fetchOptions = {
		method: "GET",
		headers: {'Content-Type': 'application/json'},
	}
	let res = await fetch("/api/products", fetchOptions)
	let data = await res.json();
	if(data.success) {
		productContainer.innerHTML = "";
		const products = data.response.products;
		console.log(products)
		products.forEach(product => {
			let productBox = document.createElement("div");
			productBox.className = "product-box";
			productBox.innerHTML =
				`
					<img src="${product.imgUrl}">
					<div>
						<span class="title">${product.name}</span>
						<span class="price">$${product.price}</span>
					</div>
					<span class="code">${product.code}</span>
					<button onclick="addToCart('${product._id}')">Add to cart</button>
				`
			productContainer.append(productBox);
		})
	}
}

getProducts();


