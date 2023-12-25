import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const ReviewPOST = catchAsync(async (req, res) => {
  const result = await ReviewServices.ReviewPOSTIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  ReviewPOST,
};
