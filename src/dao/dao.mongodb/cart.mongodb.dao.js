import CartDAO from '../cart.dao.js';
import CartModel from '../../models/cart.model.js';

export default class CartMongoDbDAO extends CartDAO {
    get(filter = {}, opts = {}) {
        return CartModel.find(filter);
    }

    create(data) {
        return CartModel.create(data);
    }

    getById(cartId) {
        return CartModel.findById(cartId);
    }

    updateById(cartId, data) {
        return CartModel.updateOne({ _id: cartId }, { $set: data });
    }

    deleteById(cartId) {
        return CartModel.deleteOne({ _id: cartId });
    }
}
