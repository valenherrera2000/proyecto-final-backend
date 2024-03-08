import { productRepository } from '../repositories/index.js';

export default class ProductService {
    static get(filter = {}, opts = {}) {
        return productRepository.get(filter, opts);
    }

    static getRaw(filter = {}, opts = {}) {
        return productRepository.getRaw(filter, opts);
    }

    static async getById(pid) {
        return productRepository.getById(pid);
    }

    static async create(data) {
        return productRepository.create(data);
    }

    static updateById(pid, data) {
        return productRepository.updateById(pid, data);
    }

    static deleteById(pid) {
        return productRepository.deleteById(pid);
    }
}
