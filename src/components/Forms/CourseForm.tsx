import React, { useContext, useState } from "react";
import { Form, Input, Button, message, DatePicker} from "antd";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { postData } from "src/services/fetch/postData";
import { putData } from "src/services/fetch/putData";
import moment from 'moment';

const CourseForm = () => {
  const { createAction, updateAction } = useContext(ActionsContext);
  const { mode, data, hideModal }:any = useContext(ModalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinishAdd = async (values: any) => {
    const dataValues = {
      name: values.name,
      startData: values.date[0],
      endData: values.date[1],
    };
    setIsSubmitting(true);
    const addRequest = await postData("courses", dataValues);
    console.log("ar", addRequest);
    if (addRequest.status) {
      message.success("Curso creado exitosamente");
      let newCourse = addRequest.course
      newCourse.key = newCourse._id;
      createAction(newCourse)
    } else {
      message.error("Algo ha salido mal creando el curso");
    }
    setIsSubmitting(false);
    hideModal();
  };

  const onFinishEdit = async (values: any) => {
    const dataValues = {
      name: values.name,
      startData: values.date[0],
      endData: values.date[1],
    };
    setIsSubmitting(true);
    const updateRequest = await putData("courses/" + data._id, dataValues);
    if (updateRequest.status) {
      message.success("Curso actualizado exitosamente");
      let updatedCourse = updateRequest.course;
      updatedCourse.key = updatedCourse._id;
      updateAction(updatedCourse._id, updatedCourse);
    } else {
      message.error("Algo ha salido mal actualizando el curso");
    }
    setIsSubmitting(false);
    hideModal();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
      {mode === "ADD" && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Ingresa el nombre de la materia!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de inicio / finalización "
            name="date"
            rules={[{ required: true, message: "Ingresa el rango de fecha" }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Agregar Curso
            </Button>
          </Form.Item>
        </Form>
      )}
      {mode === "EDIT" && (
        <Form
          initialValues={{
            name: data.name,
            date: [moment(data.startDate),moment(data.endDate)],
          }}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
         <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Ingresa el nombre de la materia!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de inicio / fin"
            name="date"
            rules={[{ required: true, message: "Ingresa el rango de fecha" }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>

          
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Editar Curso
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default CourseForm;
