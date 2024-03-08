import MessageDTO from '../dto/message.dto.js';

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}, opts = {}) {
        const messages = await this.dao.get(filter, opts);
        return messages.map(message => new MessageDTO(message));
    }

    getRaw(filter = {}, opts = {}) {
        return this.dao.get(filter, opts);
    }

    async getById(mid) {
        const message = await this.dao.getById(mid);
        return message ? new MessageDTO(message) : null;
    }

    async create(data) {
        const message = await this.dao.create(data);
        return new MessageDTO(message);
    }

    updateById(mid, data) {
        return this.dao.updateById(mid, data);
    }

    deleteById(mid) {
        return this.dao.deleteById(mid);
    }
}
