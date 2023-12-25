import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../registration/registration_user_interface"
import { User } from "../registration/registration_user_model"
import { TchangePassword } from "./change_password.Interface"
import bcrypt from 'bcrypt';

const changePasswordFromDb = async(userData:TUser,updateData:TchangePassword)=>{
        const user = await User.findOne({email:userData.email})
        const isPasswordCorrect = await bcrypt.compare(updateData.currentPassword,user?.password);
        if (!isPasswordCorrect) {
            throw new AppError(httpStatus.UNAUTHORIZED,'Incorrect current password');
        }
        // Hash the new password
        const slatRound = 12;
        const updatedPassword = await bcrypt.hash(updateData.newPassword, slatRound);
        // Update the password in the database
        const updatedUser = await User.findOneAndUpdate(
            { email: user?.email },
            { password: updatedPassword },
            { new: true } 
        );
        return updatedUser
        
    };

export const ChangePasswordService = {
    changePasswordFromDb
}