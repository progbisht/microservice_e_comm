// Sevice Layer
// To expose the repository stuff or handles the use-case or business logic
// In service layer we have to be more specific with the operations whereas in Data access layer responsible for carrying out data operations

import { ICatalogRepository } from "../interface/catalogRepository";

export class CatalogService{
    
    // we don't want to expose our reposiotry to any of the outsider classes 
    private _repository: ICatalogRepository
    
    constructor(repository: ICatalogRepository){
        this._repository = repository
    }

    async createProdcut(input: any){

        const data = await this._repository.create(input)
        if(!data.id){
            throw new Error('unable to create product')
        }
        return data
    }

    async updateProduct(input: any){
        const data = await this._repository.update(input)

        if(!data.id){
            throw new Error('unable to update product')
        }

        // emit event to update record in elastic search

        return data
    }

    async deleteProduct(id: number){
        const data = await this._repository.delete(id)
        
        if(!data.id){
            throw new Error('unable to delete product')
        }

        // delete the record from elastic search
        return data
    }

    // insted of this database call we will fetch products from elastic search
    async getProducts(limit: number, offset: number){
        const data = await this._repository.find(limit, offset)

        console.log(data);

        if(!data.length){
            throw new Error('unable to get products')
        }

        return data
    }

    async getProduct(id: number){
        const data = this._repository.findOne(id)

        if(!data){
            throw new Error('unable to get product')
        }

        return data
    }
}