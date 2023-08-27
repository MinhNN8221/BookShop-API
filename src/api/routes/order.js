import { Router } from 'express';
import orderController from '../controllers/orderController';
import authenticate from '../../middlewares/authenticate';

const orderRouter = Router();

orderRouter.post('/', authenticate, orderController.createOrder);
orderRouter.get('/:orderId', authenticate, orderController.getOrderInfo);
orderRouter.get('/', authenticate, orderController.getMyOrders);

export default orderRouter;
