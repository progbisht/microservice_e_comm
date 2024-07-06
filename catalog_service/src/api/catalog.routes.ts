// Presentation layer
// Expose everything to the outsiders or client

import express, { NextFunction, Request, Response, Router } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, updateProductRequest } from "../dto/product.dto";


const router = express.Router()

export const catalogService =  new CatalogService(new CatalogRepository())

router.post("/products", async(req: Request, res: Response, next: NextFunction) => {

    try {
        const { errors, input } = await RequestValidator(CreateProductRequest, req.body)
    
        if(errors){
            return res.status(400).json(errors)
        }
           
    
        const data = await catalogService.createProdcut(input)
    
        res.status(201).json(data)
    } catch (error) {
        const err = error as Error
        return res.status(500).json(err.message)
    }
})

router.patch('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {errors, input} = await RequestValidator(updateProductRequest, req.body)

        if(errors){
            return res.status(400).json(errors)
        }

        const id = parseInt(req.params.id) || 0

        const data = await catalogService.updateProduct({id, ...input})

        res.status(200).json(data)
    }
    catch(error){
        const err = error as Error
        return res.status(500).json(err.message)
    }
})


router.get('/products', async(req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"])
    const offset = Number(req.query["offset"])
    
    try {

        const data = await catalogService.getProducts(limit, offset)

        res.status(200).json(data)

    } catch (error) {
        const err = error as Error
        return res.status(500).json(err.message)
    }
})


router.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0

    try {

        const data = await catalogService.getProduct(id)

        return res.status(200).json(data)
        
    } catch (error) {
        const err = error as Error
        return res.status(500).json(err.message)
    }
})

router.delete('/products/:id', async(req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    
    try {
        
        const data = await catalogService.deleteProduct(id)

        res.status(200).json(data)

    } catch (error) {
        const err = error as Error
        return res.status(500).json(err)
    }
})

export default router