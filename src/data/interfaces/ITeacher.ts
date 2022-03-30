import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber";

export interface ITeacher {
    _id: string;
    ci: string;
    area: string;  
    fullName: IFullName; 
    age:number;
    admissionDate: Date; 
    phoneNumber: IPhoneNumber;
    createdAt: Date;
    updatedAt?: Date;  
}