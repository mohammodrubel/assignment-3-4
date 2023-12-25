import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

//  save course to db

const CoursePOST = catchAsync(async (req, res) => {
  const result = await CourseServices.CoursePOSTIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// get all course from db

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result,
  });
});

// update course by id

const updateACourse = catchAsync(async (req, res) => {
  const courseUpdatedData = req.body;
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(
    courseId,
    courseUpdatedData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

// get a course by id

const getASingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getACourseFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

// get the Best Course Based on Average Review (Rating)

const getBestCourseRating = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseBasedOnRatingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const CourseControllers = {
  CoursePOST,
  getAllCourses,
  updateACourse,
  getASingleCourse,
  getBestCourseRating,
};
