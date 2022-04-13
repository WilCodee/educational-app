import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from '../../context/AuthContext/ActionsContext/ActionsContext';
import { Button, Card, Form, Input, message } from "antd";
import { postData } from "../../services/fetch/postData";
import { putData } from "../../services/fetch/putData";
//import { IStudent } from "src/data/interfaces/IStudent";
import { ITeacher } from "src/data/interfaces/ITeacher";
import { IUser } from "src/data/interfaces/IUser";

const TeacherForm = () => {
  const { mode, data, hideModal }:any = useContext(ModalContext);
  const { createAction, updateAction } = useContext(ActionsContext)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const onFinishAdd = async (values: any) => {
    const teacherInfo: ITeacher = {
      fullName: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      ci: values.ci,
      area: values.area,
      age: parseInt(values.age),
      admissionDate: new Date(values.admissionDate),
      phoneNumber: {
        prefix: "+593",
        number: values.phoneNumber,
      },
      createdAt: new Date(),
    };

    const userObject: IUser = {
      email: values.email,
      password: values.password,
      isAdmin: false,
      isSeller: false,
      isTeacher: true,
      isStudent: false,
      profile: teacherInfo,
    };
    setIsSubmitting(true);
    const addRequest = await postData("users", userObject);
    console.info("addRequest", addRequest);
    if(addRequest.status){
      message.success("Profesor creado exitosamente")
      let newTeacher = addRequest.user
      newTeacher.key = newTeacher._id
      createAction(newTeacher)
    }else{
      message.error("Algo ha salido mal creando el profesor")
    }
    setIsSubmitting(false);
    hideModal()
  };

  const onFinishEdit = async (values:any) => {
    const teacherInfo: ITeacher = {
        fullName: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        ci: values.ci,
        area: values.area,
        age: parseInt(values.age),
        admissionDate: new Date(values.admissionDate),
        phoneNumber: {
          prefix: "+593",
          number: values.phoneNumber,
        },
        createdAt: new Date(),
      };

    const userObject: IUser = {
      email: values.email,
      password: values.password,
      isAdmin: false,
      isSeller: false,
      isTeacher: true,
      isStudent: false,
      profile: teacherInfo,
    };
    setIsSubmitting(true);
    const updateRequest = await putData(`users/${data._id}` , userObject);
    if(updateRequest.status){
      message.success("Profesor editado exitosamente")
      let updatedTeacher = updateRequest.user
      updatedTeacher.key = updatedTeacher._id
      updateAction(updatedTeacher._id, updatedTeacher)
    }else{
      message.error("Algo ha salido mal editando el profesor")
    }
    setIsSubmitting(false);
    hideModal()
  }

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
          <Card title="Datos de acceso" >          
            <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input type="password" />
          </Form.Item>

          </Card>

          <Card title="Datos del profesor" >
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

          <Form.Item
            label="Cédula de identidad"
            name="ci"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Área de destreza"
            name="area"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Número de teléfono"
            name="phoneNumber"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de ingreso"
            name="admissionDate"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          </Card>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Agregar Profesor
            </Button>
          </Form.Item>
        </Form>
      )}
      {mode === "EDIT" && (
        <Form
          name="basic"
          initialValues={{
            email: data.email, 
            password: data.password,
            firstName: data.profile.fullName.firstName ?? "",
            lastName: data.profile.fullName.lastName,
            ci: data.profile.ci,
            area: data.profile.area,
            age: data.profile.age, 
            phoneNumber: data.profile.phoneNumber.number,
            admissionDate: data.profile.admissionDate
            
          }}
          onFinish={onFinishEdit}
          /*onFinishFailed={console.log('hey')}*/
          autoComplete="off"
          form={form}
        >

          <Card title="Datos de acceso" >          
            <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input type="password" />
          </Form.Item>

          </Card>

          <Card title="Datos del profesor" >
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

          <Form.Item
            label="Cédula de identidad"
            name="ci"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Área de destreza"
            name="area"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Número de teléfono"
            name="phoneNumber"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Fecha de ingreso"
            name="admissionDate"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          </Card>

         
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Editar Profesor
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default TeacherForm;
