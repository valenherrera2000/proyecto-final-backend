import {
  userDao,
  productDao,
  cartDao,
  messageDao,
} from '../dao/factory.js';

import UserRepository from './user.repository.js';
import ProductRepository from './product.repository.js';
import CartRepository from './cart.repository.js';
import MessageRepository from './message.repository.js';

export const userRepository = new UserRepository(userDao);
export const productRepository = new ProductRepository(productDao);
export const cartRepository = new CartRepository(cartDao);
export const messageRepository = new MessageRepository(messageDao);
