import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import authenticate from '../../middlewares/authenticate';

const orderRouter = Router();

orderRouter.get('/hot', categoryController.getHotCategories);
orderRouter.get('/', categoryController.getAllCategories);

export default orderRouter;