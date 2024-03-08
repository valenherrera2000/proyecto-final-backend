import path from 'path';
import fs from 'fs';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import multer from 'multer';

import config from '../config/config.js';
import { InvalidDataException } from './exception.js';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const getFilterAndOpts = (query = {}) => {
  const { page, limit, sort, first_name, last_name, email } = query;
  const filter = {};
  const opts = { page, limit, sort };
  if (first_name) {
    Object.assign(filter, { first_name });
  }
  if (last_name) {
    Object.assign(filter, { last_name });
  }
  if (email) {
    Object.assign(filter, { email });
  }
  return { filter, opts };
};

export const createPasswordHash = (password) => bcrypt.hash(password, bcrypt.genSaltSync(10));

export const verifyPassword = (password, user) => bcrypt.compare(password, user.password);

export const createToken = (user, typeToken = 'auth') => {
  const {
    _id,
    first_name,
    last_name,
    email,
    role,
  } = user;

  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
    role,
    typeToken,
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: '30m' });
};

export const varifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (error, payload)  => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { params: { typeFile } } = req;
    let folderPath = null;
    switch (typeFile) {
      case 'avatar':
        folderPath = path.resolve(__dirname, '..', '..', 'public', 'images', 'avatares');
        break;
      case 'document':
        folderPath = path.resolve(__dirname, '..', '..', 'public', 'documents');
        break;
      default:
        return callback(new InvalidDataException('Invalid type file 😱'));
    }
    console.log('folderPath', folderPath);    
    fs.mkdirSync(folderPath, { recursive: true });
    callback(null, folderPath);
  },
  filename: (req, file, callback) => {
    const { user: { id } } = req;
    callback(null, `${id}_${file.originalname}`);
  },
});


export class CustomError {
  static createError({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(message);
    error.name = name;
    error.cause = cause;
    error.code = code;
    throw error;
  }
}

export const generatorCartError = (cart) => {
  return `Error in the cart. Details:
    - products: ${JSON.stringify(cart.products)}
  `;
};

export const generatorProductError = (product) => {
  return `Error in the product. Details:
    - title: ${product.title}
    - description: ${product.description}
    - price: ${product.price}
    - thumbnail: ${product.thumbnail}
    - code: ${product.code}
    - stock: ${product.stock}
  `;
};


export const uploader = multer({ storage });
