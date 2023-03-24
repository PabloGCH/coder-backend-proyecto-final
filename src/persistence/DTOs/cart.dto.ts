export class CartDTO {
    id: string = "";
    products: string[] = [];
    status: string = "";
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    constructor(object :any) {
        this.id = object.id || object._id || "";
        this.products = [];
        this.status = object.status || "";
        this.createdAt = object.createdAt || null;
        this.updatedAt = object.updatedAt || null;

        if (object.products_ids) {
            this.products = object.products_ids.map((product: any) => {
                return product;
            });
        }
    }
}
