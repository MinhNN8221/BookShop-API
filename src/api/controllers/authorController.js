import 'dotenv/config';
import helpers from '../../helpers/util';

import db from '../../models';

const {
    errorResponse,
} = helpers;

export default class AuthorController {
    static async getFamousAuthors(req, res) {
        try {
            const getFamousAuthors = 'CALL author_get_famous_author()';
            const authors = await db.sequelize.query(getFamousAuthors);
            return res.status(200).json({
                "authors": authors
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAuthorInfo(req, res) {
        try {
            const {
                author_id: authorId
              } = req.params;
            const getAuthorInfo = 'CALL author_get_info(:authorId)';
            const authors = await db.sequelize.query(getAuthorInfo, {
                replacements: {
                    authorId
                }
            });
            let result = {};
            if (authors.length > 0) {
                result = authors[0];
            }
            return res.status(200).json({
                "result": result
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}