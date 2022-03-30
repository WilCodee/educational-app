import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber"; 

export interface ISeller {
    _id: string; 
    fullName: IFullName; 
    phoneNumber: IPhoneNumber;
    createdAt: Date; 
    updatedAt?: Date; 
}