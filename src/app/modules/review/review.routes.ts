import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
const router = Router();

router.post(
  '/',
  auth('user'),
  ValidateRequest(ReviewValidation.ReviewPOSTValidation),
  ReviewControllers.ReviewPOST,
);

export const ReviewRouter = router;
