import 'dotenv/config';
import helpers from '../../helpers/util';

import db from '../../models';

const {
    validateWishlistDetails,
    errorResponse,
} = helpers;

export default class WishListController {

    static async addWishlist(req, res) {
        try {
            const {
                product_id: productId,
            } = req.body;
            const { customer_id: customerId } = req.user;

            const { error } = validateWishlistDetails(req.body);
            if (error) {
                const errorField = error.details[0].context.key;
                const errorMessage = error.details[0].message;
                return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
            }
            const createWishlist = 'CALL wishlist_create(:productId,:customerId)';
            const wishlist = await db.sequelize.query(createWishlist, {
                replacements: {
                    productId, customerId
                }
            });
            return res.status(200).json({
                "message": "Đã thêm vào wishlist của bạn!"
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async removeWishlist(req, res) {
        try {
            const {
                product_id: productId
            } = req.params;
            const { customer_id: customerId } = req.user;

            const { error } = validateWishlistDetails(req.params);
            if (error) {
                const errorField = error.details[0].context.key;
                const errorMessage = error.details[0].message;
                return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
            }
            const removeWishlist = 'CALL wishlist_remove(:productId,:customerId)';
            const wishlist = await db.sequelize.query(removeWishlist, {
                replacements: {
                    productId, customerId
                }
            });
            return res.status(200).json({
                "message": "Đã xóa khỏi wishlist của bạn!"
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getProductsInWishlist(req, res) {
        try {
            const { customer_id: customerId } = req.user;
            const { page, limit = 20, description_length: descriptionLength = 200 } = req.query;
            let startIndex = 0;
            if (page) startIndex = (page - 1) * limit;

            const query = 'CALL catalog_get_products_in_wishlist(:customerId,:descriptionLength,:limit,:startIndex)';
            const products = await db.sequelize.query(query, {
                replacements: {
                    customerId, descriptionLength, limit, startIndex
                }
            });
            const count = products.length;
            return res.status(200).json({ count, rows: products });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


}

