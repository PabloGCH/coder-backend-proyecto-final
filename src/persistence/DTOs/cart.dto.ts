export class CartDTO {
    id: string = "";
    userId: string = "";
    products_ids: string[] = [];
    status: string = "";
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    constructor(object :any) {
        this.id = object.id || object._id || "";
        this.userId = object.userId || "";
        this.products_ids = [];
        this.status = object.status || "";
        this.createdAt = object.createdAt || null;
        this.updatedAt = object.updatedAt || null;
    }
}
