import config from '../config/config.js';

export default class UserDto {
  constructor(data) {
    this.id = data._id || data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.birthdate = data.birthdate;
    this.avatar = data.avatar ? `${config.baseUrl}/images/avatars/${data.avatar}` : null;
    this.document = data.document ? `${config.baseUrl}/documents/${data.document}` : null;
    this.last_connection = data.last_connection;
    this.role = data.role;
  }
}