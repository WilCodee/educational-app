//@ts-ignore
//@ts-nocheck
import { Button, Skeleton, message } from "antd";
import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  textColumn,
  keyColumn,
  floatColumn,
  DynamicDataSheetGrid,
  checkboxColumn
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { getData } from "src/services/fetch/getData";
import { putData } from "src/services/fetch/putData";
import { useDispatch } from 'react-redux'
import { toggleRefresh } from "src/store/slices/table.slice";
import { AuthContext } from "src/context/AuthContext";


const AssistanceExperimental = () => {
  const { data, hideModal } = useContext(ModalContext);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateAction } = useContext(ActionsContext)
  const dispatch = useDispatch()
  const { user } = useContext(AuthContext);
  
  const [columnsLength, setColumnsLength] = useState(30)

  const initialRequest = async () => {
    setLoading(true);

    let people = []
    const studentRequest = await getData("students_by_course/" + data._id);
    if (studentRequest.status) {
      people = studentRequest.students
    }

    let fullStudents = people.map((student:any) => {
      return {
        student: student._id,
        name: student.profile.fullName.firstName + " " + student.profile.fullName.lastName
      }
    })

    let daysToTable = []

    let numOfColumns = 15

    if ("subjects" in data) {
      let findSubject = data.subjects.find((subject:any) => subject.teacher === user._id)
      if('assistance' in findSubject){
        let newDt = fullStudents.map((student:any) => {
          let assistanceOfStudent = findSubject.assistance.find((a:any) => a.student === student.student)
          if(assistanceOfStudent){
            let values = {}
            console.log('El estudiante tiene asistencia', assistanceOfStudent)
            if('days' in assistanceOfStudent){
              assistanceOfStudent.days.map(
                (day) => (values[day.day] = day.value)
              )
              numOfColumns = assistanceOfStudent.days.length
            }
            console.log('values', values)
            daysToTable.push({
              ...assistanceOfStudent,
              ...values, 
              name: student.name
            })
          }else{
            daysToTable.push({
              student: student.student,
              name: student.name
            })
          }
        })
        
        /*let daysToTable = findSubject.assistance.map((row) => {
          let values = {};
          if ("days" in row) {
            row.days.map(
              (day) => (values[day.day] = day.value)
            );
          }
          let studentInfo = people.find((student:any) => student._id === row.student) 
          let studentName = studentInfo ? studentInfo.profile.fullName.firstName + " " + studentInfo.profile.fullName.lastName : "Estudiante no encontrado" 
          return {
            ...row,
            ...values,
            name: studentName
          };
        });*/
        
        setTableData(daysToTable);
        setLoading(false);
        return; 
      }
    }
    const request = await getData("students_by_course/" + data._id);
    if (request.status) {
      setTableData(
        request.students.map((student: any) => {
          return {
            student: student._id,
            name:
              student.profile.fullName.firstName +
              " " +
              student.profile.fullName.lastName,
            presentTotal: 0, 
            absentTotal: columnsLength
          };
        })
      );
      setLoading(false);
      return;
    }
    message.error("No se pudo traer los estudiantes!");
    setLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);


  const columns = useMemo(() => {
    let cols = [
      {
        ...keyColumn("name", textColumn),
        disabled: true,
        title: "Estudiante",
      },
    ];
    for (let i = 1; i <= columnsLength; i++) {
      cols.push({
        ...keyColumn("day" + i.toString(), checkboxColumn),
        title: "Día " + i.toString(),
      });
    }
    
    cols.push({
      ...keyColumn("presentTotal", floatColumn),
      disabled: true,
      title: "Total asistencias",
    });
    
    cols.push({
        ...keyColumn("absentTotal", floatColumn),
        disabled: true,
        title: "Total faltas",
    });
    return cols;
  }, [columnsLength]);

  const changeData = (value, operations) => {
    let operation = operations[0];
    if (operation.type === "UPDATE") {
      let impactedRow = value[operation.fromRowIndex];
      delete impactedRow["days"]
      let rowKeys = Object.keys(impactedRow);
      let gradeKeys = rowKeys.filter((rowKey) => rowKey.includes("day"));
      let sum = 0;
      gradeKeys.map((gradeKey) => (sum += impactedRow[gradeKey]));
      value[operation.fromRowIndex] = {
        ...impactedRow,
        presentTotal: sum,
        absentTotal: columnsLength - sum
      };
      setTableData(value);
    }

    if (operation.type === "CREATE") {
      setTableData(value);
    }
  };

  const handleSave = async () => {
    let cleanRows = tableData.map((row) => {
      //obtenemos las keys de las columnas correspondientes a dias
      let rowKeys = Object.keys(row);
      let dayKeys = rowKeys.filter((rowKey) => rowKey.includes("day") && rowKey!=="days");
      //agrupamos los valores de dichas keys en un arreglo de dias
      let days = dayKeys.map((dayKey) => {
        return { 
          day: dayKey, 
          value: row[dayKey]
        }
      });
      //eliminamos las keys individuales (day1, day2, ...etc) porque ya fueron agrupadas
      dayKeys.map((dayKey) => delete row[dayKey]);

      //eliminamos la key de name ya que no es necesario
      let nameKeys = rowKeys.filter((rowKey) => rowKey.includes("name"));
      nameKeys.map((nameKey) => delete row[nameKey]);

      //retornamos el arreglo limpio solo con student (id), average y el arreglo de notas (grades)
      return {
        ...row,
        days,
      };
    });



    console.log('assitance', cleanRows)

    let subjectIndex = data.subjects.findIndex((subject:any) => subject.teacher === user._id)
    data.subjects[subjectIndex] = {
      ...data.subjects[subjectIndex], 
      assistance: cleanRows
    }

    const updateRequest = await putData("courses/" + data._id, {
      subjects: data.subjects,
    });
    if (updateRequest.status) {
      let updatedCourse = updateRequest.course
      updatedCourse.key = updatedCourse._id
      updateAction(updatedCourse._id, updatedCourse)
      dispatch(toggleRefresh())
      message.success("Asistencia asignada exitosamente");
      hideModal();
    } else {
      message.error("Algo ha salido mal enviando la información");
      hideModal();
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          <DynamicDataSheetGrid
            value={tableData}
            onChange={(value, operations) => changeData(value, operations)}
            columns={columns}
            lockRows={true}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
            }}
          >
            <Button type="primary" onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistanceExperimental;
