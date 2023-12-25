import { CategoryServices } from './category.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// create category to db

const CategoryPOST = catchAsync(async (req, res) => {
  const result = await CategoryServices.CategoryPOSTIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

// get all categories from db

const getAllCategories = catchAsync(async (req, res) => {
  console.log(req.user)
  const result = await CategoryServices.getAllCategoriesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = { CategoryPOST, getAllCategories };
