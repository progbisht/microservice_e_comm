import { CartRequestInput } from "../dto/cartRequest.dto"
import { CreateRepositoryType } from "../types/repository.types"
import { logger, NotFoundError } from "../utils"
import { GetProductDetails } from "../utils/broker"

export const CreateCart = async (input: CartRequestInput, repo: CreateRepositoryType) => {
    // make a call to catalog microservice 
    // synchronized call 

    const product = await GetProductDetails(input.productId)

    logger.info(product)

    if(product.stock < input.qty){
        throw new NotFoundError("product is out of stock.")
    }

    // const data = await repo.create(input)
    return product
}

export const GetCart = async (input: any, repo: CreateRepositoryType) => {
    const data = await repo.find(input)
    return data
}

export const UpdateCart = async (input: any, repo: CreateRepositoryType) => {
    const data = await repo.update(input)
    return data
}

export const DeleteCart = async (input: any, repo: CreateRepositoryType) => {
    const data = await repo.delete(input)
    return data
}