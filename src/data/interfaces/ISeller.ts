import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber"; 

export interface ISeller {
    fullName: IFullName; 
    phoneNumber: IPhoneNumber;
    createdAt: Date; 
    updatedAt?: Date; 
}