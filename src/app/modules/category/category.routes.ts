import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { ROLE } from '../../Global/userConstat';


const router = Router();

// create category to db

router.post(
  '/',
  auth('admin'),
  ValidateRequest(CategoryValidation.CategoryPOSTValidation),
  CategoryControllers.CategoryPOST,
);

// get all categories from db

router.get('/',auth(ROLE.ADMIN), CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
