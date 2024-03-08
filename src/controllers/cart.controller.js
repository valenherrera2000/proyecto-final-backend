import CartService from '../services/cart.service.js';
import { getFilterAndOpts } from '../utils/utils.js';
import { NotFoundException } from '../utils/exception.js';

export default class CartController {
    static get(query = {}) {
        const { filter, opts } = getFilterAndOpts(query);
        return CartService.get(filter, opts);
    }

    static async create(data) {
        return CartService.create(data);
    }

    static async getById(cartId) {
        const cart = await CartService.getById(cartId);
        if (!cart) {
            throw new NotFoundException(`Cart ${cartId} not found 😱.`);
        }
        return cart;
    }

    static updateById(cartId, data) {
        return CartService.updateById(cartId, data);
    }

    static deleteById(cartId) {
        return CartService.deleteById(cartId);
    }
}
