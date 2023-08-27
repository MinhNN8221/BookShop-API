import { Router } from 'express';
import productController from '../controllers/productController';
import authenticate from '../../middlewares/authenticate';


const productRouter = Router();

productRouter.get('/recommend', productController.getProductRecommendation);
productRouter.get('/hot', productController.getHotProducts);
productRouter.get('/new', productController.getNewProducts);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/incategory', productController.getProductsInCategory);
productRouter.get('/category/search', productController.searchProductsInCategory);
productRouter.get('/inDepartment', productController.getProductsInDepartment);
productRouter.get('/incategory/:categoryId', productController.getProductsInCategory);
productRouter.get('/inDepartment/:departmentId', productController.getProductsInDepartment);
productRouter.get('/search', productController.searchProducts);
productRouter.get('/supplier/search', productController.searchSupplierProducts);
productRouter.get('/supplier', productController.getSupplierProducts);
productRouter.get('/author/search', productController.searchAuthorProducts);
productRouter.get('/author', productController.getAuthorProducts);
productRouter.get('/:product_id', authenticate, productController.getSingleProduct);


export default productRouter;
