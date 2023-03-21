import { errorLogger } from "../../services/logger.service";

export class ProductDTO {
    id: string = "";
    name: string = "";
    price: string = "";
    imgURL: string = "";
    description: string = "";
    category: string = "";
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
        } catch (error) {
            errorLogger.error(error);
        }
    }
}
