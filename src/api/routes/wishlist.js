import { Router } from 'express';
import wishlistController from '../controllers/wishlistController';
import authenticate from '../../middlewares/authenticate';

const orderRouter = Router();

orderRouter.get('/', authenticate, wishlistController.getProductsInWishlist);
orderRouter.post('/add', authenticate, wishlistController.addWishlist);
orderRouter.delete('/remove/:product_id', authenticate, wishlistController.removeWishlist);

export default orderRouter;