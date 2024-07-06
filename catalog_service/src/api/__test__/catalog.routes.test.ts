import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes, {catalogService} from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express()

app.use(express.json())
app.use(catalogRoutes)

// reusable code snippet
const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min:10, max: 100 }),
        price: +faker.commerce.price(),

        // in case we wish to pass any field in arguement
        ...rest
    }
}


describe('Catalog Routes', () => {

    describe('POST /products', () => {

        test('should create product successfully', async () => {

            const reqBody = mockProduct({})

            const product = ProductFactory.build()

            jest.spyOn(catalogService, 'createProdcut').mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                                    .post('/products')
                                    .send(reqBody)
                                    .set('Accept', 'application/json')
            
            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)




        })
        
        test('should response with validation error', async () => {

            const reqBody = mockProduct({})
            
            const response = await request(app)
                                    .post('/products')
                                    .send({ ...reqBody, name: "" })
                                    .set('Accept', 'application/json')
            
            
            expect(response.status).toBe(400)
            expect(response.body).toEqual('name should not be empty')

        })
        
        
        test('should response with an internal error', async () => {

            const reqBody = mockProduct({})
            
            jest.spyOn(catalogService, 'createProdcut').mockImplementationOnce(() => Promise.reject(new Error('unable to create product')))

            const response = await request(app)
                                    .post('/products')
                                    .send(reqBody)
                                    .set('Accept', 'application/json')
            
            
            
            
            expect(response.status).toBe(500)
            expect(response.body).toEqual('unable to create product')

        })


    })

    describe('PATCH /products/:id', () => {

        test('should update product successfully', async () => {

            const product = ProductFactory.build()
            const reqBody = mockProduct({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            })


            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                                    .patch(`/products/${product.id}`)
                                    .send(reqBody)
                                    .set('Accept', 'application/json')
            
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)




        })
        
        test('should response with validation error', async () => {

            const product = ProductFactory.build()
            const reqBody = mockProduct({
                name: product.name,
                description: product.description,
                price: -1,
                stock: product.stock
            })
            
            const response = await request(app)
                                    .patch(`/products/${product.id}`)
                                    .send(reqBody)
                                    .set('Accept', 'application/json')
            
            
            expect(response.status).toBe(400)
            expect(response.body).toEqual('price must not be less than 1')

        })
        
        
        test('should response with an internal error', async () => {

            const product = ProductFactory.build()
            
            const reqBody = mockProduct({})
            
            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error('unable to update product')))

            const response = await request(app)
                                    .patch(`/products/${product.id}`)
                                    .send(reqBody)
                                    .set('Accept', 'application/json')
            
            
            
            
            expect(response.status).toBe(500)
            expect(response.body).toEqual('unable to update product')

        })


    })

    describe('GET /products?limit=0&offset=0', () => {

        test('should fetch the products successfully', async () => {

            const randomLimit = faker.number.int({ min:10, max: 100 })
            const products = ProductFactory.buildList(randomLimit)
            


            jest.spyOn(catalogService, 'getProducts').mockImplementationOnce(() => Promise.resolve(products))

            const response = await request(app)
                                    .get(`/products?limit=${randomLimit}&offset=0`)
                                    .set('Accept', 'application/json')
            
            expect(response.status).toBe(200)
            expect(response.body).toEqual(products)

        })
        
        // test('should response with validation error', async () => {

        //     const product = ProductFactory.build()
        //     const reqBody = mockProduct({
        //         name: product.name,
        //         description: product.description,
        //         price: -1,
        //         stock: product.stock
        //     })
            
        //     const response = await request(app)
        //                             .get(`/products/${product.id}`)
        //                             .send(reqBody)
        //                             .set('Accept', 'application/json')
            
            
        //     expect(response.status).toBe(400)
        //     expect(response.body).toEqual('price must not be less than 1')

        // })
        
        
        test('should response with an internal error', async () => {
           
            
            jest.spyOn(catalogService, 'getProducts').mockImplementationOnce(() => Promise.reject(new Error('unable to get products')))

            const response = await request(app)
                                    .get(`/products?limit=0&offset=0`)
                                    .set('Accept', 'application/json')
            
            
            expect(response.status).toBe(500)
            expect(response.body).toEqual('unable to get products')

        })


    })

    describe('GET /products/:id', () => {

        test('should fetch the product successfully', async () => {

            const product = ProductFactory.build()
    

            jest.spyOn(catalogService, 'getProduct').mockImplementationOnce(() => Promise.resolve(product))

            const response = await request(app)
                                    .get(`/products/${product.id}`)
                                    .set('Accept', 'application/json')

            console.log(response.body);
            
            
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)




        })
        
        // test('should response with validation error', async () => {

        //     const product = ProductFactory.build()
        //     const reqBody = mockProduct({
        //         name: product.name,
        //         description: product.description,
        //         price: -1,
        //         stock: product.stock
        //     })
            
        //     const response = await request(app)
        //                             .patch(`/products/${product.id}`)
        //                             .send(reqBody)
        //                             .set('Accept', 'application/json')
            
            
        //     expect(response.status).toBe(400)
        //     expect(response.body).toEqual('price must not be less than 1')

        // })
        
        
        test('should response with an internal error', async () => {

            const product = ProductFactory.build()
            
            jest.spyOn(catalogService, 'getProduct').mockImplementationOnce(() => Promise.reject(new Error('unable to get product')))

            const response = await request(app)
                                    .get(`/products/${product.id}`)
                                    .set('Accept', 'application/json')
            
            
            
            
            expect(response.status).toBe(500)
            expect(response.body).toEqual('unable to get product')

        })


    })


    describe('DELETE /products/:id', () => {

        test('should update product successfully', async () => {

            const product = ProductFactory.build()
            


            jest.spyOn(catalogService, 'deleteProduct').mockImplementationOnce(() => Promise.resolve({ id: product.id }))

            const response = await request(app)
                                    .delete(`/products/${product.id}`)
                                    .set('Accept', 'application/json')
            
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ id: product.id })




        })
        
        // test('should response with validation error', async () => {

        //     const product = ProductFactory.build()
        //     const reqBody = mockProduct({
        //         name: product.name,
        //         description: product.description,
        //         price: -1,
        //         stock: product.stock
        //     })
            
        //     const response = await request(app)
        //                             .patch(`/products/${product.id}`)
        //                             .send(reqBody)
        //                             .set('Accept', 'application/json')
            
            
        //     expect(response.status).toBe(400)
        //     expect(response.body).toEqual('price must not be less than 1')

        // })
        
        
        // test('should response with an internal error', async () => {

        //     const product = ProductFactory.build()
                        
        //     jest.spyOn(catalogService, 'deleteProduct').mockImplementationOnce(() => Promise.reject(new Error('unable to delete product')))

        //     const response = await request(app)
        //                             .delete(`/products/${product.id}`)
        //                             .set('Accept', 'application/json')
            
            
            
            
        //     expect(response.status).toBe(500)
        //     expect(response.body).toEqual('unable to delete product')

        // })


    })
})