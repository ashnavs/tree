import { Admin } from "../config/database/adminModel";
import { Users,Iuser } from "../config/database/userModel";
export interface PaginatedUsers {
    users: Iuser[];
    totalPages: number;
  }
  

export const findAdmin = async (email: string) => {
    return await Admin.findOne({ email })
  };

  export const getPaginatedUsers = async (page: number, limit: number): Promise<PaginatedUsers> => {
    try {
      const users = await Users.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const totalUsers = await Users.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);
  
      return {
        users,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  