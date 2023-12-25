import { Router } from 'express';
import { CourseControllers } from './course.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';

const router = Router();

//  save course to db

router.post(
  '/',
  auth('admin'),
  ValidateRequest(CourseValidation.CoursePOSTValidation),
  CourseControllers.CoursePOST,
);

// get all course from db

router.get('/', CourseControllers.getAllCourses);

// update course by id

router.put(
  '/:courseId',
  auth('admin'),
  ValidateRequest(CourseValidation.CourseUPDATEValidation),
  CourseControllers.updateACourse,
);

// get a course by id

router.get('/:courseId/reviews', CourseControllers.getASingleCourse);

// get the Best Course Based on Average Review (Rating)

router.get('/best', CourseControllers.getBestCourseRating);

export const CourseRouter = router;
