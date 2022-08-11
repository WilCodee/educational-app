import { Button, Card, Modal, Select, Skeleton } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import ActivityForm from 'src/components/Forms/ActivityForm';
import { AuthContext } from 'src/context/AuthContext';
import { getData } from 'src/services/fetch/getData';


const { Option } = Select

const ActivitiesPage = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("ADD")

    const initialRequest = async () => {
        setLoading(true);
        let request = await getData(`courses_by_teacher/${user._id}`);
        if (request.status) {
            const coursesToTable = request.courses.map((course: any) => {
                course.key = course["_id"];
                return course;
            });
            setCourses(coursesToTable);
            setLoading(false);
        }
    };

    useEffect(() => {
        initialRequest();
    }, []);

    const handleAddActivity = () => {
        setShowModal(true)
        setMode("ADD")
    }

    const handleUpdateActivity = () => {
        setShowModal(true)
        setMode("UPDATE")
    }

    const handleCancel = () => {
        setShowModal(false)
        setMode("ADD")
    }

    return (
        <Card title="Actividades" extra={<Button type="primary" onClick={handleAddActivity}  >Crear actividad</Button>} >

            {
                loading ? <Skeleton /> :
                    <div>
                        <span>Filtrar por:
                            <Select placeholder="Seleccionar curso" >
                                {
                                    courses.map((course: any) => <Option value={course._id}>{course.name}</Option>)
                                }
                            </Select>
                        </span>

                        {
                            showModal &&
                            <Modal title={mode === "ADD" ? "Nueva Actividad" : "Actualizar Actividad"} visible={showModal} footer={null} onCancel={handleCancel} >
                                <ActivityForm
                                    mode={mode}
                                    courses={courses}
                                    data={mode === "ADD" ? {} : {}}
                                />
                            </Modal>
                        }
                    </div>
            }
        </Card>
    )
}

export default ActivitiesPage; 