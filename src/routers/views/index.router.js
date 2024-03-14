import { Router } from 'express';
import CartController from '../../controllers/cart.controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).render('index');
});


export default router;