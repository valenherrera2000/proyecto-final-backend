import ProductDTO from '../dto/product.dto.js';

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}, opts = {}) {
        const products = await this.dao.get(filter, opts);
        return products.map(product => new ProductDTO(product));
    }

    getRaw(filter = {}, opts = {}) {
        return this.dao.get(filter, opts);
    }

    async getById(pid) {
        const product = await this.dao.getById(pid);
        return product ? new ProductDTO(product) : null;
    }

    async create(data) {
        const product = await this.dao.create(data);
        return new ProductDTO(product);
    }

    updateById(pid, data) {
        return this.dao.updateById(pid, data);
    }

    deleteById(pid) {
        return this.dao.deleteById(pid);
    }
}
