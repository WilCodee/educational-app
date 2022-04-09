
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Popconfirm, Card, message } from 'antd';
import { CardTable } from 'src/components/CardTable';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';
import { ModalContext } from 'src/context/ModalContext';
import { getData } from 'src/services/fetch/getData';
import { deleteData } from 'src/services/fetch/deleteData'

export const SubjectsPage = () => {

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const { items, deleteAction, setAction } = useContext(ActionsContext)
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
      data: selectedSubjects[0],
      title: "Editar Materia",
      contentComponent: 'SubjectForm'
    })
  }

  const handleViewSubject = () => {
    showModal({
      mode: "DETAILS",
      data: selectedSubjects[0],
      title: "Detalle de la Materia",
      contentComponent: 'SubjectDetail'
    })
  }


  const handleDeleteSubject = () => {
      selectedSubjects.map(async (subject) => {
        const deleteRequest = await deleteData(`subjects/${subject['_id']}`)
        if(deleteRequest.status){
            message.success("Materia eliminada exitosamente")
            deleteAction(subject['_id'])
        }else{
            message.error("Algo ha salido mal eliminando la materia")
        }  
      })
  }



  const initialRequest = async () => {
    setTableLoading(true)
    const request = await getData('subjects')
    if (request.status) {
      const subjectsToTable = request.subjects.map((subject: any) => {
        subject.key = subject['_id'];
        return subject;
      })
      setAction(subjectsToTable)
    }
    setTableLoading(false)
  }


  useEffect(() => {
    initialRequest()
  }, [])



  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedSubjects(selectedRows)
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
      <CardTable title='Materias' AddText='Materia' AddOnClick={handleAddSubject}>

        <Card className='cardbody' >
          <Button icon={<EyeOutlined />} onClick={handleViewSubject} className='buttonTable' type="primary" disabled={selectedSubjects.length === 1 ? false : true} >VER DETALLES</Button>
          <Button icon={<EditOutlined />} onClick={handleEditSubject} className='buttonTable' type="primary" disabled={selectedSubjects.length === 1 ? false : true}>EDITAR </Button>
          <Popconfirm
            title="Estás seguro que deseas eliminar las materias seleccionadas?"
            onConfirm={handleDeleteSubject}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className='buttonTable' type="primary" disabled={selectedSubjects.length >= 1 ? false : true}>ELIMINAR</Button>

          </Popconfirm>

        </Card>
        <Table rowSelection={rowSelection} columns={columns} dataSource={items} loading={tableLoading} />
      </CardTable>
    </>
  )
}
