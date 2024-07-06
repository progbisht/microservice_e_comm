import { CreateRepositoryType } from "../types/repository.types"
import * as Repository from "../repository/cart.repository"

import { CreateCart } from "./cart.service"

describe('Cart Service', () => {

    let repo: CreateRepositoryType

    beforeEach(() => {
        repo = Repository.CartRepository
    })

    afterEach(() => {
        repo = {} as CreateRepositoryType
    })

    it("should return correct data while creating cart", async() => {

        const mockCart = {
            title: "phone",
            price: 60000
        }

        jest.spyOn(Repository.CartRepository, 'create').mockImplementationOnce(
            () => Promise.resolve({
                input: mockCart
            })
        )

        const res = await CreateCart(mockCart, repo)

        expect(res).toEqual({
            input: mockCart
        })
    })


})