import { errorLogger } from "../../services/logger.service";

export class ProductDTO {
    id: string = "";
    name: string = "";
    price: string = "";
    imgURL: string = "";
    description: string = "";
    category: string = "";
    createdAt: Date|null = null;
    updatedAt: Date|null = null;
    constructor(object :any) {
        try {
            if (!object) { throw "ProductDTO: object is null or undefined";}
            if (!object.id && !object._id) { throw "ProductDTO: object.id is null or undefined";}
            if (!object.name) { throw "ProductDTO: object.name is null or undefined";}
            if (!object.price) { throw "ProductDTO: object.price is null or undefined";}
            if (!object.imgURL) { throw "ProductDTO: object.imgURL is null or undefined";}
            if (!object.description) { throw "ProductDTO: object.description is null or undefined";}
            if (!object.category) { throw "ProductDTO: object.category is null or undefined";}
            this.id = object.id || object._id;
            this.name = object.name;
            this.price = object.price;
            this.imgURL = object.imgURL;
            this.description = object.description;
            this.category = object.category;
            this.createdAt = (object.created_at && new Date(object.created_at)) || null;
            this.updatedAt = (object.updated_at && new Date(object.updated_at)) || null;
        } catch (error) {
            errorLogger.error(error);
        }
    }
}
