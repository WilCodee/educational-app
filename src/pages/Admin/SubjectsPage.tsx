import React, { useState } from 'react'
import { Table, Space, Button,Popconfirm } from 'antd';
//import { columns, data } from "../../Components/TableDefault";
import { CardTable } from 'src/Components/CardTable';
import { ModalDefault } from 'src/Components/ModalDefault';
import { SubjectForm } from 'src/Components/SubjectForm';

export const SubjectsPage = () => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoadign] = useState(false)



  const showModal = () => {
    setVisible(true)
  };

  const handleOk = () => {

    setLoadign(true)
    setTimeout(() => {
      setLoadign(false)
      setVisible(false)

    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '5',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'Descripcion',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Alumnos',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CardTable title='MATERIAS' AddText='MATERIA'>
        <div className='cardbody'>
          <h1 >MATERIAS</h1>
          <div>
            <Button className='buttonTable' type="primary">VER DETALLES</Button>
            <Button onClick={showModal} className='buttonTable' type="primary">EDITAR </Button>
            <Button className='buttonTable' type="primary">ELIMINAR</Button>
          </div>
        </div>

        <Table columns={columns} dataSource={data} />
      </CardTable>
     <ModalDefault ModalTitle="EDITAR MATERIA" visibleValue={visible} loading={loading} handleOk={handleOk} handleCancel={handleCancel}>
       <SubjectForm/>
     </ModalDefault>
     
     

    </>

  )
}
