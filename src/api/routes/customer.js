import { Router } from 'express';
import customerController from '../controllers/customerController';
import SocialAuthController from '../controllers/socialAuthController';
import authenticate from '../../middlewares/authenticate';
import multer from 'multer';
import path from 'path';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 2 MB
        files: 1,
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
});

const customerRouter = Router();

customerRouter.post('/', customerController.register);

customerRouter.post('/login', customerController.login);
customerRouter.post('/changePass', customerController.changePassword);
customerRouter.post('/forgotPass', customerController.forgotPassword);
customerRouter.put('/', authenticate, customerController.UpdateCustomer);
customerRouter.get('/', authenticate, customerController.getCustomer);
customerRouter.put('/address', authenticate, customerController.UpdateCustomerAddress);
customerRouter.put('/creditCard', authenticate, customerController.UpdateCreditCard);

customerRouter.post('/facebook', SocialAuthController.facebookAuth);
customerRouter.post('/update/avatar', authenticate, upload.single("image"), customerController.updateAvatar);

export default customerRouter;
