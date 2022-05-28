import React, { useEffect, useState, useContext } from "react";
import { Table, InputNumber, Form, message, Button } from "antd";
import { getData } from "src/services/fetch/getData";
import { ModalContext } from "src/context/ModalContext";
import "./styles.css";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
  form: any;
}

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  form,
  ...restProps
}) => {
  console.log('record', record)
  console.log('restprops', restProps)
  const getRowValues = () => {
    if (form) {
      console.log("fields value", form.getFieldsValue());
      const allKeys = Object.keys(form.getFieldsValue());
      const rowKeys = allKeys.filter((key: any) => key.includes("grade" + index.toString() ));
      console.log("row", rowKeys);
      let rowSum = 0;
      rowKeys.map((rowKey) => (rowSum += form.getFieldsValue()[rowKey].value));
      console.log('rowSUm', rowSum)
      console.log('rowKeys', rowKeys.length)
      let average = rowSum / rowKeys.length;
      form.setFieldsValue({ ["average0" + index]: { value: average} });
    }
  };
  
  console.log('dataindex', dataIndex)
  console.log('index', index)
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={[index + dataIndex, 'value']}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Por favor ingrese ${title}!`,
            },
            {
              pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
              message: "Debe ser un número",
            },
          ]}
          initialValue={0}
        >
          <InputNumber
            min={0}
            max={10}
            disabled={title === "Promedio" ? true : false}
            onChange={(value) => getRowValues()}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const GradeForm = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data }: any = useContext(ModalContext);
  const [columns, setColumns] = useState([
    {
      title: "Estudiante",
      width: "25%",
      dataIndex: "student",
      editable: false,
      render: (_: any, record: any) => (
        <label>{record.profile.fullName.firstName}</label>
      ),
    },
  ]);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item, rowIndex: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
        index: rowIndex,
        form,
      }),
    };
  });

  const initialRequest = async () => {
    setLoading(true);
    const request = await getData("students_by_course/" + data._id);
    if (request.status) {
      setTableData(request.students);
      setLoading(false);
      return;
    }
    message.error("No se pudo traer los estudiantes!");
    setLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  const addGrade = () => {
    let basedColumn = {
      title: "Nota " + (columns.length - 1),
      dataIndex: "grade" + (columns.length - 1),
      editable: true,
      index: tableData.length - 1,
      form,
    };
    if (columns.length === 1) {
      setColumns((prevState: any) => [
        ...prevState,
        {
          title: "Promedio",
          width: "10%",
          dataIndex: "average" + (columns.length - 1),
          editable: true,
          index: tableData.length - 1,
          form,
        },
      ]);
    }

    if (columns.length > 1) {
      setColumns((prevState: any) => [...prevState, basedColumn]);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
       console.log('values', values)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button onClick={addGrade} icon={<PlusCircleOutlined />}>
          AGREGAR NOTA
        </Button>
        {columns.length > 2 && (
          <Button
            onClick={() => {
              let copy = [...columns];
              let poped: any = copy.slice(0, -1);
              let last = mergedColumns.at(-1)
              let lastField = last!.dataIndex  + (tableData.length-1)
              form.setFieldsValue( { [lastField]: 0 })
              setColumns(poped);
            }}
            icon={<MinusCircleOutlined />}
          >
            ELIMINAR NOTA
          </Button>
        )}
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={false}
        />
        <div style={{ marginTop: 12 }}>
          <Button htmlType="submit" onClick={handleSubmit} type="primary">
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GradeForm;
