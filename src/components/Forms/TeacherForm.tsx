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
  Upload,
} from "antd";
import { postData, postFormData } from "../../services/fetch/postData";
import { putData } from "../../services/fetch/putData";
//import { IStudent } from "src/data/interfaces/IStudent";
import { IUser } from "src/data/interfaces/IUser";
import { Cedula } from "src/validation/Cedula";
import moment from "moment";
import {
  AreaChartOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import { getData } from "src/services/fetch/getData";
import { generatePassword } from "src/utils";
import { ObjectId } from "bson";
import type { RcFile } from 'antd/es/upload/interface';

const { Option } = Select;


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);

};


const TeacherForm = () => {
  const { mode, data, hideModal }: any = useContext(ModalContext);
  const { createAction, updateAction } = useContext(ActionsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(()  => {
    if(mode==="EDIT" && data && data.profile && data.profile.profilePicture){
     return data.profile.profilePicture
    }
    return ''
  })

  const [form] = Form.useForm();

  const onFinishAdd = async (values: any) => {
    console.log('values', values)
    /*
    if (image === null) {
      message.warning("Es necesario cargar una imagen!")
      return;
    }
    */

    const imageForm = new FormData()
    imageForm.append('image', values.image)

    const uploadImage = await postFormData('images/upload', imageForm)
    let uploadedImageUrl;

    if (uploadImage.status) {
      uploadedImageUrl = uploadImage['url_images'][0]
    }

    if (!uploadImage.status) {
      alert('Hubo un problema al cargar la fotografía, por favor intenta de nuevo')
      return;
    }


    const teacherInfo: any = {
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
      profilePicture: uploadedImageUrl
    };

    const userObject: IUser = {
      _id: new ObjectId().toString(),
      email: values.email,
      password: generatePassword(),
      isAdmin: false,
      isSeller: false,
      isTeacher: true,
      isStudent: false,
      profile: teacherInfo,
    };
    setIsSubmitting(true);
    const addRequest = await postData("users", userObject);
    if (addRequest.status) {
      message.success("Profesor creado exitosamente");
      let newTeacher = addRequest.user;
      newTeacher.key = newTeacher._id;
      createAction(newTeacher);
      const requestEmail = await getData(`send_welcome_email/${values.email}`);
      if (requestEmail.status) {
        message.success("Credenciales enviadas");
      }
    } else {
      message.error("Algo ha salido mal creando el profesor");
    }
    setIsSubmitting(false);
    hideModal();
    
  };

  const onFinishEdit = async (values: any) => {
    /*
    if (image === null) {
      message.warning("Es necesario cargar una imagen!")
      return;
    }
    */
    let profilePicture = values.image
    if (typeof(profilePicture) !== "string"){
      const imageForm = new FormData()
      imageForm.append('image', values.image)
  
      const uploadImage = await postFormData('images/upload', imageForm)
  
      if (uploadImage.status) {
        profilePicture = uploadImage['url_images'][0]
      }
  
      if (!uploadImage.status) {
        alert('Hubo un problema al cargar la fotografía, por favor intenta de nuevo')
        return;
      }
    }



    const teacherInfo: any = {
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
      profilePicture
    };

    const userObject: IUser = {
      email: values.email,
      isAdmin: false,
      isSeller: false,
      isTeacher: true,
      isStudent: false,
      profile: teacherInfo,
    };
    setIsSubmitting(true);
    const updateRequest = await putData(`users/${data._id}`, userObject);
    if (updateRequest.status) {
      message.success("Profesor editado exitosamente");
      let updatedTeacher = updateRequest.user;
      updatedTeacher.key = updatedTeacher._id;
      updateAction(updatedTeacher._id, updatedTeacher);
    } else {
      message.error("Algo ha salido mal editando el profesor");
    }
    setIsSubmitting(false);
    hideModal();
  };


  const getFile = (e: any) => {
    console.log('Upload event:', e);
    getBase64(e.file.originFileObj as RcFile, url => {
      setImageUrl(url);
    });

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file.originFileObj;
  };


  return (
    <div>
      {mode === "ADD" && (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Foto"
            name='image'
            rules={[
              { required: true, message: "Campo requerido!" },
            ]}
            getValueFromEvent={getFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >

              {
                imageUrl !== "" ?
                  <img src={imageUrl} alt="not found" style={{ width: '100%' }} />
                  :
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
              }
            </Upload>
          </Form.Item>

         
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

          <Card title="Datos del profesor">
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
                  message: "Cédula no valida!",
                  validator: async (_, value) => Cedula(value),
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
              label="Área de destreza"
              name="area"
              rules={[{ required: true, message: "Porfavor Ingresa un área" }]}
            >
              <Select
                showSearch
                placeholder="Selecciona un área"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                suffixIcon={<AreaChartOutlined />}
              >
                <Option value="Matemática">Matemática</Option>
                <Option value="Lengiaje">Literatura</Option>
                <Option value="Ciencias Sociales">Ciencias Sociales</Option>
                <Option value="Ciencias Naturales">Ciencias Naturales</Option>
              </Select>
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
                min={18}
                max={80}
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
              label="Fecha de ingreso"
              name="admissionDate"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker placeholder="YYYY-MM-DD" />
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
            firstName: data.profile.fullName.firstName,
            lastName: data.profile.fullName.lastName,
            ci: data.profile.ci,
            area: data.profile.area,
            age: data.profile.age,
            phoneNumber: data.profile.phoneNumber.number,
            admissionDate: moment(data.profile.admissionDate, "DD-MM-YY"),
            image: data.profile.profilePicture
          }}
          onFinish={onFinishEdit}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Foto"
            name="image"
            rules={[
              { required: true, message: "Campo requerido!" },
            ]}
            getValueFromEvent={getFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >

              {
                imageUrl !== "" ?
                  <img src={imageUrl} alt="not found" style={{ width: '100%' }} />
                  :
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
              }
            </Upload>
            
          </Form.Item>
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

          <Card title="Datos del profesor">
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
              label="Área de destreza"
              name="area"
              rules={[{ required: true, message: "Porfavor Ingresa un área" }]}
            >
              <Select
                showSearch
                placeholder="Selecciona un área"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                suffixIcon={<AreaChartOutlined />}
              >
                <Option value="Matemática">Matemática</Option>
                <Option value="Lenguaje">Lenguaje</Option>
                <Option value="Ciencias Sociales">Ciencias Sociales</Option>
                <Option value="Ciencias Naturales">Ciencias Naturales</Option>
              </Select>
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
                min={18}
                max={80}
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
              label="Fecha de ingreso"
              name="admissionDate"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker placeholder="YYYY-MM-DD" />
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
