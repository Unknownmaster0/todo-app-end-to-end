import { Router } from 'express';
import { signup } from '../controllers/signup.controller';
import { signin } from '../controllers/signin.controller';
import { getAllTodos } from '../controllers/getAllTodos.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addTodo } from '../controllers/addTodo.controller';
import { updateTodo } from '../controllers/updateTodo.controller';

const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/addTodo').post(authMiddleware, addTodo);
router.route('/getAllTodos').get(authMiddleware, getAllTodos);
router.route('/updateTodo/:id').post(authMiddleware, updateTodo);

export default router;
