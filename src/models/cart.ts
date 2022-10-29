import Product from "./product";

interface Cart {
	id ?:number,
	timestamp?:string,
	productos :Product[]
}

export default Cart;
