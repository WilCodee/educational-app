
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Popconfirm, Card } from 'antd';
import { CardTable } from 'src/components/CardTable';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';
import { ModalContext } from 'src/context/ModalContext';
import { getData } from 'src/services/fetch/getData';

export const SubjectsPage = () => {

  const [selectedStudents, setSelectedStudents] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const { readSubject, deleteAction } = useContext(ActionsContext)
  const { showModal } = useContext(ModalContext);

  const [selectedKey, setSelectedKey] = useState('')


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
      contentComponent: 'SubjectDetail'
    })
  }


  const handledeleteAction = async () => {
    deleteAction('subjects',selectedStudents)
  }


  const initialRequest = async () => {
    setTableLoading(true)
    const request = await getData('subjects')
    if (request.status) {
      const subjectsToTable = request.subjects.map((subject: any) => {
        subject.key = subject['_id'];
        return subject;
      })
      setSubjects(subjectsToTable)

    }
    setTableLoading(false)
  }

  useEffect(() => {
    initialRequest()
    initialRequest()
    console.log('Hola')
  }, [deleteAction])


  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedStudents(selectedRows);
      setSelectedKey(selectedRowKeys);
    },


  };

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
            onConfirm={handledeleteAction}
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
