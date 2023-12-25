import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChangePasswordService } from './change_password.service';


const createChangePassword = catchAsync(async (req, res) => {
    const userInformation = req.user 
    const updateInformation = req.body 
    const result = await ChangePasswordService.changePasswordFromDb(userInformation,updateInformation)
    console.log(result)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'password changeed successfully',
        data: result,
      });
});

export const changePasswordController = {
  createChangePassword,
};
