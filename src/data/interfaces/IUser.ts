export interface IUser {
    _id: string; //este id debe ser el mismo en las colecciones de Admin, Student, Teacher y Seller
    email: string; 
    password: string; 
    isAdmin: boolean;
    isStudent: boolean;
    isTeacher: boolean; 
    isSeller: boolean; 
}