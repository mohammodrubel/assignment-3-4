import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LoginService } from "./user_login_service";

const login = catchAsync(async(req,res)=>{
    const result = await LoginService.loginService(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successfully',
        data: result,
      });
})


export const loginController = {
    login 
}

