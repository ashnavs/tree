import { Users,Iuser } from "../../infrastructure/config/database/userModel"
import { createUser,getUserByEmail } from "../../infrastructure/repositories/userRepository"
import { Encrypt } from "../helper/hashPasswords"

export default{
    registerUser:async(userData:Iuser) => {
        console.log(userData,"userData")
        try {
            const password  = userData.password as string
            const hashedPassword = await Encrypt.cryptPassword(password)
            const savedUser = await createUser(userData,hashedPassword)
            return savedUser
        } catch (error:any) {
            throw error
        }
    },
    loginUser: async (email: string, password: string) => {
        try {
            const existingUser = await getUserByEmail(email);
            console.log(existingUser, "exuser");
            if (!existingUser || !existingUser.password) {
                throw new Error('User not found');
            }
            const isValid = await Encrypt.comparePassword(password, existingUser.password);
            if (!isValid) {
                throw new Error("Invalid password");
            }
            return existingUser;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message); 
        }
    }
    
}