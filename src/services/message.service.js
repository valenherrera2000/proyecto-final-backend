import { messageRepository } from '../repositories/index.js';

export default class MessageService {
    static get(filter = {}, opts = {}) {
        return messageRepository.get(filter, opts);
    }

    static getRaw(filter = {}, opts = {}) {
        return messageRepository.getRaw(filter, opts);
    }

    static async getById(mid) {
        return messageRepository.getById(mid);
    }

    static async create(data) {
        return messageRepository.create(data);
    }

    static updateById(mid, data) {
        return messageRepository.updateById(mid, data);
    }

    static deleteById(mid) {
        return messageRepository.deleteById(mid);
    }
}
