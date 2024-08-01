import { NextFunction, Request, Response } from "express";
import adminInteractor from "../../domain/useCases/adminInteractor";
import { Image } from "../../infrastructure/config/database/imageModel";

export default{
    adminLogin: async (req: Request, res: Response) => {
        try {
          console.log(req.body);
          const { email, password } = req.body
          if (!email && !password) {
            throw new Error("user credentials not there")
          }
          const credentials = {
            email, password
          }
          console.log(credentials);
    
          const response = await adminInteractor.loginAdmin(credentials);
          console.log(response);
          res.status(200).json({ message: 'Login success', response })
    
    
    
        } catch (error: any) {
          console.error(error.message)
          res.status(500).json({ error: error.message })
        }
      },
      getUsers: async (req: Request, res: Response): Promise<void> => {
        try {
          const { page = 1, limit = 10 } = req.query;
          const users = await adminInteractor.getUsers(Number(page), Number(limit));
          res.status(200).json(users);
        } catch (error: any) {
          console.error(error.message);
          res.status(500).json({ error: error.message });
        }
      },
      getImages:async (req: Request, res: Response) => {
        try {

          const { userId } = req.params;
          console.log(userId,"uid")

          const images = await Image.find({ user: userId });
          console.log(images,"img")
      
          if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found for this user' });
          }

          res.json({ images });
        } catch (error) {
          console.error('Error fetching images:', error);
          res.status(500).json({ message: 'Server error' });
        }
    }
}