/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import crypto from 'crypto';
import getCart from '../../helpers/shoppingCart';
import helpers from '../../helpers/util';
import db, {
  sequelize
} from '../../models';
import e from 'express';

const {
  ShoppingCart,
  Product
} = db;
const {
  errorResponse,
  validateCartDetails,
  validateItemCartDetails
} = helpers;


/**
 *
 *
 * @export
 * @class ShoppingCartController
 * @description Operations on Products
 */
export default class ShoppingCartController {
  /**
   * @description -This method generates a unique id
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - unique id
   */
  static async generateUniqueId(req, res) {
    try {
      const uniqueId = await crypto.randomBytes(16).toString('hex');
      if (uniqueId) {
        return res.status(200).json({
          cart_id: uniqueId
        });
      }
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  static async addWishlistToCart(req, res) {
    try {
      const {
        customer_id: customerId
      } = req.user;

      const cartQuery = 'CALL cart_get_user_cart(:customerId)';
      const carts = await db.sequelize.query(cartQuery, {
        replacements: {
          customerId
        }
      });

      let cartId;
      if (carts.length > 0) {
        cartId = carts[0].cart_id;
      } else {
        cartId = await crypto.randomBytes(16).toString('hex');

        const insertQuery = 'CALL cart_insert_user_cart(:customerId,:cartId)';
        await db.sequelize.query(insertQuery, {
          replacements: {
            customerId,
            cartId
          }
        });

      }

      const wishlistQuery = 'CALL catalog_get_all_products_in_wishlist(:customerId)';
      const wishlist = await db.sequelize.query(wishlistQuery, {
        replacements: {
          customerId
        }
      });

      if (!wishlist || wishlist.length == 0) {
        return errorResponse(res, 400, 'CARD_01', "No items in your wishlist", "");
      } else {
        wishlist.forEach(async product => {
          const existingCart = await ShoppingCart.findOne({
            where: {
              cart_id: cartId,
              product_id: product.product_id
            },
          });
          if (!existingCart) {
            await ShoppingCart.create({
              cart_id: cartId,
              product_id: product.product_id,
              quantity: 1,
              added_on: Date.now(),
            });
          } else {
            const quantity = existingCart.quantity + 1;
            await existingCart.update({
              cart_id: cartId,
              product_id: product.product_id,
              quantity,
            });
          }
        });
        const cartItems = await ShoppingCart.findAll({
          where: {
            cart_id: cartId
          },
          include: [{
            model: Product,
          }]
        });
        res.status(200).json({
          "message": "Đã thêm toàn bộ sản phẩm vào giỏ hàng"
        });
      }
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error =' + error
      });
    }
  }

  /**
   * @description -This method adds a  product to cart
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {array} - adds a product to cart
   */
  static async addProductToCart(req, res) {
    try {
      const {
        product_id: productId
      } = req.body;
      const {
        customer_id: customerId
      } = req.user;
      const {
        error
      } = validateCartDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'PRD_01', errorMessage, errorField);
      }

      const query = 'CALL cart_get_user_cart(:customerId)';
      const carts = await db.sequelize.query(query, {
        replacements: {
          customerId
        }
      });

      let cartId;
      if (carts.length > 0) {
        cartId = carts[0].cart_id;
      } else {
        cartId = await crypto.randomBytes(16).toString('hex');

        const insertQuery = 'CALL cart_insert_user_cart(:customerId,:cartId)';
        await db.sequelize.query(insertQuery, {
          replacements: {
            customerId,
            cartId
          }
        });

      }

