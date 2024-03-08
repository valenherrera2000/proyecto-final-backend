import CartDTO from '../dto/cart.dto.js';

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}, opts = {}) {
        const carts = await this.dao.get(filter, opts);
        return carts.map(cart => new CartDTO(cart));
    }

    getRaw(filter = {}, opts = {}) {
        return this.dao.get(filter, opts);
    }

    async getById(cartId) {
        const cart = await this.dao.getById(cartId);
        return cart ? new CartDTO(cart) : null;
    }

    async create(data) {
        const cart = await this.dao.create(data);
        return new CartDTO(cart);
    }

    updateById(cartId, data) {
        return this.dao.updateById(cartId, data);
    }

    deleteById(cartId) {
        return this.dao.deleteById(cartId);
    }
}
