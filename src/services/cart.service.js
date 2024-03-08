import { cartRepository } from '../repositories/index.js';

export default class CartService {
    static get(filter = {}, opts = {}) {
        return cartRepository.get(filter, opts);
    }

    static getRaw(filter = {}, opts = {}) {
        return cartRepository.getRaw(filter, opts);
    }

    static async getById(cartId) {
        return cartRepository.getById(cartId);
    }

    static async create(data) {
        return cartRepository.create(data);
    }

    static updateById(cartId, data) {
        return cartRepository.updateById(cartId, data);
    }

    static deleteById(cartId) {
        return cartRepository.deleteById(cartId);
    }
}
