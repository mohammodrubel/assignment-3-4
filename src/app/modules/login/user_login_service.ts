import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../registration/registration_user_model";
import { TLogin } from "./user_login_interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from "../../../config";

const loginService = async(payload:TLogin)=>{
    const isUserExist = await User.findOne({email:payload.email})
    console.log(isUserExist)
        // check email exist 
        if(!isUserExist){
            throw new AppError(httpStatus.NOT_FOUND, 'this user is not exist!')
        }
        // check password 
        const isPasswordMatched = await bcrypt.compare(payload.password,isUserExist.password)
        if(!isPasswordMatched){
            throw new AppError(httpStatus.FORBIDDEN,'password did not matched')
        }
        const user = {
            _id:isUserExist._id,
            username:isUserExist.username,
            email:isUserExist.email,
            role:isUserExist.role
        }
        // accessToken 
        const accessToken = jwt.sign(user,config.jwt_Access_Token as string,{
            expiresIn:'10d'
        })
        return {
            user,
            accessToken
        } 
}

export const LoginService = {
    loginService
}