import { ProductDTO } from "../DTOs/product.dto";

export interface CartProduct {
    quantity: number;
    product: ProductDTO;
}

export interface Cart {
    id: string;
    _id: string;
    status: string;
    items: any[];
}
