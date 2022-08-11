import React, { useState } from "react";
import { Form, Input, Button, message, DatePicker, Select } from "antd";
import { postData } from "src/services/fetch/postData";
import { putData } from "src/services/fetch/putData";
import moment from 'moment';
import { ObjectId } from "bson";


interface IProps {
    mode: string
    data: any
    courses: any[]
}

const { Option } = Select;

const ActivityForm = ({ mode, courses, data }: IProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinishAdd = async (values: any) => {
        console.log('values', values)
    };

    const onFinishEdit = async (values: any) => {
        console.log('values')
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('Algo ha salido mal, reinténtalo más tarde o ponte en contacto con los administradores del sistema');
    };


    return (
        <>
            {mode === "ADD" && (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishAdd}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Título"
                        name="title"
                        rules={[{ required: true, message: "Ingresa el título de la actividad" }]}
                    >
                        <Input placeholder="Tarea #1" />
                    </Form.Item>


                    <Form.Item
                        label="Descripción"
                        name="description"
                        rules={[{ required: true, message: "Ingresa el título de la actividad" }]}
                    >
                        <Input placeholder="Completar las páginas 5 y 6" />
                    </Form.Item>


                    <Form.Item
                        label="Fecha de cierre"
                        name="closeDate"
                        rules={[{ required: true, message: "Ingresa la fecha de cierre" }]}
                    >
                        <DatePicker />
                    </Form.Item>


                    <Form.Item
                        label="Curso"
                        name="course_id"
                        rules={[{ required: true, message: "Seleccione un curso!!" }]}
                    >
                        <Select placeholder="Seleccionar curso" >
                            {
                                courses.map((course: any) => <Option value={course._id}>{course.name}</Option>)
                            }
                        </Select>
                    </Form.Item>


                   
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            Agregar Actividad
                        </Button>
                    </Form.Item>
                </Form>
            )}
            {mode === "EDIT" && (
                <Form
                    initialValues={{
                        title: data.title,
                        description: data.description,
                        closeDate: moment(data.closeDate),
                        course_id: data.course_id
                    }}
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinishEdit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                      <Form.Item
                        label="Título"
                        name="title"
                        rules={[{ required: true, message: "Ingresa el título de la actividad" }]}
                    >
                        <Input placeholder="Tarea #1" />
                    </Form.Item>


                    <Form.Item
                        label="Descripción"
                        name="description"
                        rules={[{ required: true, message: "Ingresa el título de la actividad" }]}
                    >
                        <Input placeholder="Completar las páginas 5 y 6" />
                    </Form.Item>


                    <Form.Item
                        label="Fecha de cierre"
                        name="closeDate"
                        rules={[{ required: true, message: "Ingresa la fecha de cierre" }]}
                    >
                        <DatePicker />
                    </Form.Item>


                    <Form.Item
                        label="Curso"
                        name="course_id"
                        rules={[{ required: true, message: "Seleccione un curso!!" }]}
                    >
                        <Select placeholder="Seleccionar curso" >
                            {
                                courses.map((course: any) => <Option value={course._id}>{course.name}</Option>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={isSubmitting}>
                            Editar Actividad
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default ActivityForm; 
