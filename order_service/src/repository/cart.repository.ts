import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CreateRepositoryType } from "../types/repository.types";

const createCart = async(input: any): Promise<{}> => {
    // connect to db
    const result = await DB.insert(carts).values({
        customerId: 123
    }).returning({
        cartId: carts.id
    })
    
    // perform db operations
    return Promise.resolve({
        input
    })
}
const getCart = async(input: any): Promise<{}> => {
    return Promise.resolve({})
}
const updateCart = async(input: any): Promise<{}> => {
    return Promise.resolve({})
}
const deleteCart = async(input: any): Promise<{}> => {
    return Promise.resolve({})
}

export const CartRepository: CreateRepositoryType = {
    create: createCart, 
    find: getCart,
    update: updateCart,
    delete: deleteCart,
}