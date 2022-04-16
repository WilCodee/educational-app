//@ts-ignore
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Select, Table, TimePicker } from "antd";
import { getData } from "src/services/fetch/getData";

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

  const getInputNode = () => {
    if (dataIndex === "teacher") {
      return (
        <Select defaultValue={record.teacher}>
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
        <Select defaultValue={record.subject}>
          {record.subjects.length > 0 &&
            record.subjects.map((subject: any) => (
              <Option value={subject._id}>{subject.name}</Option>
            ))}
        </Select>
      );
    }

    return <TimePicker.RangePicker onChange={value => console.log(value)} />

  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {getInputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ScheduleForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const initialRequest = async () => {
    const requestTeachers = await getData("teachers");
    const requestSubjects = await getData("subjects");

    if (requestTeachers.status && requestSubjects.status) {
      setDataSource([
        {
          key: "0",
          subject: requestSubjects.subjects[0]._id,
          teacher: requestTeachers.users[0]._id,
          day: "12:00",
          subjects: requestSubjects.subjects,
          teachers: requestTeachers.users,
        },
        {
          key: "1",
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

  const days = ['Lunes', 'Jueves', 'Viernes']

  const daysForColumns = days.map((day) => { 
    return {title: day, dataIndex:day, editable: true} 
  })  

  console.log('days', daysForColumns)
    

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
    ...daysForColumns
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

  return (
    <>
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
    </>
  );
};

export default ScheduleForm;
