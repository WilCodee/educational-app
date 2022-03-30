import { IStudent } from "../interfaces/IStudent";

export const StudentsMocks:IStudent[] = [
    {
        _id: 'est-1', 
        email: 'estudiante1@mail.com', 
        password: '123123',
        fullName: {
            firstName:'Bart',
            lastName:'Simpson'
        },
        age:15, 
        phoneNumber: {
            prefix:'+593',
            number:'998158024'
        },
        representantive: {
            fullName:{
                firstName:'Homero',
                middleName:'J',
                lastName:'Simpson'
            },
            phoneNumber:{
                prefix:'+593',
                number:'998131024'
            }
        },
        bloodType: 'A+', 
        admissionDate: new Date(),
        photo: 'https://i.pinimg.com/1200x/f4/8c/61/f48c614b47276c83434f5981d0dcbec1.jpg',
        createdAt: new Date(), 
    },
    {
        _id: 'est-2', 
        email: 'estudiante2@mail.com', 
        password: '123123',
        fullName: {
            firstName:'Milhouse',
            lastName:'Van Houten'
        },
        age:15, 
        phoneNumber: {
            prefix:'+593',
            number:'998135024'
        },
        representantive: {
            fullName:{
                firstName:'Mister',
                lastName:'Van Houten'
            },
            phoneNumber:{
                prefix:'+593',
                number:'99855554'
            }
        },
        bloodType: 'O+', 
        admissionDate: new Date(),
        photo: 'https://pm1.narvii.com/6716/9c796559d3edc1f2bc7c7dfa1a2143cbdc4fef9a_hq.jpg',
        createdAt: new Date(), 
    }
]