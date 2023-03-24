import { MANAGERTYPE } from "../enums/managerType.enum";
import { createManager } from "../managerFactory";
import { ProductDTO } from "./product.dto";

export class CartDTO {
    id: string = "";
    products: any[] = [];
    status: string | number = "";
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    constructor() {
        this.id = "";
        this.products = [];
        this.status = 0;
        this.createdAt =  null;
        this.updatedAt = null;
    }

    public async initialize(object :any) {
        this.id = object.id || object._id || "";
        this.products = [];
        this.status = object.status || 0;
        if(typeof this.status === "number") {this.status = this.status.toString()}
        this.createdAt = object.createdAt || object.created_at || null;
        this.updatedAt = object.updatedAt || object.updated_at || null;
        await this.parseProducts(object.products_ids);
    }

    private async parseProducts(products_ids:any) {
        const productManager = createManager(MANAGERTYPE.PRODUCTS)
        /*The attribute products_ids only exist if the chosen DB is MONGO*/
        if (products_ids) {
            const objectProducts :any[] = products_ids || [];
            const nonRepeatingProducts :any = [];
            objectProducts.forEach((product_id :string|number) => {
                if (!nonRepeatingProducts.includes(product_id)) {
                    nonRepeatingProducts.push(product_id);
                }
            });
            const dbProducts :any = await productManager?.getObjectsByIds(nonRepeatingProducts);
            dbProducts.forEach((product :any) => {
                const productDTO = new ProductDTO(product);
                const quantity = objectProducts.filter((product_id :string|number) => product_id === productDTO.id).length;
                this.products.push({
                    quantity: quantity,
                    product: productDTO
                })
            });
        };
    }
}
