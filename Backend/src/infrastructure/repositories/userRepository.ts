import { Users, Iuser } from "../config/database/userModel";

export const createUser = async (userData: Iuser, hashedPassword:string): Promise<Iuser> => {
    try {
        const newUser = new Users({
            name: userData.name,
            email: userData.email,
            password:hashedPassword
        });
        console.log(newUser, "newuser");

        const savedUser = await newUser.save();
        console.log(savedUser, "savedUser");

        return savedUser;
    } catch (error:any) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user: " + error.message);
    }
};

export const getUserByEmail = async (email:string)=> {
    return await Users.findOne({email:email})
}


