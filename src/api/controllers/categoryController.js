import 'dotenv/config';
import helpers from '../../helpers/util';
import {
    Op
} from 'sequelize';

import db from '../../models';

const {
    errorResponse,
} = helpers;

const {
    Category
} = db;

export default class CategoryController {
    static async getHotCategories(req, res) {
        try {
            const categoriesQuery = {
                limit: 8
            };
            let categories = await Category.findAll(categoriesQuery);

            const totalCategories= await Category.count();
            return res.status(200).json({
                count: totalCategories,
                rows: categories
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }

    static async getAllCategories(req, res) {
        try {
            const categoriesQuery = {
                
            };
            let categories = await Category.findAll(categoriesQuery);

            const totalCategories = await Category.count();
            return res.status(200).json({
                count: totalCategories,
                rows: categories
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
}