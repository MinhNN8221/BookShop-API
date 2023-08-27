import { Router } from 'express';
import authorController from '../controllers/authorController';
import authenticate from '../../middlewares/authenticate';

const authorRouter = Router();

authorRouter.get('/hot', authorController.getFamousAuthors);
authorRouter.get('/:author_id', authorController.getAuthorInfo);

export default authorRouter;