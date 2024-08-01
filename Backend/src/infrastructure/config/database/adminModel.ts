import mongoose , { Document, Schema } from "mongoose";

export interface Iadmin extends Document{
    name?: string;
    email?: string;
    password?: string    
}

const AdminSchema: Schema = new Schema({
    name: { type:String , required: true },
    email: { type:String , required: true },
    password: { type:String , required: true }
});

export const Admin = mongoose.model<Iadmin>('Admin',AdminSchema)