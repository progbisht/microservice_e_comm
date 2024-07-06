import express, { NextFunction, Request, Response } from "express"
import * as service from "../services/cart.service"
import * as repository from "../repository/cart.repository"
import { ValidateRequest } from "../utils/validator"
import { CartEditRequestInput, CartEditRequestSchema, CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto"


const router = express.Router()
const repo = repository.CartRepository

router.post(
    '/cart',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const error = ValidateRequest<CartRequestInput>(req.body as CartRequestInput, CartRequestSchema)

            if(error){
                return res.status(404).json({ error })
            }

            const response = await service.CreateCart(req.body, repo)
            return res.status(201).json(response)
            
        } catch (error) {
            return res.status(404).json({ error })
        }
    })
    

router.get(
    '/cart',
    async (req: Request, res: Response, next: NextFunction) => {
        const response = await service.GetCart(req.body, repo)
        return res.status(201).json(response)
    })


router.patch(
    '/cart',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const error = ValidateRequest<CartEditRequestInput>(req.body, CartEditRequestSchema)

            if(error){
                return res.status(404).json({ error })
            }
            const response = await service.UpdateCart(req.body, repo)
            return res.status(201).json(response)

        } catch (error) {
            return res.status(404).json({ error })

        }
    })


router.delete(
    '/cart',
    async (req: Request, res: Response, next: NextFunction) => {
        const response = await service.DeleteCart(req.body, repo)
        return res.status(201).json(response)
    })



export default router