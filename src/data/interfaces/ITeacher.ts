import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber";

export interface ITeacher {
    _id: string;
    email: string;
    password: string; 
    fullName: IFullName; 
    age:number;
    admissionDate: Date; 
    phoneNumber: IPhoneNumber;
    createdAt: Date;
    updatedAt?: Date;  
}