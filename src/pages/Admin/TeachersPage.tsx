import { Button, Card, Popconfirm, message, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'; 
import { CardTable } from 'src/components/CardTable';
import { TeachersColumns } from 'src/data/columns';
import { getData } from 'src/services/fetch/getData';
import { deleteData } from 'src/services/fetch/deleteData'; 
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalContext } from 'src/context/ModalContext';
import { ActionsContext } from 'src/context/AuthContext/ActionsContext/ActionsContext';


const TeachersPage = () => {
    const [ selectedTeachers, setSelectedTeachers ] = useState([])
    const [tableLoading, setTableLoading ] = useState(false)
    const { showModal }:any = useContext(ModalContext); 
    const { items, setAction, deleteAction } = useContext(ActionsContext)
    
    const handleAddTeacher = () =>{
        showModal({
            mode: "ADD", 
            data: {}, 
            title: " Agregar Profesor ",
            contentComponent: 'TeacherForm',
            width: 600
        })
    }

    const handleEditTeacher = () => {
        showModal({
            mode: "EDIT", 
            data: selectedTeachers[0], 
            title: " Editar Profesor",
            contentComponent: 'TeacherForm',
            width: 600
        })
    }

    const handleViewTeacher = () => {
        showModal({
            mode: "DETAILS",
            data: selectedTeachers[0], 
            title: " DETALLES",
            contentComponent: 'TeacherDetail',
            width: 600
        })
    }


    const handleDeleteTeacher = () => {
        selectedTeachers.map(async (teacher)=> {
            const deleteRequest = await deleteData(`users/${teacher['_id']}`)
            if(deleteRequest.status){
                message.success("Profesor eliminado exitosamente")
                deleteAction(teacher['_id'])
            }else{
                message.error("Algo ha salido mal eliminando el profesor")
            }
        })
    }



    const initialRequest = async () => {
        setTableLoading(true)
        const request = await getData('teachers')
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
          setSelectedTeachers(selectedRows);
        },
    };
      

    return(
        <div>
            <CardTable title="Profesores" AddText="Profesor" AddOnClick={handleAddTeacher} >
            <Card className='cardbody' >
                <Button 
                onClick={handleViewTeacher}
                type="primary" icon={<EyeOutlined /> }  disabled={selectedTeachers.length === 1 ? false : true }  className='buttonTable'>VER DETALLES</Button>
                <Button 
                onClick={handleEditTeacher}
                type="primary" icon={<EditOutlined />} disabled={selectedTeachers.length === 1 ? false : true }  className='buttonTable'>EDITAR</Button>
                <Popconfirm
                    title="Estás seguro que deseas eliminar los profesores seleccionados?"
                    onConfirm={handleDeleteTeacher}
                    okText="Sí"
                    cancelText="No"
                >
                   <Button type="primary" icon={<DeleteOutlined />} disabled={selectedTeachers.length >= 1 ? false: true}  className='buttonTable'>ELIMINAR</Button>
                </Popconfirm>
            </Card>

            <Table rowSelection={rowSelection} columns={TeachersColumns} dataSource={items} loading={tableLoading} scroll={{ x: 600 }} />
            
            </CardTable> 
        </div>
    )
}

export default TeachersPage; 