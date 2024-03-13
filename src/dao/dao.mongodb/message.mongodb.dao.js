import MessageDAO from '../message.dao.js';
import MessageModel from '../../models/message.model.js';

export default class MessageMongoDbDAO extends MessageDAO {
    get(filter = {}, opts = {}) {
        return MessageModel.find(filter, null, opts);
    }

    create(data) {
        return MessageModel.create(data);
    }

    getById(mid) {
        return MessageModel.findById(mid);
    }

    updateById(mid, data) {
        return MessageModel.updateOne({ _id: mid }, { $set: data });
    }

    deleteById(mid) {
        return MessageModel.deleteOne({ _id: mid });
    }
}
