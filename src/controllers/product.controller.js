import ProductService from '../services/product.service.js';
import { getFilterAndOpts } from '../utils/utils.js';
import { NotFoundException } from '../utils/exception.js';

export default class ProductController {
    static get(query = {}) {
        const { filter, opts } = getFilterAndOpts(query);
        return ProductService.get(filter, opts);
    }

    static async create(data) {
        return ProductService.create(data);
    }

    static async getById(pid) {
        const product = await ProductService.getById(pid);
        if (!product) {
            throw new NotFoundException(`Product ${pid} not found 😱.`);
        }
        return product;
    }

    static updateById(pid, data) {
        return ProductService.updateById(pid, data);
    }

    static deleteById(pid) {
        return ProductService.deleteById(pid);
    }
}
