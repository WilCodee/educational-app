
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Popconfirm, Card } from 'antd';
import { CardTable } from 'src/components/CardTable';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SubjectContext } from 'src/context/AuthContext/SubjectContext/SubjectContext';
import { ModalContext } from 'src/context/ModalContext';

export const SubjectsPage = () => {

  const [selectedStudents, setSelectedStudents] = useState([])
  const [tableLoading, setTableLoading ] = useState(false)
  const { subjects, readSubject, deleteSubject } = useContext(SubjectContext)
  const { showModal } = useContext(ModalContext);

  const [selectedKey, setSelectedKey] = useState('')
  useEffect(() => {
    readSubject(data)
  }, [])

  const handleDelete = () => {
    deleteSubject(selectedKey)
    console.log(subjects)
  };

  const handleAddSubject = () => {
    showModal({
      mode: "ADD",
      data: {},
      title: "Agregar Materia",
      contentComponent: 'SubjectForm'
    })
  }

  const handleEditSubject = () => {
    showModal({
      mode: "EDIT",
      data: selectedStudents[0],
      title: "Editar Materia",
      contentComponent: 'SubjectForm'
    })
  }

  const handleViewSubject = () => {
    showModal({
      mode: "DETAILS",
      data: selectedStudents[0],
      title: "Detalle de la Materia",
      contentComponent: 'SubjectForm'
    })
  }


  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedStudents(selectedRows);
      setSelectedKey(selectedRowKeys);
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
      <CardTable title='MATERIAS' AddText='MATERIA' AddOnClick={handleAddSubject}>

        <Card className='cardbody' >
          <Button icon={<EyeOutlined />} onClick={handleViewSubject} className='buttonTable' type="primary" disabled={selectedStudents.length === 1 ? false : true} >VER DETALLES</Button>
          <Button icon={<EditOutlined />} onClick={handleEditSubject} className='buttonTable' type="primary" disabled={selectedStudents.length === 1 ? false : true}>EDITAR </Button>
          <Popconfirm
            title="Estás seguro que deseas eliminar las materias seleccionadas?"
            onConfirm={handleDelete}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className='buttonTable' type="primary" disabled={selectedStudents.length >= 1 ? false : true}>ELIMINAR</Button>

          </Popconfirm>

        </Card>
        <Table rowSelection={rowSelection} columns={columns} dataSource={subjects} loading={tableLoading} />
      </CardTable>
    </>
  )
}
