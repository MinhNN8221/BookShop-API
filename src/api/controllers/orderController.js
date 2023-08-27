/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import helpers from '../../helpers/util';
import orderEmail from '../../helpers/emails';

import db from '../../models';

const {
  errorResponse,
  validateOrderDetails,
} = helpers;


/**
 *
 *
 * @export
 * @class OrderController
 * @description Operations on Orders
 */
export default class OrderController {
  /**
    * @description -This method creates an order
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - order id
    */
  static async createOrder(req, res) {
    try {
      const {
        cart_id: cartId,
        shipping_id: shippingId,
        address,
        receiver_name: receiverName,
        receiver_phone: receiverPhone
      } = req.body;
      const { customer_id: customerId } = req.user;

      const { error } = validateOrderDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
      }
      const createOrderQuery = 'CALL shopping_cart_create_order(:cartId,:customerId,:shippingId,:address,:receiverName,:receiverPhone)';
      const order = await db.sequelize.query(createOrderQuery, {
        replacements: {
          cartId, customerId, shippingId, address, receiverName, receiverPhone
        }
      });
      const orderDetailsquery = `CALL orders_get_order_info(${order[0].orderId})`;
      const orderDetails = await db.sequelize.query(orderDetailsquery);
      await orderEmail(req.user, orderDetails);
      return res.status(200).json({
        "message": "Đặt hàng thành công"
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error = ' + error });
    }
  }

  /**
      * @description -This gets details of an order
     * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - order
      */
  static async getOrderInfo(req, res) {
    try {
      const { orderId } = req.params;
      const { customer_id: customerId } = req.user;
      if (isNaN(orderId)) return errorResponse(res, 400, 'ORD_01', 'Order id must be a number', 'order id');
      const query = `CALL orders_get_order_info(${orderId})`;
      const order = await db.sequelize.query(query);
      var result;
      if (order.length > 0) {
        const detailQuery = `CALL orders_get_order_details(${orderId}, ${customerId})`;
        const products = await db.sequelize.query(detailQuery);
        
        result = order[0]
        Object.assign(result, {
          "products": products
        })

      } else {
        result = {}
      }
      
      if (order.length > 0) return res.status(200).json(result);
      return errorResponse(res, 404, 'ORD_01', 'Order Not found', 'order');
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMyOrders(req, res) {
    try {
      const { customer_id: customerId } = req.user;
      const { page, limit = 20 } = req.query;
      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL orders_get_all(:customerId,:limit,:startIndex)';
      const orders = await db.sequelize.query(query, {
          replacements: {
              customerId, limit, startIndex
          }
      });
      const count = orders.length;
      return res.status(200).json({ count, "orders": orders });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error e = ' + error });
  }
  }
}
