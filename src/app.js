import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import indexRouter from './routers/views/index.router.js';
import usersRouter from './routers/api/users.router.js';
import authRouter from './routers/api/auth.router.js';
import cartRouter from './routers/api/cart.router.js';
import productRouter from './routers/api/product.router.js';
import messageRouter from './routers/api/message.router.js';
import { __dirname } from './utils/utils.js';
import Exception from './utils/exception.js';
import { addLogger, logger } from './config/logger.config.js';

const app = express();

app.use(addLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'handlebars');

const specs = swaggerJsDoc({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce API',
      description: 'This is the documentation for our Ecommerce API.',
    },
  },
  apis: [path.join(__dirname, '..', 'docs', '**', '*.yaml')],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRouter);
app.use('/api', authRouter, usersRouter, cartRouter, productRouter, messageRouter);

app.use((error, req, res, next) => {
  const message = error instanceof Exception ?
    error.message :
    `An unknown error occurred 😨: ${error.message}`;
  logger.error(message);
  res.status(error.statusCode || 500).json({ status: 'error', message });
});

export default app;
