export interface IComplain{
    _id: string; 
    title: string; 
    description: string;
    seller: string; //seller id referencia
    createdAt: Date; 
    updatedAt?: Date;
}