import { Customer } from '../../models';
import helpers from '../../helpers/util';
import sendNewPassword from '../../helpers/emails2';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

const {
  validateRegisterDetails,
  validateLoginDetails,
  validateChangePass,
  validateForgotPass,
  validateAddressDetails,
  validateCardDetails,
  validateCustomerDetails,
  hashPassword,
  createToken,
  errorResponse,
  comparePasswords
} = helpers;

/**
   * @export
   * @class CustomerController
   *  @description Performs operations on the customer
   */
class CustomerController {
  /**
    * @description -This method registers a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const { error } = validateRegisterDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.findByEmail(email);
      if (existingCustomer) return errorResponse(res, 409, 'USR_04', 'The email already exists.', 'email');

      const hashedPassword = await hashPassword(password);
      const customer = await Customer.create({
        name,
        email,
        password: hashedPassword,
      });
      await customer.reload();
      delete customer.dataValues.password;
      const token = createToken(customer);
      return res.status(200).json({
        accessToken: `Bearer ${token}`,
        customer,
        expires_in: '24h'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method logins a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const { error } = validateLoginDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.scope('withoutPassword').findByEmail(email);

      if (!existingCustomer) return errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email');
      const match = await comparePasswords(password, existingCustomer.dataValues.password);

      if (match) {
        const customer = existingCustomer.dataValues;
        delete existingCustomer.dataValues.password;
        const token = await createToken(customer);
        res.status(200).json({
          accessToken: `Bearer ${token}`,
          customer,
          expires_in: '15 days'
        });
      } else {
        return errorResponse(res, 400, 'USR_01', 'Email or Password is invalid.');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method returns details of  a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer
    */
  static async getCustomer(req, res) {
    try {
      const customer = await Customer.scope('withoutPassword').findOne({
        where: { customer_id: req.user.customer_id }
      });
      if (!customer) {
        return errorResponse(res, 404, 'USR_04', 'Customer does not exist.');
      }
      return res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method updates a customer's address
    * @param {object} req - The request payload
    * @param {object} res - The response payload
    * @returns {object} - customer
    */
  static async UpdateCustomerAddress(req, res) {
    try {
      const { error } = validateAddressDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_02', errorMessage, errorField);
      }
      const customer = await Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });
      if (!customer) {
        return errorResponse(res, 404, 'USR_04', 'Customer does not exist.');
      }
      const updatedCustomer = await customer.update(req.body);
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method updates a customer's credit card
    * @param {object} req - The request payload
    * @param {object} res - The response payload
    * @returns {object} - customer
    */
  static async UpdateCreditCard(req, res) {
    try {
      const { error } = validateCardDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_02', errorMessage, errorField);
      }
      const customer = await Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });
      if (!customer) {
        return errorResponse(res, 404, 'USR_04', 'Customer does not exist.');
      }
      const updatedCustomer = await customer.update(req.body);
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method updates a customer's personal details
    * @param {object} req - The request payload
    * @param {object} res - The response payload
    * @returns {object} - customer
    */
  static async UpdateCustomer(req, res) {
    try {
      const { error } = validateCustomerDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_02', errorMessage, errorField);
      }
      const customer = await Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });
      if (!customer) {
        return errorResponse(res, 404, 'USR_04', 'Customer does not exist.');
      }
      const updatedCustomer = await customer.update(req.body);
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const { error } = validateForgotPass(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.scope('withoutPassword').findByEmail(email);

      if (!existingCustomer) return errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email');
      
      const length = 8;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var newPass = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        newPass += charset.charAt(Math.floor(Math.random() * n));
      }

      
      const hashedPassword = await hashPassword(newPass);
      const updatedCustomer = await existingCustomer.update({
        password: hashedPassword
      });
      await sendNewPassword(email, newPass);
      return res.status(200).json({
        "message": "Đã gửi mật khẩu mới thông qua email của bạn!"
      });
      
      
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error error = ' + error });
    }
  }

  static async updateAvatar(req, res) {

    if (!req.file) {
      return errorResponse(res, 400, 'USR_05', 'File not found', 'image');
    }

    const customer = await Customer.scope('withoutPassword').findOne({ where: { customer_id: req.user.customer_id } });
    if (!customer) {
      return errorResponse(res, 404, 'USR_04', 'Customer does not exist.');
    }

    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        })

        streamifier.createReadStream(file.buffer).pipe(stream);
      })
    }

    try {
      const result = await uploadToCloudinary(req.file);

      const updatedCustomer = await customer.update({
        "avatar": result.secure_url
      });
      return res.status(200).json(updatedCustomer);
    } catch(e) {
      return res.status(500).json({ e: 'Internal Server Error error = ' + e });
    }

  }

  static async changePassword(req, res) {
    const { email, old_password, new_password } = req.body;
    try {
      const { error } = validateChangePass(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.scope('withoutPassword').findByEmail(email);

      if (!existingCustomer) return errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email');
      const match = await comparePasswords(old_password, existingCustomer.dataValues.password);

      if (match) {
        const hashedPassword = await hashPassword(new_password);

        const updatedCustomer = await existingCustomer.update({
          password: hashedPassword
        });

        delete updatedCustomer.dataValues.password;

        return res.status(200).json(updatedCustomer);

      } else {
        return errorResponse(res, 400, 'USR_01', 'Email or Password is invalid.');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error error = ' + error });
    }
  }
}

export default CustomerController;
