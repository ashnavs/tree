import { IImage,Image } from '../config/database/imageModel';
import mongoose from 'mongoose';

export const createImage = async (file: Express.Multer.File, userId: mongoose.Types.ObjectId): Promise<IImage> => {
  const imageData = {
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`,
    filename: file.originalname,
    uploadDate: new Date(),
    user: userId,
  };


  const image = new Image(imageData);
  return await image.save();
};
