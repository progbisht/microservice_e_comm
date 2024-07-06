import express, { NextFunction, Request, Response } from "express"


const router = express.Router()

router.post('/order', (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
        message: "Create order"
    })
})

router.get('/order', (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
        message: "Create order"
    })
})

router.get('/order/:id', (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
        message: "Create order"
    })
})

router.delete('/order/:id', (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
        message: "Create order"
    })
})




export default router