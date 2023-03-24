import { createManager } from "../persistence/managerFactory";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { DbClient } from "../persistence/dbclient";
import { errorLogger, infoLogger } from "../services/logger.service";
import { Cart } from "../persistence/interfaces/cart.interface";
import { Request, Response } from "express";
import CART_STATUS from "../persistence/enums/cartStatus.enum";


export const getCart = async (req :Request | any, res :Response) => {
    try {
        const userId = req?.session?.id;
        const cartManager = createManager(MANAGERTYPE.CARTS);

        //SHOULD LOOK FOR A CART WITH THE USER ID
        const cartFound :Cart|null = null;


        if (cartFound) {
            console.log(cartFound);
            res.send({success : true, message: "Cart already exists, existing cart retrieved", cart: cart})
        } else {
            const newCart :Cart = await cartManager?.save({
                userId: userId,
                products_ids: [],
                status: CART_STATUS.ACTIVE
            });
            res.send({success : true, message: "New cart created and retrieved", cart: newCart})
        }
    } catch (error) {
        errorLogger.error(error);
        res.send({success : false, message: "Failed to get cart"})
    }
}
