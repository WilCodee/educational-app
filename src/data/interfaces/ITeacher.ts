import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber";

export interface ITeacher {
    email: string;
    password: string; 
    fullName: IFullName; 
    age:number;
    admissionDate: Date; 
    phoneNumber: IPhoneNumber;
    createdAt: Date;
    updatedAt: Date;  
}