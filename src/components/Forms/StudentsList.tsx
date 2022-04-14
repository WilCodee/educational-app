import React, { useEffect, useState, useContext } from "react";
import { Table, Button, message } from "antd";
import { getData } from "../../services/fetch/getData";
import { putData } from "../../services/fetch/putData";
import { StudentsColumns } from "../../data/columns";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from "../../context/AuthContext/ActionsContext/ActionsContext";
import { IUser } from "src/data/interfaces/IUser";
/* import { ICourse } from "src/data/interfaces/ICourse"; */


/* const defaultSelectedStudents = (data:ICourse) => {
    if(data.students && data.students.length > 0){
        console.log('si tiene')
        const selectedStudents = data.students.map((student:any) => {
            let newStudent = student
            newStudent.key = newStudent._id
            return newStudent
        })
        return selectedStudents;
    }else{
        return []
    }
} */

const StudentsList = () => {
    const { updateAction } = useContext(ActionsContext)
    const { data, hideModal }:any = useContext(ModalContext);
    const [tableLoading, setTableLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitList = async () => {
        const ids = {
            students: selectedStudents.length > 0 ? selectedStudents.map((student:IUser) => student._id) : []   
        } 
        setIsSubmitting(true);
        const updateRequest = await putData("courses/" + data._id, ids);
        if (updateRequest.status) {
          message.success("Curso actualizado exitosamente");
          let updatedCourse = updateRequest.course;
          updatedCourse.key = updatedCourse._id;
          updateAction(updatedCourse._id, updatedCourse);
        } else {
          message.error("Algo ha salido mal actualizando la materia");
        }
        setIsSubmitting(false);
        hideModal();
      };
    
  
   //solo se cierra el modal, mas no se guardan los cambios
    

  const initialRequest = async () => {
    setTableLoading(true);
    const request = await getData("students");
    if (request.status) {
      const usersToTable = request.users.map((user: any) => {
        user.key = user["_id"];
        return user;
      });
      setStudents(usersToTable);
    }

    /*if(data.students && data.students.length > 0){
        console.log('si tiene')
        const defaultSelected = data.students.map((student:any) => {
            let newStudent = student
            newStudent.key = newStudent._id
            return newStudent
        })
        return selectedStudents;
    }else{
        return []
    }*/

    setTableLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  
  const [selectedRowKeys, setSelectedRowKeys] = useState(data.students)
  const rowSelection = {
    selectedRowKeys, 
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys)
      setSelectedStudents(selectedRows);
    },
  };


  return (
      <>
        <h4>Los estudiantes que selecciones serán asignados al curso</h4>
        <Table
          rowSelection={rowSelection}
          columns={StudentsColumns}
          dataSource={students}
          loading={tableLoading}
        />
        <Button loading={isSubmitting} type="primary" onClick={submitList}>Guardar cambios</Button>
      </>
  );
};

export default StudentsList;