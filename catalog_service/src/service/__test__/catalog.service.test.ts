import { ICatalogRepository } from "../../interface/catalogRepository"
import { Product } from "../../models/product.model"
import { MockCatalogRepository } from "../../repository/mockCatalog.repository"
import { CatalogService } from "../catalog.service"
import { faker } from '@faker-js/faker'
import { ProductFactory } from "../../utils/fixtures"

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

// describe is useful in grouping test cases
describe('catalogService', () => { 

    let repository: ICatalogRepository

    beforeEach(() => {
        repository = new MockCatalogRepository()
    })

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    })

    describe('create product', () => {
        test('should create product', async () => {
            const service = new CatalogService(repository)

            // sending hardcoded data in order to make our test case dynamic we will use faker-js and rosie
            const reqBody = mockProduct({

            })
            const result = await service.createProdcut(reqBody)

            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            })
        })

        test('should throw error with message unable to create product', async() => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({

            })
            
            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve( {} as Product ))
            
            await expect(service.createProdcut(reqBody)).rejects.toThrow('unable to create product')

        })


        test('should throw error if a product already exist ', async() => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({

            })
            
            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.reject(Error('product already exist')))
            
            await expect(service.createProdcut(reqBody)).rejects.toThrow('product already exist')

        })
    })

    describe('update product', () => {
        test('should update product', async () => {
            const service = new CatalogService(repository)

            // sending hardcoded data in order to make our test case dynamic we will use faker-js and rosie
            const reqBody = mockProduct({
                id: faker.number.int({ min: 10, max: 1000 }),

            })

            const result = await service.updateProduct(reqBody)

            expect(result).toMatchObject(reqBody)
        })

        test('should throw error with message unable to update product', async() => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({

            })
            
            jest.spyOn(repository, 'update').mockImplementationOnce(() => Promise.resolve( {} as Product ))
            
            await expect(service.updateProduct(reqBody)).rejects.toThrow('unable to update product')

        })


        test('should throw error product does not exist ', async() => {
            const service = new CatalogService(repository)
                        
            jest.spyOn(repository, 'update').mockImplementationOnce(() => Promise.reject(Error('product does not exist')))
            
            await expect(service.updateProduct({})).rejects.toThrow('product does not exist')

        })
    })


    describe('get products', () => {

        test('should return the products by offset and limit', async() => {

            const service = new CatalogService(repository)
            const randomLimit = faker.number.int({ min:10, max:50 })

            const products = ProductFactory.buildList(randomLimit)

            jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.resolve(products))

            const result = await service.getProducts(randomLimit, 0)

            expect(result.length).toEqual(randomLimit)
            expect(result).toMatchObject(products)


        })

        test('should throw error product does not exist ', async() => {
            const service = new CatalogService(repository)

            jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.reject(Error('product does not exist')))
            
            await expect(service.getProducts(0, 0)).rejects.toThrow('product does not exist')

        })
    })


    describe('get product',() => {
        
        test('should return the products by id', async() => {

            const service = new CatalogService(repository)
            

            const product = ProductFactory.build()

            jest.spyOn(repository, 'findOne').mockImplementationOnce(() => Promise.resolve(product))

            const result = await service.getProduct(product.id!)

            expect(result).toMatchObject(product)


        })

        test('should throw error product does not exist ', async() => {
            const service = new CatalogService(repository)

            jest.spyOn(repository, 'findOne').mockImplementationOnce(() => Promise.reject(Error('product does not exist')))
            
            await expect(service.getProduct(0)).rejects.toThrow('product does not exist')

        })

    })
    
    
    describe('delete product',() => {
        test('should delete product by id', async() => {

            const service = new CatalogService(repository)

            const product = ProductFactory.build()

            jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.resolve({ id: product.id }))

            const result = await service.deleteProduct(product.id!)

            expect(result).toMatchObject({
                id: product.id
            })
        })

        test('should throw error with message unable to delete product', async() => {
            const service = new CatalogService(repository)            
            const product = ProductFactory.build()
            
            jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.resolve({  }))
            
            await expect(service.deleteProduct(product.id!)).rejects.toThrow('unable to delete product')

        })


        test('should throw error product does not exist ', async() => {
            const service = new CatalogService(repository)
                        
            jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.reject(Error('product does not exist')))
            
            await expect(service.deleteProduct(0)).rejects.toThrow('product does not exist')

        })
    })

})