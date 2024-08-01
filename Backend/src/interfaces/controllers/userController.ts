import { NextFunction, Request, Response } from "express";
import userInteractor from "../../domain/useCases/userInteractor";
import { uploadToS3 } from "../../domain/helper/s3Config";
import { Image, IImage } from "../../infrastructure/config/database/imageModel";

interface MulterRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    } | undefined;
}

export default {
    userSignup: async (req: Request, res: Response) => {
        try {
            const user = await userInteractor.registerUser(req.body);
            res.status(200).json({ message: "registration success", user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    userLogin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await userInteractor.loginUser(email, password);
            res.status(200).json({ message: 'Login success', user });
        } catch (error: any) {
            console.error("Controller error:", error.message);
            res.status(401).json({ message: error.message });
        }
    },
    imageUpload: async (req: MulterRequest, res: Response): Promise<void> => {
        try {
            if (!req.files) {
                res.status(400).send('No files uploaded.');
                return;
            }

            if (!req.body.userId) {
                res.status(400).send('User ID is missing.');
                return;
            }

            const fileArrays = Object.values(req.files).flat();
            console.log(fileArrays, "filearr");

            const imageUploadPromises = fileArrays.map(async (file) => {
                try {
                    const s3Result = await uploadToS3(file);
                    const newImage: IImage = new Image({
                        url: s3Result.Location,
                        filename: file.originalname,
                        uploadDate: new Date(),
                        user: req.body.userId,
                    });
                    return newImage.save();
                } catch (error) {
                    console.error(`Error processing file ${file.originalname}:`, error);
                    throw error;
                }
            });

            const savedImages = await Promise.all(imageUploadPromises);
            res.status(201).json(savedImages);
        } catch (error: any) {
            console.error('Error in image upload:', error);
            res.status(500).send(error.message);
        }
    }
};
