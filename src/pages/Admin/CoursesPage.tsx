import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Popconfirm, Card, message } from "antd";
import { CardTable } from "src/components/CardTable";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { getData } from "src/services/fetch/getData";
import { deleteData } from "src/services/fetch/deleteData";
import { CoursesColumns } from "src/data/columns";
import { AuthContext } from "src/context/AuthContext";
import { RootState } from "src/store";
import { useSelector } from "react-redux";

const CoursesPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { deleteAction, setAction, items } = useContext(ActionsContext);
  const { showModal }: any = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const tableState = useSelector((state: RootState) => state.table);

  const handleAddCourse = () => {
    showModal({
      mode: "ADD",
      data: {},
      title: " Agregar Curso",
      contentComponent: "CourseForm",
      width: 600,
    });
  };

  const handleEditCourse = () => {
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: " Editar Curso",
      contentComponent: "CourseForm",
      width: 600,
    });
  };

  const handleEditStudentsList = () => {
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: " Editar lista de estudiantes",
      contentComponent: "SelectStudents",
    });
  };

  const handleEditSchedule = () => {
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: " Editar Horario",
      contentComponent: "ScheduleForm",
    });
  };

  const handleViewCourse = () => {
    showModal({
      mode: "DETAILS",
      data: selectedCourses[0],
      title: " DETALLES",
      contentComponent: "CourseDetail",
      width: 600,
    });
  };

  const handleDeleteCourse = () => {
    selectedCourses.map(async (course) => {
      const deleteRequest = await deleteData(`courses/${course["_id"]}`);
      if (deleteRequest.status) {
        message.success("Curso eliminado exitosamente");
        deleteAction(course["_id"]);
      } else {
        message.error("Algo ha salido mal eliminando el curso");
      }
    });
  };

  const handleAssignGrades = () => {
    console.log("selectedCourse", selectedCourses[0]);
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: "Asignación de notas",
      contentComponent: "GradesForm",
      width: "auto",
    });
  };

  const initialRequest = async () => {
    setLoading(true);
    var request = {
      status: "",
      courses: [],
    };
    user.isAdmin && (request = await getData("courses"));
    user.isStudent &&
      (request = await getData(`courses_by_student/${user._id}`));
    user.isTeacher &&
      (request = await getData(`courses_by_teacher/${user._id}`));

    if (request.status) {
      const coursesToTable = request.courses.map((course: any) => {
        course.key = course["_id"];
        return course;
      });
      setAction(coursesToTable);
      setLoading(false);
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedCourses([]);
  }, [tableState.refresh]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedCourses(selectedRows);
    },
  };

  return (
    <>
      <CardTable title="Cursos" AddText="Curso" AddOnClick={handleAddCourse}>
        <Card className="cardbody">
          {user.isAdmin && (
            <>
              <Button
                icon={<EyeOutlined />}
                onClick={handleViewCourse}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                VER DETALLES
              </Button>
              <Button
                icon={<EditOutlined />}
                onClick={handleEditCourse}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                EDITAR INFORMACIÓN GENERAL
              </Button>
              <Button
                icon={<UserOutlined />}
                onClick={handleEditStudentsList}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                EDITAR LISTA DE ESTUDIANTES
              </Button>

              <Button
                icon={<CalendarOutlined />}
                onClick={handleEditSchedule}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                EDITAR HORARIO
              </Button>

              <Popconfirm
                title="Estás seguro que deseas eliminar las materias seleccionadas?"
                onConfirm={handleDeleteCourse}
                okText="Sí"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  className="buttonTable"
                  type="primary"
                  disabled={selectedCourses.length >= 1 ? false : true}
                >
                  ELIMINAR
                </Button>
              </Popconfirm>
            </>
          )}

          {user.isTeacher && (
            <>
              <Button
                icon={<EyeOutlined />}
                onClick={handleViewCourse}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                VER DETALLES
              </Button>
              <Button
                icon={<EyeOutlined />}
                onClick={handleAssignGrades}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                ASIGNACIÓN DE NOTAS
              </Button>
              <Button
                icon={<EyeOutlined />}
                onClick={handleViewCourse}
                className="buttonTable"
                type="primary"
                disabled={selectedCourses.length === 1 ? false : true}
              >
                ASIGNACIÓN DE ASISTENCIA
              </Button>
            </>
          )}
        </Card>
        <Table
          rowSelection={rowSelection}
          columns={CoursesColumns}
          dataSource={items}
          loading={loading}
          scroll={{ x: 600 }}
        />
      </CardTable>
    </>
  );
};

export default CoursesPage;
