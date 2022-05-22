import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from "../../context/AuthContext/ActionsContext/ActionsContext";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { postData } from "../../services/fetch/postData";
import { putData } from "../../services/fetch/putData";
import { IStudent } from "src/data/interfaces/IStudent";
import { IUser } from "src/data/interfaces/IUser";
import { Cedula } from "src/validation/Cedula";
import moment from "moment";
import {
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getData } from "src/services/fetch/getData";
import { generatePassword } from "src/utils";
import { ObjectId } from 'bson'

const { Option } = Select;
const StudentForm = () => {
  const { mode, data, hideModal }: any = useContext(ModalContext);
  const { createAction, updateAction } = useContext(ActionsContext);
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
      _id: new ObjectId().toString(),
      email: values.email,
      password: generatePassword(),
      isAdmin: false,
      isSeller: false,
      isTeacher: false,
      isStudent: true,
      profile: studentInfo,
    };
    setIsSubmitting(true);
    const addRequest = await postData("users", userObject);
    if (addRequest.status) {
      message.success("Estudiante creado exitosamente");
      let newStudent = addRequest.user;
      newStudent.key = newStudent._id;
      createAction(newStudent);
      const requestEmail = await getData(`send_welcome_email/${values.email}`);
      if (requestEmail.status) {
        message.success("Credenciales enviadas");
      }
    } else {
      message.error("Algo ha salido mal creando el estudiante");
    }
    setIsSubmitting(false);
    hideModal();
  };

  const onFinishEdit = async (values: any) => {
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
      isAdmin: false,
      isSeller: false,
      isTeacher: false,
      isStudent: true,
      profile: studentInfo,
    };
    setIsSubmitting(true);
    const updateRequest = await putData(`users/${data._id}`, userObject);
    if (updateRequest.status) {
      message.success("Estudiante editado exitosamente");
      let updatedStudent = updateRequest.user;
      updatedStudent.key = updatedStudent._id;
      updateAction(updatedStudent._id, updatedStudent);
    } else {
      message.error("Algo ha salido mal editando el estudiante");
    }
    setIsSubmitting(false);
    hideModal();
  };

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
          <Card title="Datos de acceso">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Campo requerido!" },
                {
                  type: "email",
                  message: "Ingrese un email valido!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="correo@dominio.com"
                prefix={<MailOutlined />}
              />
            </Form.Item>
          </Card>

          <Card title="Datos del estudiante">
            <Form.Item
              label="Nombre"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Nombre" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Apellido" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Cédula de identidad"
              name="ci"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 10,
                  message: "Maximo 10 caracteres!",
                },
                {
                  min: 10,
                  message: "Minimo 10 caracteres!",
                },
                {
                  validator: async (_, value) => Cedula(value),
                  message: "Cédula no valida!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Cédula de identidad"
                prefix={<IdcardOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
              ]}
            >
              <InputNumber
                min={5}
                max={60}
                stringMode={true}
                placeholder="18"
              />
            </Form.Item>

            <Form.Item
              label="Número de teléfono"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 9,
                  message: "Maximo 9 caracteres!",
                },
                {
                  min: 7,
                  message: "Minimo 7 caracteres!",
                },
              ]}
            >
              <Input
                addonBefore={"+593"}
                placeholder="99 000 0000"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Tipo de sangre"
              name="bloodType"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Select
                showSearch
                placeholder="Tipo de sangre"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                suffixIcon="🩸"
              >
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Fecha de ingreso"
              name="admissionDate"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Card>

          <Card title="Datos del representante">
            <Form.Item
              label="Nombre"
              name="representativeFirstName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Nombre" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="representativeLastName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Apellido" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Número de teléfono"
              name="representativePhoneNumber"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 9,
                  message: "Maximo 9 caracteres!",
                },
                {
                  min: 7,
                  message: "Minimo 7 caracteres!",
                },
              ]}
            >
              <Input
                addonBefore={"+593"}
                placeholder="99 000 0000"
                prefix={<PhoneOutlined />}
              />
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
            firstName: data.profile.fullName.firstName ?? "",
            lastName: data.profile.fullName.lastName,
            ci: data.profile.ci,
            age: data.profile.age,
            phoneNumber: data.profile.phoneNumber.number,
            bloodType: data.profile.bloodType,
            admissionDate: moment(data.profile.admissionDate, "DD-MM-YY"),
            representativeFirstName:
              data.profile.representative.fullName.firstName,
            representativeLastName:
              data.profile.representative.fullName.lastName,
            representativePhoneNumber:
              data.profile.representative.phoneNumber.number,
          }}
          onFinish={onFinishEdit}
          /*onFinishFailed={console.log('hey')}*/
          autoComplete="off"
          form={form}
        >
          <Card title="Datos de acceso">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                { type: "email", message: "Ingrese un email valido!" },
              ]}
            >
              <Input
                placeholder="correo@dominio.com"
                prefix={<MailOutlined />}
              />
            </Form.Item>
          </Card>

          <Card title="Datos del estudiante">
            <Form.Item
              label="Nombre"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Nombre" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Apellido" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Cédula de identidad"
              name="ci"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 10,
                  message: "Maximo 10 caracteres!",
                },
                {
                  min: 10,
                  message: "Minimo 10 caracteres!",
                },
                {
                  validator: async (_, value) => Cedula(value),

                  message: "Cédula no valida!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Cédula de identidad"
                prefix={<IdcardOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <InputNumber
                min={5}
                max={60}
                stringMode={true}
                placeholder="18"
              />
            </Form.Item>

            <Form.Item
              label="Número de teléfono"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 9,
                  message: "Maximo 9 caracteres!",
                },
                {
                  min: 7,
                  message: "Minimo 7 caracteres!",
                },
              ]}
            >
              <Input
                addonBefore={"+593"}
                placeholder="99 000 0000"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Tipo de sangre"
              name="bloodType"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Select
                showSearch
                placeholder="Tipo de sangre"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                suffixIcon="🩸"
              >
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Fecha de ingreso"
              name="admissionDate"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Card>

          <Card title="Datos del representante">
            <Form.Item
              label="Nombre"
              name="representativeFirstName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Nombre" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="representativeLastName"
              rules={[
                {
                  required: true,
                  message: "Campo requerido!",
                  whitespace: true,
                },
                {
                  type: "string",
                  pattern:
                    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                  message: "Ingresar solo letras!",
                },
              ]}
            >
              <Input placeholder="Apellido" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Número de teléfono"
              name="representativePhoneNumber"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  message: "No ingresar letras!",
                },
                {
                  max: 9,
                  message: "Maximo 9 caracteres!",
                },
                {
                  min: 7,
                  message: "Minimo 7 caracteres!",
                },
              ]}
            >
              <Input
                addonBefore={"+593"}
                placeholder="99 000 0000"
                prefix={<PhoneOutlined />}
              />
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
