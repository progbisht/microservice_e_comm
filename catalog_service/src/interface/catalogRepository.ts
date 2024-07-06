// In terms of TDD we need to test our business logic with the help of some kind of mock stuff which is going to be injected from somewhere else in such case interface is necessary to match with what kind of object we are going to pass

import { Product } from "../models/product.model"

export interface ICatalogRepository{
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: any);
    find(limit: number, offset: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
}