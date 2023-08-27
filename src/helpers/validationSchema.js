import Joi from '@hapi/joi';

const loginSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required()
};

const changePassSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  old_password: Joi.string().min(5).max(50).required(),
  new_password: Joi.string().min(5).max(50).required()
};

const forgotPassSchema = {
  email: Joi.string().min(5).max(100).required()
    .email()
}

const customerSchema = {
  name: Joi.string().min(1).max(50),
  mob_phone: Joi.string(),
  address: Joi.string(),
  gender: Joi.string(),
  date_of_birth: Joi.date(),
};

const registerSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required(),
  name: Joi.string().min(1).max(50).required()
};

const addressSchema = {
  address_1: Joi.string().required(),
  address_2: Joi.string(),
  city: Joi.string().required(),
  region: Joi.string().required(),
  postal_code: Joi.string().required(),
  country: Joi.string().required(),
  shipping_region_id: Joi.number().required(),
};

const shoppingCartSchema = {
  product_id: Joi.number().required(),

};

const shoppingItemCartSchema = {
  item_id: Joi.number().required(),
  quantity: Joi.number().min(1).required()
}

const orderSchema = {
  cart_id: Joi.required(),
  shipping_id: Joi.number().required(),
  address: Joi.string().required(),
  status: Joi.number(),
  reference: Joi.string(),
  auth_code: Joi.string(),
  comments: Joi.string(),
  shipped_on: Joi.date(),
  receiver_name: Joi.string().min(5).required(),
  receiver_phone: Joi.string().min(10).max(10).required(),
};

const wishlistSchema = {
  product_id: Joi.required(),

};

const cardSchema = {
  credit_card: Joi.string().required()
};

export default {
  loginSchema,
  cardSchema,
  orderSchema,
  changePassSchema,
  forgotPassSchema,
  wishlistSchema,
  shoppingCartSchema,
  shoppingItemCartSchema,
  addressSchema,
  registerSchema,
  customerSchema
};
