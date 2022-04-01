export const StudentsColumns = [
    {
        title: 'Nombre',
        dataIndex: 'profile',
        key: 'firstName',
        render: item => item.fullName.firstName
      },
      {
        title: 'Apellido',
        dataIndex: 'profile',
        key: 'lastName',
        render: item => item.fullName.lastName
      },
]