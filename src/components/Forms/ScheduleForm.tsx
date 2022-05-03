//@ts-ignore
//@ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Select, Table, TimePicker, message } from "antd";
import moment from "moment";
import { ModalContext } from "../../context/ModalContext";
import { ActionsContext } from '../../context/AuthContext/ActionsContext/ActionsContext';
import { getData } from "src/services/fetch/getData";
import { putData } from 'src/services/fetch/putData'
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "select" | "input";
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const { Option } = Select;

  const [form] = Form.useForm()

  const getInputNode = (inputName) => {
    
    const getBusyHours = async (teacherId) => {
      const r = await getData('teacher_busy_hours/' + teacherId)
      if(r.status && r.busy_days.length > 0 ){
        return [ parseInt(r.busy_days[0].startTime.substring(0,2)) , parseInt(r.busy_days[1].endTime.substring(0,2))]
      }
    }
  
    function disabledTime(current) {
      if (current) {
        return {
          disabledHours: () => getBusyHours(),
          // disabledMinutes: () => range(30, 60), use this if you need to limit minutes too
        };
      }
    }
  
    if (dataIndex === "teacher") {
      return (
        <Select placeholder="Seleccione un profesor" onChange={(value) => getBusyHours(value)} >
          {record.teachers &&
            record.teachers.length > 0 &&
            record.teachers.map((teacher: any) => (
              <Option value={teacher._id}>
                {teacher.profile.fullName.firstName}
              </Option>
            ))}
        </Select>
      );
    }

    if (dataIndex === "subject") {
      return (
        <Select placeholder="Seleccione una materia">
          {record.subjects.length > 0 &&
            record.subjects.map((subject: any) => (
              <Option value={subject._id}>{subject.name}</Option>
            ))}
        </Select>
      );
    }

    return <TimePicker.RangePicker onChange={(value) => console.log(value)} 
    disabledTime={disabledTime}
    />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex + record.key}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex === 'teacher' || dataIndex === 'subject',
              message: `Por favor ingrese el ${title}!`,
            },
          ]}
        >
          {getInputNode(dataIndex + record.key)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ScheduleForm = () => {
  const { data, hideModal }:any = useContext(ModalContext);
  const { updateAction } = useContext(ActionsContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const initialRequest = async () => {
    const requestTeachers = await getData("teachers");
    const requestSubjects = await getData("subjects");

    if (requestTeachers.status && requestSubjects.status) {
      setDataSource([
        {
          key: 0,
          subject: requestSubjects.subjects[0]._id,
          teacher: requestTeachers.users[0]._id,
          day: "12:00",
          subjects: requestSubjects.subjects,
          teachers: requestTeachers.users,
        },
        {
          key: 1,
          subject: requestSubjects.subjects[0]._id,
          teacher: requestTeachers.users[0]._id,
          day: "12:00",
          subjects: requestSubjects.subjects,
          teachers: requestTeachers.users,
        },
      ]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);

  const days = ["Lunes", "Jueves", "Viernes"];

  const daysForColumns = days.map((day) => {
    return { title: day, dataIndex: day, editable: true };
  });

  console.log("days", daysForColumns);

  const columns = [
    {
      title: "Materia",
      dataIndex: "subject",
      //width: "10%",
      editable: true,
    },
    {
      title: "Profesor",
      dataIndex: "teacher",
      //width: "20%",
      editable: true,
    },
    ...daysForColumns,
  ];

  const getInputType = (dataIndex: string) => {
    if (dataIndex === "subject" || dataIndex === "teacher") {
      return "select";
    }

    return "datepicker";
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: getInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });

  const parseTimePickerValue = (value) => moment(new Date(value) ).format('HH:mm:ss')

  const sendData = async (values) => {  
    const dataValues = { ...values }
    const keys = Object.keys(values)
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
      }
    })

    let schedule = []
    for(let i=0; i<dataSource.length; i++){
      const row = keys.filter((k) => k.includes(i))
      const rowObj = { subject: '', teacher:'', days: [] };
      row.forEach(element => {
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
    let teachers = []
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
    } else {
      message.error("Algo ha salido mal editando el curso")
    }
    setIsSubmitting(false);
  };


  const getInitialValues = () => {
    if(data && 'schedule' in data && data.schedule.length > 0){
      let initialValues = {}
      data.schedule.map((row, rowIndex) => {
        const rowKeys = Object.keys(row)
        rowKeys.forEach(key => {
          let numeredKey = `${key}${rowIndex.toString()}`
          if(key.includes("subject") || key.includes("teacher")){    
            initialValues[numeredKey] = row[key]
          }else{
            row['days'].map(day => {
              if(day!==null){
                initialValues[`${day.day}${rowIndex.toString()}`] = [ moment(day.startTime, 'HH:mm:ss'), moment(day.endTime, 'HH:mm:ss') ]
              }
            }) 
          }
          console.log('data', data.schedule)
        })
      })
      console.log('iv', initialValues)
      //return {}
      return initialValues
    }else{
      return {}
    }
  }


  return (
    <>
      <Form
        onFinish={sendData}
        initialValues={getInitialValues()}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={dataSource}
          loading={isLoading}
        />
        <Button type="primary" htmlType="submit" loading={isSubmitting} >
          Guardar Cambios
        </Button>
      </Form>
    </>
  );
};

export default ScheduleForm;
