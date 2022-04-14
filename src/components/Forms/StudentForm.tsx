import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from '../../context/AuthContext/ActionsContext/ActionsContext';
import { Button, Card, Form, Input, message } from "antd";
import { postData } from "../../services/fetch/postData";
import { putData } from "../../services/fetch/putData";
import { IStudent } from "src/data/interfaces/IStudent";
import { IUser } from "src/data/interfaces/IUser";

const StudentForm = () => {
  const { mode, data, hideModal }:any = useContext(ModalContext);
  const { createAction, updateAction } = useContext(ActionsContext)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const onFinishAdd = async (values: any) => {
    const studentInfo: IStudent = {
      fullName: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      ci: values.ci,
      age: parseInt(values.age),
      phoneNumber: {
        prefix: "+593",
        number: values.phoneNumber,
      },
      bloodType: values.bloodType,
      admissionDate: new Date(values.admissionDate),
      createdAt: new Date(),
      representative: {
        fullName: {
          firstName: values.representativeFirstName,
          lastName: values.representativeLastName,
        },
        phoneNumber: {
          prefix: "+593",
          number: values.representativePhoneNumber,
        },
      },
    };

    const userObject: IUser = {
      email: values.email,
      password: values.password,
      isAdmin: false,
      isSeller: false,
      isTeacher: false,
      isStudent: true,
      profile: studentInfo,
    };
    setIsSubmitting(true);
    const addRequest = await postData("users", userObject);
    console.info("addRequest", addRequest);
    if(addRequest.status){
      message.success("Estudiante creado exitosamente")
      let newStudent = addRequest.user
      newStudent.key = newStudent._id
      createAction(newStudent)
    }else{
      message.error("Algo ha salido mal creando el estudiante")
    }
    setIsSubmitting(false);
    hideModal()
  };

  const onFinishEdit = async (values:any) => {
    const studentInfo: IStudent = {
      fullName: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      ci: values.ci,
      age: parseInt(values.age),
      phoneNumber: {
        prefix: "+593",
        number: values.phoneNumber,
      },
      bloodType: values.bloodType,
      admissionDate: new Date(values.admissionDate),
      createdAt: new Date(),
      representative: {
        fullName: {
          firstName: values.representativeFirstName,
          lastName: values.representativeLastName,
        },
        phoneNumber: {
          prefix: "+593",
          number: values.representativePhoneNumber,
        },
      },
    };

    const userObject: IUser = {
      email: values.email,
      password: values.password,
      isAdmin: false,
      isSeller: false,
      isTeacher: false,
      isStudent: true,
      profile: studentInfo,
    };
    setIsSubmitting(true);
    const updateRequest = await putData(`users/${data._id}` , userObject);
    if(updateRequest.status){
      message.success("Estudiante editado exitosamente")
      let updatedStudent = updateRequest.user
      updatedStudent.key = updatedStudent._id
      updateAction(updatedStudent._id, updatedStudent)
    }else{
      message.error("Algo ha salido mal editando el estudiante")
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

          <Card title="Datos del estudiante" >
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
            label="Tipo de sangre"
            name="bloodType"
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


          <Card title="Datos del representante" >
          <Form.Item
            label="Nombre"
            name="representativeFirstName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="representativeLastName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Número de teléfono"
            name="representativePhoneNumber"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          </Card>

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
          initialValues={{
            email: data.email, 
            password: data.password,
            firstName: data.profile.fullName.firstName ?? "",
            lastName: data.profile.fullName.lastName,
            ci: data.profile.ci,
            age: data.profile.age, 
            phoneNumber: data.profile.phoneNumber.number,
            bloodType: data.profile.bloodType, 
            admissionDate: data.profile.admissionDate, 
            representativeFirstName: data.profile.representative.fullName.firstName,
            representativeLastName: data.profile.representative.fullName.lastName,
            representativePhoneNumber: data.profile.representative.phoneNumber.number
            
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

          <Card title="Datos del estudiante" >
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
            label="Tipo de sangre"
            name="bloodType"
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


          <Card title="Datos del representante" >
          <Form.Item
            label="Nombre"
            name="representativeFirstName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="representativeLastName"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Número de teléfono"
            name="representativePhoneNumber"
            rules={[{ required: true, message: "Requerido" }]}
          >
            <Input />
          </Form.Item>

          </Card>

         
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
