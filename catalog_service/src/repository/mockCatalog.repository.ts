import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        } as Product

        return Promise.resolve(mockProduct)
    }
    update(data: Product): Promise<Product> {
        // throw new Error("Method not implemented.");
        return Promise.resolve(data as unknown as Product)
    }
    delete(id: any) {
        return Promise.resolve(id)
    }
    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([])
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({} as unknown as Product)
    }
    
}