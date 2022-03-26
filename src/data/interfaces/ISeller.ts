import { IFullName } from "./IFullName";
import { IPhoneNumber } from "./IPhoneNumber"; 

export interface ISeller {
    email:string;
    password:string; 
    fullName: IFullName; 
    phoneNumber: IPhoneNumber; 
}