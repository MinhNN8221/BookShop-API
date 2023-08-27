/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
import 'dotenv/config';
import { Shipping } from '../../models';
import helpers from '../../helpers/util';

const { errorResponse } = helpers;


/**
 * @export
 * @class ShippingController
 * @description Handles shipping regions related actions
 */
class ShippingController {
  /**
      * @description -This method gets all shipping regions
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - regions
      */
  static async getShippingRegions(req, res) {
    const regions = await Shipping.findAll();
    return res.status(200).json(regions);
  }
}

export default ShippingController;
