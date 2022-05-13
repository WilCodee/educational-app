import React, { useEffect, useState } from "react";
import { Row, Col, Form, Select, TimePicker, Button } from "antd";
import { getData } from "../../services/fetch/getData";

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

  const handleSubmit = (values: any) => {
    console.log("values", values);
  };

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
    const r = await getData("teacher_busy_hours/" + teacherId);
    console.log('r', r)
    if (r.status && r.busy_days.length > 0) {
      console.log('r', r)
      console.log("aa", [
        parseInt(r.busy_days[0].startTime.substring(0, 2)),
        parseInt(r.busy_days[1].endTime.substring(0, 2)),
      ]);
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

  const getDisabledHours = (disabledTimes: string[]) => {
    let disabledHours: any[] = [];
    disabledTimes.map((disabledTime: string) =>
      disabledHours.push(parseInt(disabledTime.substring(0, 2)))
    );

    
    return disabledHours;
  };

  const getDisabledMinutes = (disabledTimes: string[]) => {
    let disabledMinutes: any[] = [];
    disabledTimes.map((disabledTime: string) =>
      disabledMinutes.push(parseInt(disabledTime.substring(3, 5)))
    );
    return disabledMinutes;
  };

  const getBusyHoursInterval = (disabledStartTimes:string[], disabledEndTimes:string[]) => {
    let disabledHours: any[] = [];
    disabledStartTimes.map((disabledTime: string) =>
      disabledHours.push(parseInt(disabledTime.substring(0, 2)))
    );
    disabledEndTimes.map((disabledTime: string) =>
      disabledHours.push(parseInt(disabledTime.substring(0, 2)))
    );
    console.log('disabled hours', disabledHours)
    
    const lowEnd = disabledHours[0];
    const highEnd = disabledHours[1];
    const list = [];
    for (var i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
    console.log(list)
    return list; 
    //return disabledHours;
  }

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
      const columnDay = currentTeacher["busyDays"].find(
        (busyDay: any) => busyDay.day === day
      );
      if (
        columnDay &&
        "disabledStartTimes" in columnDay &&
        inputType === "start"
      ) {
        if (timeType === "hours") {
          return getBusyHoursInterval(columnDay.disabledStartTimes, columnDay.disabledEndTimes)
        }
      }
      if (columnDay && "disabledEndTimes" in columnDay && inputType === "end") {
        if (timeType === "hours") {
          return getBusyHoursInterval(columnDay.disabledStartTimes, columnDay.disabledEndTimes)
        }
      }
    }
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
      <Form form={form} onFinish={handleSubmit}>
        {items.map((item) => (
          <Row>
            <Col span={2}>
              <Form.Item name={"teacher" + item.rowIndex}>
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
              <Form.Item name={"subject" + item.rowIndex}>
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
                      }
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
                      }
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
                      }
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
                      }
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
                      }
                    };
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScheduleSelector;
