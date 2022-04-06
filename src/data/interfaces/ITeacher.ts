import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber";

export interface ITeacher {
    fullName: IFullName; 
    ci: string;
    area: string;  
    age:number;
    admissionDate: Date; 
    phoneNumber: IPhoneNumber;
    createdAt: Date;
    updatedAt?: Date;  
}