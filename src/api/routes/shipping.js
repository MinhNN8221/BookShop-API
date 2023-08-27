import { Router } from 'express';
import ShippingController from '../controllers/shippingController';

const shippingRouter = Router();

shippingRouter.get('/', ShippingController.getShippingRegions);


export default shippingRouter;
