import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Button, Form, Input, message } from "antd";
import { postData } from "../../services/fetch/postData";
import { putData } from "../../services/fetch/putData";

const StudentForm = () => {
  const { mode, data, hideModal } = useContext(ModalContext);
 console.log('data', data)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const onFinishAdd = () => alert("Aún no se pueden crear usuarios!");

  const onFinishEdit = () => alert("Edición aún no disponible");

  return (
    <div>
      {mode === "ADD" && (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          //onFinishFailed={console.log('hey')}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Nombre"
            name="firstName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Agregar Estudiante
            </Button>
          </Form.Item>
        </Form>
      )}
      {mode === "EDIT" && (
        <Form
          name="basic"
          initialValues={{ firstName: data.profile.fullName.firstName, lastName: data.profile.fullName.lastName }}
          onFinish={onFinishEdit}
          /*onFinishFailed={console.log('hey')}*/
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Nombre"
            name="firstName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Editar Estudiante
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default StudentForm;
