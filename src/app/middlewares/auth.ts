import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync"
import { NextFunction, Response,Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { TRole } from "../Global/userConstat";


const auth = (...requiredRole:TRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization
            if(!token){
                throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
            }
        jwt.verify(token,config.jwt_Access_Token as string,function(err,decoded){
            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED,'invalid web token')
            }
            const role = (decoded as JwtPayload)?.role 
            if(requiredRole && !requiredRole.includes(role)){
                throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
            }
            req.user = decoded as JwtPayload
            next()
        })
    })
}
export default auth