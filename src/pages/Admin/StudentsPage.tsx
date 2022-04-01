import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react'; 
import { CardTable } from 'src/components/CardTable';
import { StudentsColumns } from 'src/data/columns';
import { getData } from 'src/services/fetch/getData';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


const StudentsPage = () => {
    const [ students, setStudents ] = useState([])
    const [ selectedStudents, setSelectedStudents ] = useState([])

    const initialRequest = async () => {
        const request = await getData('users')
        if(request.status){
            console.log('u', request.users)
             const usersToTable = request.users.map((user:any) => { 
                user.key = user['_id'];
                return user;    
            })
            setStudents(usersToTable)
        }
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
            <CardTable title="Estudiantes" AddText="Estudiante">
            
            <Card className='cardbody' >
                <Button type="primary" icon={<EyeOutlined /> }  disabled={selectedStudents.length === 1 ? false : true }  className='buttonTable'>VER DETALLES</Button>
                <Button type="primary" icon={<EditOutlined />} disabled={selectedStudents.length === 1 ? false : true }  className='buttonTable'>EDITAR</Button>
                <Button type="primary" icon={<DeleteOutlined />} disabled={selectedStudents.length >= 1 ? false: true}  className='buttonTable'>ELIMINAR</Button>
            </Card>

            <Table rowSelection={rowSelection} columns={StudentsColumns} dataSource={students} loading={ students.length === 0 ? true : false }  />
            
            </CardTable> 
        </div>
    )
}

export default StudentsPage; 