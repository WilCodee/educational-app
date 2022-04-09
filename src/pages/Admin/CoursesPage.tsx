import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Popconfirm, Card, message } from "antd";
import { CardTable } from "src/components/CardTable";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { getData } from "src/services/fetch/getData";
import { deleteData } from "src/services/fetch/deleteData";
import { CoursesColumns } from "src/data/columns";

const CoursesPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const { items, deleteAction, setAction } = useContext(ActionsContext);
  const { showModal } = useContext(ModalContext);

  const handleAddCourse = () => {
    showModal({
      mode: "ADD",
      data: {},
      title: "Agregar Curso",
      contentComponent: "CourseForm",
    });
  };

  const handleEditCourse = () => {
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: "Editar Curso",
      contentComponent: "CourseForm",
    });
  };

  const handleEditStudentsList = () => {
    showModal({
      mode: "EDIT",
      data: selectedCourses[0],
      title: "Editar lista de estudiantes",
      contentComponent: "SelectStudents",
    });
  };

  const handleViewCourse = () => {
    showModal({
      mode: "DETAILS",
      data: selectedCourses[0],
      title: "Detalles del curso",
      contentComponent: "SubjectDetail",
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

  const initialRequest = async () => {
    setTableLoading(true);
    const request = await getData("courses");
    if (request.status) {
      const coursesToTable = request.courses.map((course: any) => {
        course.key = course["_id"];
        return course;
      });
      setAction(coursesToTable);
    }
    setTableLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedCourses(selectedRows);
    },
  };

  return (
    <>
      <CardTable title="Cursos" AddText="Curso" AddOnClick={handleAddCourse}>
        <Card className="cardbody">
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
        </Card>
        <Table
          rowSelection={rowSelection}
          columns={CoursesColumns}
          dataSource={items}
          loading={tableLoading}
        />
      </CardTable>
    </>
  );
};

export default CoursesPage;
