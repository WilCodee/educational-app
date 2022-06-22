import React, { useContext, useState } from "react";
import { Form, Input, Button, message, DatePicker } from "antd";
import { ActionsContext } from "src/context/AuthContext/ActionsContext/ActionsContext";
import { ModalContext } from "src/context/ModalContext";
import { postData } from "src/services/fetch/postData";
import { putData } from "src/services/fetch/putData";
import moment from 'moment';
import {FolderOpenOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { ObjectId } from "bson";

const CourseForm = () => {
  const { createAction, updateAction } = useContext(ActionsContext);
  const { mode, data, hideModal }: any = useContext(ModalContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinishAdd = async (values: any) => {
    const dataValues = {
      _id: new ObjectId().toString(),
      name: values.name,
      startDate: values.date[0],
      endDate: values.date[1],
      whatsappGroup: values.whatsappGroup
    };
    setIsSubmitting(true);
    const addRequest = await postData("courses", dataValues);
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
      startDate: values.date[0],
      endDate: values.date[1],
      whatsappGroup: values.whatsappGroup
    }
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
    message.error('Algo ha salido mal, reinténtalo más tarde o ponte en contacto con los administradores del sistema');
  };


  return (
    <>
      {mode === "ADD" && (
        <Form
          name="basic"
          labelCol={{ span: 10 }}
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
            <Input placeholder="Primero A" prefix={<FolderOpenOutlined />}/>
          </Form.Item>

          <Form.Item
            label="Fecha de inicio / finalización "
            name="date"
            rules={[{ required: true, message: "Ingresa el rango de fecha" }]}
          >
            <DatePicker.RangePicker placeholder={['YYYY/MM/DD','YYYY/MM/DD']}/>
          </Form.Item>
          <Form.Item
            name="whatsappGroup"
            label="Grupo de WhatsApp"
            rules={[{ type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
          >
            <Input placeholder="link del grupo de WhatsApp" prefix={<WhatsAppOutlined />}/>
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
            date: [moment(data.startDate), moment(data.endDate)],
            whatsappGroup: data.whatsappGroup
          }}
          name="basic"
          labelCol={{ span: 10 }}
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
            <Input placeholder="Primero A" prefix={<FolderOpenOutlined />}/>
          </Form.Item>

          <Form.Item
            label="Fecha de inicio / fin"
            name="date"
            rules={[{ required: true, message: "Ingresa el rango de fecha" }]}
          >
            <DatePicker.RangePicker placeholder={['YYYY/MM/DD','YYYY/MM/DD']}/>
          </Form.Item>
          <Form.Item
            name="whatsappGroup"
            hasFeedback
            label="Grupos de WhatsApp"
            rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
            extra={<a href={data.whatsappGroup} target='_blank'><WhatsAppOutlined /> Pruébalo aquí.</a>}
          >
            <Input name="linkWhatsApp" placeholder='link del grupo de WhatsApp' prefix={<WhatsAppOutlined />}/>
            
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
