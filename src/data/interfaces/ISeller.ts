import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber"; 

export interface ISeller {
    _id: string; 
    email:string;
    password:string; 
    fullName: IFullName; 
    phoneNumber: IPhoneNumber;
}