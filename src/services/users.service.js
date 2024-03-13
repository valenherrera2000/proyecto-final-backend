import { userRepository } from '../repositories/index.js';

export default class UsersService {
  static get(filter = {}, opts = {}) {
    return userRepository.get(filter, opts);
  }

  static getRaw(filter = {}, opts = {}) {
    return userRepository.getRaw(filter, opts);
  }

  static create(data) {
    return userRepository.create(data);
  }

  static getById(uid) {
    return userRepository.getById(uid);
  }

  static updateById(uid, data) {
    return userRepository.updateById(uid, data);
  }

  static async updateDocuments(uid, files) {
    const documents = files.map(file => ({
      name: file.originalname,
      reference: file.filename,
    }));

    return userRepository.updateById(uid, { documents });
  }
}