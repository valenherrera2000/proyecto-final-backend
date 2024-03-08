import config from '../config/config.js';

export let userDao;
export let productDao;
export let messageDao;
export let cartDao;

switch (config.persistenceType) {
  case 'mongodb':
    const UserMongoDbDao = (await import('./dao.mongodb/user.mongodb.dao.js')).default;
    userDao = new UserMongoDbDao();

    const ProductMongoDbDao = (await import('./dao.mongodb/product.mongodb.dao.js')).default;
    productDao = new ProductMongoDbDao();

    const MessageMongoDbDao = (await import('./dao.mongodb/message.mongodb.dao.js')).default;
    messageDao = new MessageMongoDbDao();

    const CartMongoDbDao = (await import('./dao.mongodb/cart.mongodb.dao.js')).default;
    cartDao = new CartMongoDbDao();
    break;
}
