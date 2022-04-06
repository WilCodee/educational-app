import React, { useContext, useEffect, useState } from 'react'
import { Table, Space, Button,Popconfirm, Card } from 'antd';
//import { columns, data } from "../../Components/TableDefault";
import { CardTable } from 'src/components/CardTable';
import { ModalDefault } from 'src/components/ModalDefault';
import { SubjectForm } from 'src/components/SubjectForm';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SubjectContext } from 'src/context/AuthContext/SubjectContext/SubjectContext';

export const SubjectsPage = () => {

  const [visible, setVisible] = useState(false)
  const [loading, setLoadign] = useState(false)
  const [selectedStudents, setSelectedStudents ] = useState([])
  const {subjects,readSubject,deleteSubject,createSubject} = useContext(SubjectContext)

  const [selectedKey, setSelectedKey] = useState('')
  useEffect(() => {
    readSubject(data)
  }, [])
  

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

  const handleDelete = () => {
    deleteSubject(selectedKey)
    console.log(subjects)
  };

  const handleAdd = () => {
    
    createSubject({
      name:'Danny',
      description:'Quito'  , 
    }) 


    console.log(subjects)
  };




  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedStudents(selectedRows);
      setSelectedKey(selectedRowKeys);
      console.log(selectedKey)
      console.log(selectedStudents)
      console.log(subjects)
    },
};

  const data = [
    {
      key: 1,
      name: 'John Brown',
      description: 'New York No. 1 Lake Park',
    },
    {
      key: 2,
      name: 'Jim Green',
      description: 'London No. 1 Lake Park',
    },
    {
      key: 3,
      name: 'Joe Black',
      description: 'Sidney No. 1 Lake Park',
    },
    {
      key: 4,
      name: 'John Brown',
      description: 'New York No. 1 Lake Park',
    },
    {
      key: 5,
      name: 'Jim Green',
      description: 'London No. 1 Lake Park',
    },
    {
      key: 6,
      name: 'Joe Black',
      description: 'Sidney No. 1 Lake Park',
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
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <>
      <CardTable title='MATERIAS' AddText='MATERIA'>
          
          <Card className='cardbody' >
            <Button icon={<EyeOutlined /> } onClick={handleAdd} className='buttonTable' type="primary" disabled={selectedStudents.length === 1 ? false : true } >VER DETALLES</Button>
            <Button icon={<EditOutlined />} onClick={showModal} className='buttonTable' type="primary" disabled={selectedStudents.length === 1 ? false : true }>EDITAR </Button>
            <Button icon={<DeleteOutlined />} onClick={handleDelete} className='buttonTable' type="primary" disabled={selectedStudents.length >= 1 ? false: true}>ELIMINAR</Button>
          </Card>
        <Table rowSelection={rowSelection} columns={columns} dataSource={subjects} />
      </CardTable>
     <ModalDefault ModalTitle="EDITAR MATERIA" visibleValue={visible} loading={loading} handleOk={handleOk} handleCancel={handleCancel} >
       <SubjectForm selectedKey={selectedKey} />
     </ModalDefault>
     
     

    </>
  )
}
