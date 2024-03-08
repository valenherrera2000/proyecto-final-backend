import MessageDAO from '../message.dao.js';
import MessageModel from '../../models/message.model.js';

export default class MessageMongoDbDao extends MessageDAO {
    async get(filter = {}, opts = {}) {
        try {
            return await MessageModel.find(filter, null, opts);
        } catch (error) {
            throw new Error(`Error while fetching messages: ${error.message}`);
        }
    }

    async create(data) {
        try {
            return await MessageModel.create(data);
        } catch (error) {
            throw new Error(`Error while creating message: ${error.message}`);
        }
    }

    async getById(mid) {
        try {
            return await MessageModel.findById(mid);
        } catch (error) {
            throw new Error(`Error while fetching message by ID: ${error.message}`);
        }
    }

    async updateById(mid, data) {
        try {
            return await MessageModel.updateOne({ _id: mid }, { $set: data });
        } catch (error) {
            throw new Error(`Error while updating message by ID: ${error.message}`);
        }
    }

    async deleteById(mid) {
        try {
            return await MessageModel.deleteOne({ _id: mid });
        } catch (error) {
            throw new Error(`Error while deleting message by ID: ${error.message}`);
        }
    }
}
