import { ISeller } from "../interfaces/ISeller";

export const SellersMocks:ISeller[] = [
    {
        email:'vendedor1@mail.com',
        password: '123123',
        fullName: {
            firstName: 'Pablo',
            lastName: 'Trujillo'
        },
        phoneNumber: {
            prefix:'+593',
            number:'998131024'
        }
    },
    {
        email:'vendedor2@mail.com',
        password: '123123',
        fullName: {
            firstName: 'Danny',
            lastName: 'Guañuna'
        },
        phoneNumber: {
            prefix:'+593',
            number:'998131024'
        }
    },
]