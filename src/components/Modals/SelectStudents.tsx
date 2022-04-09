import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "antd";
import { getData } from "../../services/fetch/getData";
import { StudentsColumns } from "../../data/columns";

const SelectStudents = ({ selectedStudents, setSelectedStudents }) => {
  const [showModal, setShowModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const handleOk = () => setShowModal(false)
  
  const handleCancel = () => {
    setSelectedStudents([])
    setShowModal(false)
  }

  const initialRequest = async () => {
    setTableLoading(true);
    const request = await getData("students");
    if (request.status) {
      const usersToTable = request.users.map((user: any) => {
        user.key = user["_id"];
        return user;
      });
      setStudents(usersToTable);
    }
    setTableLoading(false);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedStudents(selectedRows);
    },
  };

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>Agregar/Quitar Estudiantes</Button>
      <Modal
        title="Selecciona los estudiantes"
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width="auto"
      >
        <Table
          rowSelection={rowSelection}
          columns={StudentsColumns}
          dataSource={students}
          loading={tableLoading}
        />
      </Modal>
    </>
  );
};

export default SelectStudents;