      const product = await Product.findOne({
        where: {
          product_id: productId
        },
      });
      if (product) {
        const existingCart = await ShoppingCart.findOne({
          where: {
            cart_id: cartId,
            product_id: productId
          },
        });
        if (!existingCart) {
          await ShoppingCart.create({
            cart_id: cartId,
            product_id: productId,
            quantity: 1,
            added_on: Date.now(),
          });
        } else {
          const quantity = existingCart.quantity + 1;
          await existingCart.update({
            cart_id: cartId,
            product_id: productId,
            quantity,
          });
        }
        const cartItems = await ShoppingCart.findAll({
          where: {
            cart_id: cartId
          },
          include: [{
            model: Product,
          }]
        });
        const shoppingCartItems = getCart(cartItems);
        res.status(200).json(shoppingCartItems);
      } else {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Product cannot be found',
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error =' + error
      });
    }
  }

  /**
   * @description -This method gets products in cart
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {array} - cart products
   */
  static async getProductsInCart(req, res) {
    try {
      const {
        customer_id: customerId
      } = req.user;

      const query = 'CALL cart_get_user_cart(:customerId)';
      const carts = await db.sequelize.query(query, {
        replacements: {
          customerId
        }
      });

      let cartId;
      if (carts.length > 0) {
        cartId = carts[0].cart_id;
        const cartItems = await ShoppingCart.findAll({
          attributes: {
            include: [
              [
                db.sequelize.literal(`(
                  SELECT COUNT(*) 
                  FROM product_wishlist AS pw 
                  WHERE 
                    pw.customer_id = ${customerId} 
                    AND 
                    pw.product_id = ShoppingCart.product_id
                  )`),
                'wishlist',
              ],
              [
                db.sequelize.literal(`(
                  SELECT p.image
                  FROM product AS p 
                  WHERE 
                    p.product_id = ShoppingCart.product_id
                  )`),
                'image',
              ]
            ]
          },
          where: {
            cart_id: cartId
          },
          include: [{
            model: Product
          }]
        });
        if (cartItems.length > 0) {
          const shoppingCartItems = getCart(cartItems);
          return res.status(200).json({
            "cart_id": cartId,
            "products": shoppingCartItems
          });
        } else {
          return res.status(200).json({
            "cart_id": cartId,
            "products": []
          });
        }
      } else {
        return res.status(200).json({
          "cart_id": "",
          "products": []
        });
      }


    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }


  /**
   * @description -This method clears the cart
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {array} - empty cart
   */
  static async emptyCart(req, res) {
    try {
      const {
        customer_id: customerId
      } = req.user;
      const query = 'CALL cart_get_user_cart(:customerId)';
      const carts = await db.sequelize.query(query, {
        replacements: {
          customerId
        }
      });

      if (carts.length > 0) {
        const cartId = carts[0].cart_id;
        const customerId = carts[0].customer_id;

        const emptyQuery = 'CALL shopping_cart_empty(:customerId,:cartId)';
        await db.sequelize.query(emptyQuery, {
          replacements: {
            customerId,
            cartId
          }
        });
      }
      res.status(200).json({
        "message": "Đã làm trống giỏ hàng của bạn"
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + e
      });
    }
  }

  static async changeProductQuantityInCart(req, res) {
    try {
      const {
        item_id: itemId,
        quantity
      } = req.body;
      const {
        customer_id: customerId
      } = req.user;
      const {
        error
      } = validateItemCartDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'PRD_01', errorMessage, errorField);
      }

      const item = await ShoppingCart.findOne({
        where: {
          item_id: itemId
        }
      });
      if (!item) {
        return errorResponse(res, 404, 'CART_01', 'No item found', 'item_id');
      }
      const query = `CALL cart_change_item_quantity(${itemId}, ${quantity});`;
      await db.sequelize.query(query);
      return res.status(200).json({
        "message": "Đã thay đổi số lượng"
      });

    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error =' + error
      });
    }
  }

  /**
   * @description -This method removes an item from the cart
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {array} - empty cart
   */
  static async removeProduct(req, res) {
    try {
      const {
        item_id: itemId
      } = req.params;
      const {
        customer_id: customerId
      } = req.user;

      const item = await ShoppingCart.findOne({
        where: {
          item_id: itemId
        }
      });
      if (!item) {
        return errorResponse(res, 404, 'CART_01', 'No item found', 'item_id');
      }
      let cartId = item.cart_id;
      const query = `CALL shopping_cart_remove_product(${itemId});`;
      await db.sequelize.query(query);

      const cartItems = await ShoppingCart.findAll({
        where: {
          cart_id: cartId
        },
        include: [{
          model: Product
        }]
      });
      if (cartItems.length == 0) {
        const emptyQuery = 'CALL shopping_cart_empty(:customerId,:cartId)';
        await db.sequelize.query(emptyQuery, {
          replacements: {
            customerId,
            cartId
          }
        });
      }

      return res.status(200).json({
        "message": "Đã xóa item khỏi giỏ hàng của bạn!"
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }
}
