import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./registration_user_service";

const createUserController = catchAsync(async (req,res)=>{
    const result = await userService.createUserToDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
      });
})

export const userController = {
    createUserController
}