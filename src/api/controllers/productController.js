/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import {
  Op
} from 'sequelize';
import helpers from '../../helpers/util';
import db from '../../models';

const {
  Product
} = db;


const {
  errorResponse,
  truncateDescription
} = helpers;


/**
 *
 *
 * @export
 * @class ProductController
 * @description Operations on Products
 */
export default class ProductController {

  static async getProductRecommendation(req, res) {
    try {
      const query = 'CALL catalog_get_product_recommendation()';
      const products = await db.sequelize.query(query);
      const count = products.length;
      return res.status(200).json({
        count,
        "products": products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  static async getHotProducts(req, res) {
    try {
      const query = 'CALL catalog_get_hot_products()';
      const products = await db.sequelize.query(query);
      const count = products.length;
      return res.status(200).json({
        count,
        "products": products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  static async getNewProducts(req, res) {
    try {
      const query = 'CALL catalog_get_new_products()';
      const products = await db.sequelize.query(query);
      const count = products.length;
      return res.status(200).json({
        count,
        "products": products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * @description -This method returns all products
   * @param {object} req - The request payload
   * @param {object} res - The response payload sent back from the method
   * @returns {object} - number of total products
   */
  static async getAllProducts(req, res) {
    try {
      const {
        description_length: descriptionLength,
        limit,
        page
      } = req.query;
      const productsQuery = {
        limit: parseInt(limit) || 20,
        offset: (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0
      };
      let products = await Product.findAll(productsQuery);

      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const totalProducts = await Product.count();
      return res.status(200).json({
        count: totalProducts,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * @description -This method views a single product
   * @param {object} req - The request payload
   * @param {object} res - The response payload sent back from the method
   * @returns {object} - product
   */
  static async getSingleProduct(req, res) {
    try {
      const {
        product_id: productId
      } = req.params;
      const { customer_id: customerId } = req.user;
      if (isNaN(productId)) return errorResponse(res, 400, 'USR_01', 'Product id must be a number', 'product id');

      const query = 'CALL catalog_get_product_details(:productId,:customerId)';
      const products = await db.sequelize.query(query, {
        replacements: {
          productId, customerId
        }
      });

      let result;

      if (products.length > 0) {
        const product = products[0];

        const supplier = {
          "supplier_id": product.supplier_id,
          "suppler_name": product.supplier_name
        };
        const author = {
          "author_id": product.author_id,
          "author_name": product.author_name
        }


        delete product.author_id;
        delete product.author_name;
        delete product.supplier_id;
        delete product.supplier_name;

        result = {
          "product": product,
          "supplier": supplier,
          "author": author
        }
      } else {
        result = {
          "product": {},
          "supplier": {},
          "author": {}
        }
      }

      if (result) return res.status(200).json(result);
      return errorResponse(res, 404, 'PRO_01', 'Product Not found', 'product');
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }

  /**
   * @description -This method search products
   * @param {object} req - The request payload
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - products
   */
  static async searchProducts(req, res) {
    try {
      const {
        page,
        limit,
        description_length: descriptionLength,
        query_string: queryString,
        filter_type: filterType,
        price_sort_order: priceSortOrder
      } = req.query;
      let fQueryString = queryString;
      if (!queryString) {
        fQueryString = "";
      }
      let query = {
        where: {
          [Op.or]: [{
            name: {
              [Op.like]: `%${fQueryString}%`
            },
          }, {
            description: {
              [Op.like]: `%${fQueryString}%`
            }
          }]
        },
      };

      //1: Mới nhất, 2: Bán chạy, 3: Giá
      let sortOrder;
      if (filterType == 1) {
        //Moi nhat
        sortOrder = [
          ['product_id', 'DESC']
        ]
      } else if (filterType == 2) {
        //Ban chay
        sortOrder = [
          ['product_id', 'ASC']
        ]
      } else if (filterType == 3) {
        let so = priceSortOrder;
        if (!so) {
          so = 'asc';
        }
        
        if (so == 'asc') {
          sortOrder = [
            ['discounted_price', 'ASC']
          ]
        } else {
          sortOrder = [
            ['discounted_price', 'DESC']
          ]
        }
      }
      
      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      if (sortOrder) {
        query.order = sortOrder;
      }
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error = ' + error 
      });
    }
  }


  static async getAuthorProducts(req, res) {
    try {
      const {
        author_id: authorId,
        page,
        limit,
        description_length: descriptionLength
      } = req.query;
      if (!authorId) {
        return errorResponse(res, 400, 'USR_01', 'Author Id is required', 'author_id');
      }
      let query = {
        where: {
          author_id: {
            [Op.eq]: authorId
          }
        }
      };

      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }


  static async getSupplierProducts(req, res) {
    try {
      const {
        supplier_id: supplierId,
        page,
        limit,
        description_length: descriptionLength
      } = req.query;
      if (!supplierId) {
        return errorResponse(res, 400, 'USR_02', 'Supplier Id is required', 'supplier_id');
      }
      let query = {
        where: {
          supplier_id: {
            [Op.eq]: supplierId
          }
        }
      };

      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }

  static async searchAuthorProducts(req, res) {
    try {
      const {
        author_id: authorId,
        page,
        limit,
        description_length: descriptionLength,
        query_string: queryString
      } = req.query;
      if (!authorId) {
        return errorResponse(res, 400, 'USR_02', 'Author Id is required', 'author_id');
      }
      if (!queryString) {
        return errorResponse(res, 400, 'USR_01', 'Query string is required', 'query_string');
      }
      let query = {
        where: {
          [Op.and]: [
            {
              author_id: {
                [Op.eq]: authorId
              }
            },
            {
              [Op.or]: [{
                name: {
                  [Op.like]: `%${queryString}%`
                },
              }, {
                description: {
                  [Op.like]: `%${queryString}%`
                }
              }]
            }
          ]
          
        },
      };

      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }

  static async searchProductsInCategory(req, res) {
    try {
      const {
        category_id: categoryId,
        query_string: query_string,
        page,
        limit = 20,
        description_length: descriptionLength = 200
      } = req.query;

      if (!categoryId) {
        return errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id');
      }
      if (isNaN(categoryId)) return errorResponse(res, 400, 'USR_01', 'Category id must be a number', 'category id');
      
      let fQueryString = query_string;
      if (!fQueryString) {
        fQueryString = "";
      }

      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL catalog_search_products_in_category(:fQueryString,:categoryId,:descriptionLength,:limit,:startIndex)';
      const products = await db.sequelize.query(query, {
        replacements: {
          fQueryString,
          categoryId,
          descriptionLength,
          limit,
          startIndex
        }
      });
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  static async searchSupplierProducts(req, res) {
    try {
      const {
        supplier_id: supplierId,
        page,
        limit,
        description_length: descriptionLength,
        query_string: queryString,
      } = req.query;
      if (!supplierId) {
        return errorResponse(res, 400, 'USR_01', 'Supplier Id is required', 'supplier_id');
      }
      if (!queryString) {
        return errorResponse(res, 400, 'USR_01', 'Query string is required', 'query_string');
      }
      let query = {
        where: {
          [Op.and]: [
            {
              supplier_id: {
                [Op.eq]: supplierId
              }
            },
            {
              [Op.or]: [{
                name: {
                  [Op.like]: `%${queryString}%`
                },
              }, {
                description: {
                  [Op.like]: `%${queryString}%`
                }
              }]
            }
          ]
          
        },
      };

      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error e = ' + error
      });
    }
  }

  /**
   * @description -This method gets products in a category
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - products in category
   */
  static async getProductsInCategory(req, res) {
    try {
      const {
        categoryId
      } = req.params;
      if (!categoryId) {
        return errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id');
      }
      if (isNaN(categoryId)) return errorResponse(res, 400, 'USR_01', 'Category id must be a number', 'category id');
      const {
        page,
        limit = 20,
        description_length: descriptionLength = 200
      } = req.query;
      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL catalog_get_products_in_category(:categoryId,:descriptionLength,:limit,:startIndex)';
      const products = await db.sequelize.query(query, {
        replacements: {
          categoryId,
          descriptionLength,
          limit,
          startIndex
        }
      });
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * @description -This method gets products in a department
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - products in department
   */
  static async getProductsInDepartment(req, res) {
    try {
      const {
        departmentId
      } = req.params;
      if (!departmentId) {
        return errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id');
      }
      if (isNaN(departmentId)) return errorResponse(res, 400, 'USR_01', 'department id must be a number', 'department id');
      const {
        page,
        limit = 20,
        description_length: descriptionLength = 200
      } = req.query;
      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL catalog_get_products_on_department(:departmentId,:descriptionLength,:limit,:startIndex)';
      const products = await db.sequelize.query(query, {
        replacements: {
          departmentId,
          descriptionLength,
          limit,
          startIndex
        }
      });
      const count = products.length;
      return res.status(200).json({
        count,
        rows: products
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}