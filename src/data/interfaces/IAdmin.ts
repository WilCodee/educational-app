import { IFullName } from "./IFullName";

export interface IAdmin {
    _id: string; //este debe ser el mismo id desde la colección de usuario
    fullName: IFullName; 
}