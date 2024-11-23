import React, { useState } from "react";
import { Table, Tag, Button, Popconfirm, Modal, Select, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserTable = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      purchases: 15,
      onlineStatus: "Online",  
      accountStatus: "Active", 
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      purchases: 12,
      onlineStatus: "Offline",
      accountStatus: "Blocked",
    },
    {
      key: "3",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      purchases: 20,
      onlineStatus: "Online",
      accountStatus: "Active",
    },
    {
      key: "4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      purchases: 10,
      onlineStatus: "Offline",
      accountStatus: "Blocked",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user for editing
  const [newStatus, setNewStatus] = useState(""); // Store new status for editing

  // Handle the toggle of Account status (Active/Blocked)
  const handleAccountStatusChange = (key) => {
    const user = data.find((item) => item.key === key);
    setSelectedUser(user);
    setNewStatus(user.accountStatus); // Set the current status in the modal
    setIsModalVisible(true); // Open the modal
  };

  // Handle the modal OK (confirm the changes)
  const handleOk = () => {
    if (!newStatus) {
      message.error("Please select a valid account status.");
      return;
    }

    // Update the user status
    setData((prevData) =>
      prevData.map((item) =>
        item.key === selectedUser.key ? { ...item, accountStatus: newStatus } : item
      )
    );
    setIsModalVisible(false);
    message.success("Account status updated successfully!");
  };

  // Handle the modal Cancel (close the modal without changes)
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle the user delete
  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    message.success("User deleted successfully!");
  };

  // Columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
      key: "purchases",
      sorter: (a, b) => a.purchases - b.purchases,
    },
    {
      title: "Online Status",
      dataIndex: "onlineStatus",
      key: "onlineStatus",
      render: (status) => (
        <Tag color={status === "Online" ? "green" : "gray"}>{status}</Tag>
      ),
    },
    {
      title: "Account Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status, record) => (
        <>
          <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>

        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            style={{ marginLeft: 8 }}
            size="small"
            onClick={() => handleAccountStatusChange(record.key)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="danger" size="small" />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3 className="text-center">User Details</h3>
      <hr />
      <Table dataSource={data} columns={columns} />

      {/* Modal for editing account status */}
      <Modal
        title="Edit Account Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Select
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Blocked">Blocked</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default UserTable;
