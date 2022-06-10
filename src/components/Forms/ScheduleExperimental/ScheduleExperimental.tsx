import React, { useEffect, useContext, useState } from 'react'
import { getData } from 'src/services/fetch/getData';
import { ModalContext } from "src/context/ModalContext"
import { Button, Form, Select, Row, Col } from 'antd';

const ScheduleExperimental = () => {
    const { data, hideModal }: any = useContext(ModalContext);
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])
    const { Option } = Select

    const getInitialData = async () => {
        const r = await getData("teachers");
        if (r.status) {
            setTeachers(r.users);
        }
        const r2 = await getData("subjects");
        if (r2.status) {
            setSubjects(r2.subjects);
        }
    }

    const getBusyHours = async (teacherId: string) => {
        const r = await getData("teacher_busy_hours/" + teacherId + "/" + data._id);
        console.log("r", r);
    }

    useEffect(() => {
        setTimeout(() => getInitialData(), 2500)
        console.log('teachers', teachers)
        console.log('subbjects', subjects)
        getBusyHours(teachers[0])
    }, [])

    const items = [
        {
            id: 1,
            value: "7:00"
        },
        {
            id: 2,
            value: "7:30"
        },
        {
            id: 3,
            value: "8:00"
        },
        {
            id: 4,
            value: "8:30"
        },
        {
            id: 5,
            value: "9:00"
        },
        {
            id: 6,
            value: "9:30"
        },
        {
            id: 7,
            value: "10:00"
        },
        {
            id: 8,
            value: "10:30"
        },
        {
            id: 9,
            value: "11:00"
        },
        {
            id: 10,
            value: "11:30"
        },
        {
            id: 11,
            value: "12:00"
        },
        {
            id: 12,
            value: "12:30"
        },
        {
            id: 13,
            value: "13:00"
        }
    ]

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    return (
        <div>

            <Row>
                <Col span={2}>
                    <h4 style={{ textAlign: "center" }}>Profesor</h4>
                </Col>
                <Col span={2}>
                    <h4 style={{ textAlign: "center" }}>Materia</h4>
                </Col>
                {days.map((day) =>
                    <Col span={4}>
                        <h4 style={{ textAlign: "center" }}>{day}</h4>
                    </Col>
                )}
            </Row>
            {
                teachers.map((scheduleItem: any) =>
                    <Row>
                        <Col span={2}>
                            <Form.Item>
                                <Select>
                                    {
                                        teachers.map((teacher: any) => <Option value={teacher._id} >{teacher.profile.fullName.firstName}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item >
                                <Select>
                                    {
                                        subjects.map((subject: any) => <Option value={subject._id} >{subject.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        {
                            days.map((day: any) => (
                                <>
                                <Col span={2}>
                                    <Form.Item>
                                        <Select>
                                            {
                                                items.map((item: any) => <Option value={item.id} >{item.value}</Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item>
                                        <Select>
                                            {
                                                items.map((item: any) => <Option value={item.id} >{item.value}</Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                </>
                            ))
                        }

                    </Row>

                )
            }
            <Button onClick={hideModal}>Cancelar</Button>
        </div >
    )
}

export default ScheduleExperimental; 