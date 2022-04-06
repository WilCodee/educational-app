import { IAdmin } from "./IAdmin";
import { ISeller } from "./ISeller";
import { IStudent } from "./IStudent";
import { ITeacher } from "./ITeacher";

export interface IUser {
    _id?: string; //este id debe ser el mismo en las colecciones de Admin, Student, Teacher y Seller
    email: string; 
    password: string; 
    profile: IAdmin | IStudent | ITeacher | ISeller;
    isAdmin: boolean;
    isStudent: boolean;
    isTeacher: boolean; 
    isSeller: boolean; 
}