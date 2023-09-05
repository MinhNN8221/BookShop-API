import { Router } from 'express';
import ShoppingCartController from '../controllers/shoppingCartController';
import authenticate from '../../middlewares/authenticate';

const productRouter = Router();

productRouter.get('/generateUniqueId', ShoppingCartController.generateUniqueId);
productRouter.post('/add', authenticate, ShoppingCartController.addProductToCart);
productRouter.post('/add/wishlist', authenticate, ShoppingCartController.addWishlistToCart);
productRouter.get('/', authenticate, ShoppingCartController.getProductsInCart);
productRouter.delete('/empty', authenticate, ShoppingCartController.emptyCart);
productRouter.delete('/removeProduct/:item_id', authenticate, ShoppingCartController.removeProduct);
productRouter.post('/update', authenticate, ShoppingCartController.changeProductQuantityInCart);


export default productRouter;
