import { ISeller } from "./ISeller";

export interface IComplain{
    _id: string; 
    title: string; 
    description: string;
    status: string; 
    seller: string | ISeller; //seller id referencia
    createdAt: Date; 
    updatedAt?: Date;
}

const newComplainTosave:IComplain = {
    _id: '1',
    title:'t',
    description:'d',
    status: 'A',
    createdAt: new Date(),
    seller: 'seller-1'
}


//MONGO LOOKUP
const newComplainToget:IComplain = {
    _id: '1',
    title:'t',
    description:'d',
    status: 'A',
    createdAt: new Date(),
    seller: {
        _id: 'seller-1',
        email: 'seller@gmail.com',
        password: '123123', 
        fullName: {
            firstName:'A',
            lastName:'B'
        },
        phoneNumber: {
            prefix:'+593',
            number:'998131024'
        }
    }
}





