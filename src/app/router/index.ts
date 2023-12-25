import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.routes';
import { CourseRouter } from '../modules/course/course.routes';
import { ReviewRouter } from '../modules/review/review.routes';
import { UserRouter } from '../modules/registration/registration_user_router';

const router = Router();

const moduleRoutes = [
  {
    path: '/course',
    route: CourseRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRouter,
  },
  {
    path: '/auth',
    route: UserRouter,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
