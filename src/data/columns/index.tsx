import { IStudent } from "../interfaces/IStudent";
import { ITeacher } from "../interfaces/ITeacher";
import moment from 'moment';

export const StudentsColumns = [
  {
    title: 'Nombre',
    dataIndex: 'profile',
    key: 'firstName',
    render: (item: IStudent) => item.fullName.firstName
  },
  {
    title: 'Apellido',
    dataIndex: 'profile',
    key: 'lastName',
    render: (item: IStudent) => item.fullName.lastName
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
    render: (item: IStudent) => item.phoneNumber.prefix + "" + item.phoneNumber.number
  },
  {
    title: 'Fecha de ingreso',
    dataIndex: 'profile',
    key: 'admissionDate',
    render: (item: IStudent) => moment(item.admissionDate).format('L')
  }
]

export const TeachersColumns = [
  {
    title: 'Cédula',
    dataIndex: 'profile',
    key: 'ci',
    render: (item: any) => item.ci
  },
  {
    title: 'Nombre',
    dataIndex: 'profile',
    key: 'firstName',
    render: (item: ITeacher) => item.fullName.firstName
  },
  {
    title: 'Apellido',
    dataIndex: 'profile',
    key: 'lastName',
    render: (item: ITeacher) => item.fullName.lastName
  },
  {
    title: 'Area',
    dataIndex: 'profile',
    key: 'area',
    render: (item: any) => item.area
  },
  {
    title: 'Número de teléfono',
    dataIndex: 'profile',
    key: 'phoneNumber',
    render: (item: ITeacher) => item.phoneNumber.prefix + "" + item.phoneNumber.number
  }
]

export const CoursesColumns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Fecha de inicio',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (item: any) => moment(item).format('L')
  },
  {
    title: 'Fecha de finalización',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (item: any) => moment(item).format('L')
   
  }

]