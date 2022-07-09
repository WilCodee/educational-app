import React, { useEffect, useState, useContext } from "react";
import { Table, Button, message } from "antd";
import { getData } from "../../services/fetch/getData";
import { putData } from "../../services/fetch/putData";
import { StudentsColumns } from "../../data/columns";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from "../../context/AuthContext/ActionsContext/ActionsContext";
//import { IUser } from "src/data/interfaces/IUser";


const StudentsList = () => {
    const { updateAction } = useContext(ActionsContext)
    const { data, hideModal }:any = useContext(ModalContext);
    const [tableLoading, setTableLoading] = useState(false);
    const [students, setStudents] = useState([]);
    //const [selectedStudents, setSelectedStudents] = useState('students' in data ? data.students : [])
    const [selectedRowKeys, setSelectedRowKeys] = useState('students' in data ? data.students : [])
  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitList = async () => {
        setIsSubmitting(true);
        let ids = {
            students: selectedRowKeys.length > 0 ? selectedRowKeys : []   
        } 

        console.log("ids", ids)
        console.log("students", students)
        
        let copyOfSubjects = [
          ...data.subjects, 
        ]
        data.subjects.map((subject:any, index:any) => {
          console.log('MATERIAS')
          if('grades' in subject){
            console.log('subject with grades', subject)
            let us = students.filter((student:any) => !selectedRowKeys.includes(student._id));
            console.log('ids diff', us)
            //TODO: revisar si los que no están seleccionados existían inicialmente

            us.map((us:any) => {
              if(data.students.includes(us._id)){
                console.log('Existía antes y ha sido deseleccionado, vamos a eliminar sus registros de notas')
                let newGrades = subject.grades.filter((grade:any) => grade.student !== us._id)                
                copyOfSubjects[index].grades = newGrades 
              }else{
                console.log('Ha sido deseleccionado antes, pero no existía antes.. no hay nada que hacer.')
              }
            })
          } 
        })

        let newData = {
          students: ids.students, 
          subjects: copyOfSubjects
        }

        console.log('newData', newData)

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

    

    setTableLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  
  const rowSelection = {
    selectedRowKeys, 
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRows);
      setSelectedRowKeys(selectedRowKeys)
      //setSelectedStudents(selectedRowKeys);
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