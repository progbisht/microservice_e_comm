"use strict";
// Sevice Layer
// To expose the repository stuff or handles the use-case or business logic
// In service layer we have to be more specific with the operations whereas in Data access layer responsible for carrying out data operations
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    constructor(repository) {
        this._repository = repository;
    }
    createProdcut(input) {
    }
    updateProduct(input) {
    }
    deleteProduct(id) {
    }
    getProducts(limit, offset) {
    }
    getProduct(id) {
    }
}
exports.CatalogService = CatalogService;
