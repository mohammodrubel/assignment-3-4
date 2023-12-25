import { TUser } from "./registration_user_interface";
import { User } from "./registration_user_model";

const createUserToDb = async(payload:TUser)=>{
    const reuslt = await User.create(payload)
    return reuslt 
}


export const userService = {
    createUserToDb
}