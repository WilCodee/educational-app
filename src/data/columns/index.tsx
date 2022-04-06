import { IStudent } from "../interfaces/IStudent";

export const StudentsColumns = [
      {
        title: 'Nombre',
        dataIndex: 'profile',
        key: 'firstName',
        render: (item:IStudent) => item.fullName.firstName
      },
      {
        title: 'Apellido',
        dataIndex: 'profile',
        key: 'lastName',
        render: (item:IStudent) => item.fullName.lastName
      },
      {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Número de teléfono',
        dataIndex: 'profile',
        key: 'admissionDate',
        render: (item:IStudent) => item.phoneNumber.prefix + "" + item.phoneNumber.number
      },
      {
        title: 'Fecha de ingreso',
        dataIndex: 'profile',
        key: 'admissionDate',
        render: (item:IStudent) => item.admissionDate
      }
]