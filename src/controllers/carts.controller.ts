import { createManager } from "../persistence/managerFactory";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { DbClient } from "../persistence/dbclient";
import { errorLogger, infoLogger } from "../services/logger.service";
import { Cart } from "../persistence/interfaces/cart.interface";
import { Request, Response } from "express";
import CART_STATUS from "../persistence/enums/cartStatus.enum";
import { CartDTO } from "../persistence/DTOs/cart.dto";


export const orderCart = async (req :Request | any, res :Response) => {
    try {
        const cartManager = createManager(MANAGERTYPE.CARTS);
        const {cartid} = req.params;
        await cartManager?.update(cartid, {
            status: CART_STATUS.ORDER_PENDING,
        });
        const newCart = await cartManager?.getObject(cartid);
        res.send({success : true, message: "Cart ordered", data: new CartDTO(newCart)});
    } catch (error) {
        errorLogger.error(error);
        res.send({success : false, message: "Failed to order cart"})
    }
}

export const getCart = async (req :Request | any, res :Response) => {
    try {
        const cartManager = createManager(MANAGERTYPE.CARTS);
        const userId = req?.session?.user?.id;

        //SHOULD LOOK FOR AN ACTIVE CART WITH THE USER ID
        const cartFound :Cart|null = await cartManager?.getObjectByFields({userId: userId, status: CART_STATUS.ACTIVE});

        if (cartFound) {
            res.send({success : true, message: "Cart already exists, existing cart retrieved", data: new CartDTO(cartFound)});
        } else {
            const newCart :Cart = await cartManager?.save({
                userId: userId,
                products_ids: [],
                status: CART_STATUS.ACTIVE
            });
            res.send({success : true, message: "New cart created and retrieved", data: new CartDTO(newCart)});
        }
    } catch (error) {
        errorLogger.error(error);
        res.send({success : false, message: "Failed to get cart"})
    }
}

export const addProductToCart = async (req :Request | any, res :Response) => {
    try {
        const cartManager = createManager(MANAGERTYPE.CARTS);
        const {cartid, productid} = req.params;
        const newCart = await cartManager?.addManyToManyRelation(cartid, "products", productid);
        res.send({success : true, message: "Product added to cart", data: new CartDTO(newCart)});
    } catch (error) {
        errorLogger.error(error);
        res.send({success : false, message: "Failed to add product to cart"})
    }
}



