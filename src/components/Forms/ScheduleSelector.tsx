import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Form, Select, TimePicker, Button, message } from "antd";
import { getData } from "../../services/fetch/getData";
import moment from "moment";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from '../../context/AuthContext/ActionsContext/ActionsContext';
import { putData } from 'src/services/fetch/putData'


const items = [
  {
    rowIndex: 0,
    teacher: "Pablo",
    subject: "Mate",
    days: [
      {
        day: "Lunes",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        day: "Jueves",
        startTime: "12:00",
        endTime: "14:00",
      },
    ],
  },
  {
    rowIndex: 1,
    teacher: "Pedro",
    subject: "Mate",
    days: [
      {
        day: "Lunes",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        day: "Jueves",
        startTime: "12:00",
        endTime: "14:00",
      },
    ],
  },
];

const ScheduleSelector = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { Option } = Select;
  const [form] = Form.useForm();
  const { data, hideModal }:any = useContext(ModalContext);
  const { updateAction } = useContext(ActionsContext)

  const [isSubmitting, setIsSubmitting] = useState(false)


  const initialRequest = async () => {
    const r = await getData("teachers");
    if (r.status) {
      setTeachers(r.users);
    }
    const r2 = await getData("subjects");
    if (r2.status) {
      setSubjects(r2.subjects);
    }
  };

  const getBusyHours = async (teacherId: string) => {
    const r = await getData("teacher_busy_hours/" + teacherId + "/" + data._id);
    console.log("r", r);
    if (r.status && r.busy_days.length > 0) {
      const tc: any = [...teachers];
      const teacherIndex = tc.findIndex(
        (teacher: any) => teacher._id === teacherId
      );
      tc[teacherIndex]["busyDays"] = [];
      r.busy_days.map((busyDay: any) =>
        tc[teacherIndex]["busyDays"].push({
          day: busyDay.day,
          disabledStartTimes: [busyDay.startTime],
          disabledEndTimes: [busyDay.endTime],
        })
      );
      console.log("updated teacher", tc[teacherIndex]["busyDays"]);
      setTeachers(tc);
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);



  const getBusyHoursInterval = (
    disabledStartTimes: string[],
    disabledEndTimes: string[]
  ) => {
    let disabledHours: any[] = [];
    disabledStartTimes.map((disabledTime: string) =>
      disabledHours.push(parseInt(disabledTime.substring(0, 2)))
    );
    disabledEndTimes.map((disabledTime: string) =>
      disabledHours.push(parseInt(disabledTime.substring(0, 2)))
    );
    console.log("disabled hours", disabledHours);

    const lowEnd = disabledHours[0];
    const highEnd = disabledHours[1];
    const list = [];
    for (var i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
    console.log(list);
    return list;
    //return disabledHours;
  };

  const getScheduleDay = (
    day: string,
    rowIndex: any,
    inputType: string,
    timeType: string
  ) => {
    const currentTeacher: any = teachers.find(
      (teacher: any) => teacher._id === form.getFieldValue("teacher" + rowIndex)
    );
    if (currentTeacher && "busyDays" in currentTeacher) {
      console.log(
        "el profesor existe y tiene dias ocupados",
        currentTeacher["busyDays"]
      );
      const columnDay = currentTeacher["busyDays"].filter(
        (busyDay: any) => busyDay.day === day
      );
      console.log("column day", columnDay);
      if (
        columnDay &&
        columnDay.length > 0 &&
        //"disabledStartTimes" in columnDay &&
        inputType === "start"
      ) {
        if (timeType === "hours") {
          if (columnDay.length === 1) {
            console.log("solo un intervalo");
            return getBusyHoursInterval(
              columnDay[0].disabledStartTimes,
              columnDay[0].disabledEndTimes
            );
          }
          if (columnDay.length > 1) {
            console.log("mas de un intervalo");
            let interval: any = [];
            columnDay.map((day: any) => {
              interval = [
                ...interval,
                ...getBusyHoursInterval(
                  day.disabledStartTimes,
                  day.disabledEndTimes
                ),
              ];
            });
            return interval;
          }
        }
      }
      if (
        columnDay &&
        columnDay.length > 0 &&
        //"disabledEndTimes" in columnDay &&
        inputType === "end"
      ) {
        if (timeType === "hours") {
          if (columnDay.length === 1) {
            return getBusyHoursInterval(
              columnDay[0].disabledStartTimes,
              columnDay[0].disabledEndTimes
            );
          }
          if (columnDay.length > 1) {
            let interval: any = [];
            columnDay.map((day: any) => {
              interval = [
                ...interval,
                ...getBusyHoursInterval(
                  day.disabledStartTimes,
                  day.disabledEndTimes
                ),
              ];
            });
            return interval;
          }
        }
      }
    }
  };

  const parseTimePickerValue = (value:any) => moment(new Date(value) ).format('HH:mm:ss')

  const sendData = async (values:any) => {  
    const dataValues:any = { ...values }
    const keys = Object.keys(values)
    let emptyDays = 0
    keys.forEach((key, index) => {
      if(Array.isArray(values[key])){
        console.log('index', index)
        let dayName = key.replace(/[0-9]/g, '')
        console.log('dayName', dayName)
        dataValues[key] =  {
          day: dayName,
          startTime: parseTimePickerValue(values[key][0]['_d']), 
          endTime: parseTimePickerValue(values[key][1]['_d'])
        } 
      }else{
        emptyDays +=1
      }
    })
    if(emptyDays===14){
      message.error("Debe completar al menos un día!")
      return;
    }
    
    let schedule = []
    for(let i=0; i<items.length; i++){
      const row = keys.filter((k:any) => k.includes(i))
      const rowObj:any = { subject: '', teacher:'', days: [] };
      row.forEach((element:any)=> {
        if(element.includes("teacher")){
          rowObj.teacher = dataValues[element];
        }
        if(element.includes("subject")){
          rowObj.subject = dataValues[element]
        }
        if(!(element.includes("teacher")) && !(element.includes("subject"))){
          rowObj.days.push(dataValues[element])
        }
      });
      schedule.push(rowObj)
    }
    console.log('schedule', schedule)
    
    
    //LOGIC TO SAVE TEACHERS ON INDEPENDENT ARRAY INTO COURSE DOCUMENT
    let teachersKeys = keys.filter((k) => k.includes('teacher'))
    let teachers:any = []
    teachersKeys.map((tk) => {
      teachers.push(values[tk])
    })

    
    
    setIsSubmitting(true);
    const updateRequest = await putData(`courses/${data._id}`, { schedule, teachers });
    if (updateRequest.status) {
      message.success("Curso editado exitosamente")
      let updatedCourse = updateRequest.course
      updatedCourse.key = updatedCourse._id
      updateAction(updatedCourse._id, updatedCourse)
      hideModal()
    } else {
      message.error("Algo ha salido mal editando el curso")
    }
    setIsSubmitting(false);
    
  };

  return (
    <div>
      <Row>
        <Col span={2}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Profesor</h4>{" "}
        </Col>
        <Col span={2}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Materia</h4>{" "}
        </Col>
        <Col span={4}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Lunes</h4>{" "}
        </Col>
        <Col span={4}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Martes</h4>{" "}
        </Col>
        <Col span={4}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Miércoles</h4>{" "}
        </Col>
        <Col span={4}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Jueves</h4>{" "}
        </Col>
        <Col span={4}>
          {" "}
          <h4 style={{ textAlign: "center" }}>Viernes</h4>{" "}
        </Col>
      </Row>
      <Form form={form} onFinish={sendData}>
        {items.map((item) => (
          <Row>
            <Col span={2}>
              <Form.Item name={"teacher" + item.rowIndex}
              rules={[{ required: true, message: 'Debe seleccionar un profesor!' }]} 
              >
                <Select
                  placeholder="Seleccionar el profesor"
                  onChange={(value) => getBusyHours(value)}
                >
                  {teachers &&
                    teachers.length > 0 &&
                    teachers.map((teacher: any) => (
                      <Option value={teacher._id}>
                        {teacher.profile.fullName.firstName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name={"subject" + item.rowIndex}
              rules={[{ required: true, message: 'Debe seleccionar una materia!' }]} 
              >
                <Select placeholder="Seleccionar la materia">
                  {subjects &&
                    subjects.length > 0 &&
                    subjects.map((subject: any) => (
                      <Option value={subject._id}>{subject.name}</Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={"Lunes" + item.rowIndex}>
                <TimePicker.RangePicker
                  //@ts-ignore
                  //@ts-nocheck
                  disabledTime={(current, type) => {
                    return {
                      disabledHours: () => {
                        if (type === "start") {
                          return getScheduleDay(
                            "Lunes",
                            item.rowIndex,
                            "start",
                            "hours"
                          );
                        }
                        if (type === "end") {
                          return getScheduleDay(
                            "Lunes",
                            item.rowIndex,
                            "end",
                            "hours"
                          );
                        }
                      },
                    };
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={"Martes" + item.rowIndex}>
                <TimePicker.RangePicker
                  //@ts-ignore
                  //@ts-nocheck
                  disabledTime={(current, type) => {
                    return {
                      disabledHours: () => {
                        if (type === "start") {
                          return getScheduleDay(
                            "Martes",
                            item.rowIndex,
                            "start",
                            "hours"
                          );
                        }
                        if (type === "end") {
                          return getScheduleDay(
                            "Martes",
                            item.rowIndex,
                            "end",
                            "hours"
                          );
                        }
                      },
                    };
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={"Miercoles" + item.rowIndex}>
                <TimePicker.RangePicker
                  //@ts-ignore
                  //@ts-nocheck
                  disabledTime={(current, type) => {
                    return {
                      disabledHours: () => {
                        if (type === "start") {
                          return getScheduleDay(
                            "Miercoles",
                            item.rowIndex,
                            "start",
                            "hours"
                          );
                        }
                        if (type === "end") {
                          return getScheduleDay(
                            "Miercoles",
                            item.rowIndex,
                            "end",
                            "hours"
                          );
                        }
                      },
                    };
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={"Jueves" + item.rowIndex}>
                <TimePicker.RangePicker
                  //@ts-ignore
                  //@ts-nocheck
                  disabledTime={(current, type) => {
                    return {
                      disabledHours: () => {
                        if (type === "start") {
                          return getScheduleDay(
                            "Jueves",
                            item.rowIndex,
                            "start",
                            "hours"
                          );
                        }
                        if (type === "end") {
                          return getScheduleDay(
                            "Jueves",
                            item.rowIndex,
                            "end",
                            "hours"
                          );
                        }
                      },
                    };
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={"Viernes" + item.rowIndex}>
                <TimePicker.RangePicker //@ts-ignore
                  //@ts-nocheck
                  disabledTime={(current, type) => {
                    return {
                      disabledHours: () => {
                        if (type === "start") {
                          return getScheduleDay(
                            "Viernes",
                            item.rowIndex,
                            "start",
                            "hours"
                          );
                        }
                        if (type === "end") {
                          return getScheduleDay(
                            "Viernes",
                            item.rowIndex,
                            "end",
                            "hours"
                          );
                        }
                      },
                    };
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isSubmitting} >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScheduleSelector;
