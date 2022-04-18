import { Button, Card, Popconfirm, message, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'; 
import { CardTable } from 'src/components/CardTable';
import { StudentsColumns } from 'src/data/columns';
import { getData } from 'src/services/fetch/getData';
import { deleteData } from 'src/services/fetch/deleteData'; 
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalContext } from 'src/context/ModalContext';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';


const StudentsPage = () => {
    const [ selectedStudents, setSelectedStudents ] = useState([])
    const [tableLoading, setTableLoading ] = useState(false)
    const { showModal }:any = useContext(ModalContext); 
    const { items, setAction, deleteAction } = useContext(ActionsContext)
    
    const handleAddStudent = () =>{
        showModal({
            mode: "ADD", 
            data: {}, 
            title: " Agregar Estudiante",
            contentComponent: 'StudentForm',
            width: 600
        })
    }

    const handleEditStudent = () => {
        showModal({
            mode: "EDIT", 
            data: selectedStudents[0], 
            title: " Editar Estudiante",
            contentComponent: 'StudentForm',
            width: 600
        })
    }

    const handleViewStudent = () => {
        showModal({
            mode: "DETAILS",
            data: selectedStudents[0], 
            title: " DETALLES",
            contentComponent: 'StudentDetail',
            width: 600
        })
    }


    const handleDeleteStudent = () => {
        selectedStudents.map(async (student)=> {
            const deleteRequest = await deleteData(`users/${student['_id']}`)
            if(deleteRequest.status){
                message.success("Estudiante eliminado exitosamente")
                deleteAction(student['_id'])
            }else{
                message.error("Algo ha salido mal eliminando el estudiante")
            }
        })
    }

    const initialRequest = async () => {
        setTableLoading(true)
        const request = await getData('students')
        if(request.status){
             const usersToTable = request.users.map((user:any) => { 
                user.key = user['_id'];
                return user;    
            })
            setAction(usersToTable)
        }
        setTableLoading(false)
    }

    useEffect(() => {
        initialRequest()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectedStudents(selectedRows);
        },
    };
      

    return(
        <div>
            <CardTable title="Estudiantes" AddText="Estudiante" AddOnClick={handleAddStudent} >
            <Card className='cardbody' >
                <Button 
                onClick={handleViewStudent}
                type="primary" icon={<EyeOutlined /> }  disabled={selectedStudents.length === 1 ? false : true }  className='buttonTable'>VER DETALLES</Button>
                <Button 
                onClick={handleEditStudent}
                type="primary" icon={<EditOutlined />} disabled={selectedStudents.length === 1 ? false : true }  className='buttonTable'>EDITAR</Button>
                <Popconfirm
                    title="Estás seguro que deseas eliminar los estudiantes seleccionados?"
                    onConfirm={handleDeleteStudent}
                    okText="Sí"
                    cancelText="No"
                >
                   <Button type="primary" icon={<DeleteOutlined />} disabled={selectedStudents.length >= 1 ? false: true}  className='buttonTable'>ELIMINAR</Button>
                </Popconfirm>
            </Card>

            <Table rowSelection={rowSelection} columns={StudentsColumns} dataSource={items} loading={tableLoading} scroll={{ x: 600 }} />
            
            </CardTable> 
        </div>
    )
}

export default StudentsPage; 