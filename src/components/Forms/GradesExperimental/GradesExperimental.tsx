//@ts-ignore
//@ts-nocheck
import { Button, Skeleton, message } from "antd";
import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  textColumn,
  keyColumn,
  floatColumn,
  DynamicDataSheetGrid,
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { getData } from "src/services/fetch/getData";
import { putData } from "src/services/fetch/putData";
import { useDispatch } from 'react-redux'
import { toggleRefresh } from "src/store/slices/table.slice";

const GradesWrapper = () => {
  return <GradesExperimental />;
};

const GradesExperimental = () => {
  const { data, hideModal } = useContext(ModalContext);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateAction } = useContext(ActionsContext)
  const dispatch = useDispatch()

  const [columnsLength, setColumnsLength] = useState(5)

  const initialRequest = async () => {
    setLoading(true);
    let people = []
    const studentRequest = await getData("students_by_course/" + data._id);
    if (studentRequest.status) {
      people = studentRequest.students
    }

    if ("grades" in data) {
      let gradesToTable = data.grades.map((row) => {
        let values = {};
        if ("grades" in row) {
          row.grades.map(
            (grade, index) => 
            {
              values["grade" + (index + 1).toString()] = grade
            }
          );
          //delete row["grades"];
        }


        let studentInfo = people.find((student: any) => student._id === row.student)
        let studentName = studentInfo ? studentInfo.profile.fullName.firstName + " " + studentInfo.profile.fullName.lastName : "Estudiante no encontrado"
        
        return {
          ...row,
          ...values,
          name: studentName, //todo ese name debe venir en la propiedad student
        };
      });
      setTableData(gradesToTable);
      setColumnsLength(gradesToTable[0].grades.length)
      setLoading(false);
      return;
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
        ...keyColumn("grade" + i.toString(), floatColumn),
        title: "Nota " + i.toString(),
      });
    }
    cols.push({
      ...keyColumn("average", floatColumn),
      disabled: true,
      title: "Promedio",
    });
    return cols;
  }, [columnsLength]);

  const changeData = (value, operations) => {
    let operation = operations[0];
    if (operation.type === "UPDATE") {
      let impactedRow = value[operation.fromRowIndex];
      delete impactedRow["grades"]
      let rowKeys = Object.keys(impactedRow);
      let gradeKeys = rowKeys.filter((rowKey) => rowKey.includes("grade"));
      let sum = 0;
      gradeKeys.map((gradeKey) => (sum += impactedRow[gradeKey]));
      let average = sum / gradeKeys.length;
      value[operation.fromRowIndex] = {
        ...impactedRow,
        average,
      };
      setTableData(value);
    }

    if (operation.type === "CREATE") {
      setTableData(value);
    }
  };

  const handleSave = async () => {
      let cleanRows = tableData.map((row) => {
      
      //en caso de que existiere una propiedad "grades", la eliminamos para que no de broncas con el gradeKeys
      //la propiedad grades existiría en caso de que sea una actualización y no se haya toca esa fila
      
      //obtenemos las keys de las columnas correspondientes a notas
      let rowKeys = Object.keys(row);
      let gradeKeys = rowKeys.filter((rowKey) => rowKey.includes("grade") && rowKey!=="grades");
      //agrupamos los valores de dichas keys en un arreglo de notas
      let grades = gradeKeys.map((gradeKey) => row[gradeKey]);
      //eliminamos las keys individuales (grade1, grade2, ...etc) porque ya fueron agrupadas
      gradeKeys.map((gradeKey) => delete row[gradeKey]);
      
      //eliminamos la key de name ya que no es necesario
      let nameKeys = rowKeys.filter((rowKey) => rowKey.includes("name"));
      nameKeys.map((nameKey) => delete row[nameKey]);

      //retornamos el arreglo limpio solo con student (id), average y el arreglo de notas (grades)
      return {
        ...row,
        grades,
      };
    });

    const updateRequest = await putData("courses/" + data._id, {
      grades: cleanRows,
    });
    if (updateRequest.status) {
      let updatedCourse = updateRequest.course
      updatedCourse.key = updatedCourse._id
      updateAction(updatedCourse._id, updatedCourse)
      dispatch(toggleRefresh())
      message.success("Notas asignadas exitosamente");
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
          <Button
            onClick={() => setColumnsLength((prevState) => prevState + 1)}
          >
            Agregar nota
          </Button>
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

export default GradesWrapper;
