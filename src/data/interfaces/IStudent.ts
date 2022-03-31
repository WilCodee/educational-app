import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber";
import { IRepresentative } from "./IRepresentative";

export interface IStudent {
    _id: string;
    fullName: IFullName;
    ci: string; 
    age:number; 
    phoneNumber: IPhoneNumber;
    representantive: IRepresentative; 
    bloodType: string; 
    admissionDate: Date;
    photo: string; 
    createdAt: Date;
    updatedAt?: Date;  
}