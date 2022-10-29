import Product from "./product";

interface Cart {
	id ?:number,
	timestamp?:string,
	products ?:Product[]
}

export default Cart;
