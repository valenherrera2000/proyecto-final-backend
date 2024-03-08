import MessageService from '../services/message.service.js';
import { getFilterAndOpts } from '../utils/utils.js';
import { NotFoundException } from '../utils/exception.js';

export default class MessageController {
    static get(query = {}) {
        const { filter, opts } = getFilterAndOpts(query);
        return MessageService.get(filter, opts);
    }

    static async create(data) {
        return MessageService.create(data);
    }

    static async getById(mid) {
        const message = await MessageService.getById(mid);
        if (!message) {
            throw new NotFoundException(`Message ${mid} not found 😱.`);
        }
        return message;
    }

    static updateById(mid, data) {
        return MessageService.updateById(mid, data);
    }

    static deleteById(mid) {
        return MessageService.deleteById(mid);
    }
}
