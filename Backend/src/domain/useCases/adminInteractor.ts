import { findAdmin } from "../../infrastructure/repositories/adminRepository"
import { Iuser } from "../../infrastructure/config/database/userModel";
import { getPaginatedUsers } from "../../infrastructure/repositories/adminRepository";


export interface PaginatedUsers {
    users: Iuser[];
    totalPages: number;
  }

export default{
    loginAdmin: async(cred:{email:string,password:string})  => {

        try {
            const admin = await findAdmin(cred.email)
            if(!admin){
                throw new Error('Admin not found')
            }
    
            if(cred.password !== admin.password){
                throw new Error('Incorrect password')
            }
    
            
            return admin
        } catch (error:any) {
            console.error(`Error: ${error.message}`);
            throw error;            
        }
    },
    getUsers: async (page: number, limit: number): Promise<PaginatedUsers> => {
        try {
          const users = await getPaginatedUsers(page, limit);
          return users;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
}