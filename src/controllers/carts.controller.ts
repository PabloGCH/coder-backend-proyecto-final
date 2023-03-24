import { createManager } from "../persistence/managerFactory";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { DbClient } from "../persistence/dbclient";
import { errorLogger, infoLogger } from "../services/logger.service";
import { Cart } from "../persistence/interfaces/cart.interface";
import { Request, Response } from "express";
import CART_STATUS from "../persistence/enums/cartStatus.enum";
import { CartDTO } from "../persistence/DTOs/cart.dto";


export const getCart = async (req :Request | any, res :Response) => {
    try {
        const userId = req?.session?.user?.id;
        const cartManager = createManager(MANAGERTYPE.CARTS);

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



