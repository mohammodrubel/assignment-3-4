import {z} from 'zod'

const changePasswordValidation = z.object({
    body:z.object({
        currentPassword:z.string(),
        newPassword:z.string()
    })
})


export default changePasswordValidation