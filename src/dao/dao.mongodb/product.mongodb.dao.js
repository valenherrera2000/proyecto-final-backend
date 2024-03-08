import ProductDAO from '../product.dao.js';
import ProductModel from '../../models/product.model.js';

export default class ProductMongoDbDAO extends ProductDAO {
    get(filter = {}, opts = {}) {
        return ProductModel.find(filter);
    }

    create(data) {
        return ProductModel.create(data);
    }

    getById(pid) {
        return ProductModel.findById(pid);
    }

    updateById(pid, data) {
        return ProductModel.updateOne({ _id: pid }, { $set: data });
    }

    deleteById(pid) {
        return ProductModel.deleteOne({ _id: pid });
    }
}
