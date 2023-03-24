import { createManager } from "../persistence/managerFactory";
import { Request, Response } from "express";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { DbClient } from "../persistence/dbclient";
import { errorLogger, infoLogger } from "../services/logger.service";
import { ProductDTO } from "../persistence/DTOs/product.dto";
import { Product } from "../persistence/interfaces/product.interface";

export const getAllProducts = (req :Request, res :Response) => {
    try {
        const productManager :DbClient|null = createManager(MANAGERTYPE.PRODUCTS);
        productManager?.getObjects().then((products :Product[]) => {
            let productsDTO = products.map((product :Product) => {
                return new ProductDTO(product);
            });
            res.send({
                success: true,
                message: "Products fetched successfully",
                data: productsDTO || null
            });
            infoLogger.info({
                endpoint: "getAllProducts",
                method: "GET"
            });
        })
    } catch (error) {
        errorLogger.error({
            endpoint: "getAllProducts",
            error: error
        });
    }
}

export const getProductById = (req :Request, res :Response) => {
    try {
        const productManager :DbClient|null = createManager(MANAGERTYPE.PRODUCTS);
        let {id} = req.params;
        productManager?.getObject(id).then((product :Product) => {
            let productDTO = new ProductDTO(product);
            res.send({
                success: true,
                message: "Product fetched successfully",
                data: productDTO || null
            });
            infoLogger.info({
                endpoint: "getProductById",
                method: "GET"
            });
        })
    } catch (error) {
        errorLogger.error({
            endpoint: "getProductById",
            method: "GET",
            error: error
        });
    }
}

export const saveProduct = (req :Request, res :Response) => {
    try {
        const productManager :DbClient|null = createManager(MANAGERTYPE.PRODUCTS);
        productManager?.save(req.body).then((product :Product|null) => {
            let productDTO = new ProductDTO(product);
            res.send({
                success: true,
                message: "Product saved successfully",
                data: productDTO || null
            });
            infoLogger.info({
                endpoint: "saveProduct",
                method: "POST",
                body: req.body,
            });
        })
    } catch (error) {
        errorLogger.error({
            endpoint: "saveProduct",
            method: "POST",
            body: req.body,
            error: error,
        });
    }
}

export const editProduct = (req :Request, res :Response) => {
    try {
        const productManager :DbClient|null = createManager(MANAGERTYPE.PRODUCTS);
        let {id} = req.params;
        productManager?.update(id, req.body).then((product :Product) => {
            let productDTO = new ProductDTO(product);
            res.send({
                success: true,
                message: "Product updated successfully",
                data: productDTO || null
            });
            infoLogger.info({
                endpoint: "editProduct",
                method: "PUT",
                body: req.body
            });
        })
    } catch (error) {
        errorLogger.error({
            endpoint: "editProduct",
            method: "PUT",
            body: req.body,
            error: error,
        });
    }
}

export const deleteProduct = (req :Request, res :Response) => {
    try {
        const productManager :DbClient|null = createManager(MANAGERTYPE.PRODUCTS);
        let {id} = req.params;
        productManager?.delete(id).then((product :Product|null) => {
            let productDTO = new ProductDTO(product);
            res.send({
                success: true,
                message: "Product deleted successfully",
                data: productDTO || null
            });
            infoLogger.info({
                endpoint: "deleteProduct",
                method: "DELETE",
                id: id
            });
        });
    } catch (error) {
        errorLogger.error({
            endpoint: "deleteProduct",
            method: "DELETE",
            error: error
        });
    }
}



