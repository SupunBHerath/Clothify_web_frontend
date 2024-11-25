import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, Modal, Select, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteUserAccount, getUsers } from "../../../Service/UserDetailsApi";
import { accountStatusUpdate } from "../../../Service/LoginApi";

const UserTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [data, setData] = useState([
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      purchases: 15,
      onlineStatus: "Online",
      accountStatus: "Active",
    },
  ]);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();

        if (result.status === "200") {
          const formattedData = result.data.map((user) => ({
            key: user.id.toString(),
            id: user.id.toString(),
            name: user.name || "N/A",
            email: user.email || "N/A",
            phoneNumber: user.phoneNumber || "Customer",
            onlineStatus: user.onlineStatus || "Offline",
            accountStatus: user.accountStatus || "Inactive",
          }));

          setData(formattedData);
        } else {
          console.error("Failed to fetch user data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAccountStatusChange = async (key) => {
    const user = data.find((item) => item.key === key);
    setSelectedUser(user);
    setNewStatus(user.accountStatus);
    setIsModalVisible(true);

  };

  const handleOk = async () => {
    if (!newStatus) {
      message.error("Please select a valid account status.");
      return;
    }

    setData((prevData) =>
      prevData.map((item) =>
        item.key === selectedUser.key ? { ...item, accountStatus: newStatus } : item
      )
    );
    console.log(selectedUser);

    try {
      const res = await accountStatusUpdate(selectedUser.key, newStatus)
      if (res.status == 200) {
        message.success("Account status updated successfully!");
      } else {
        message.error("Account Status Update fail..")
      }
    } catch (e) {
      console.error(e);

    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (key) => {
    try {
      const res = await deleteUserAccount(key)
      if (res) {
        setData((prevData) => prevData.filter((item) => item.key !== key));
        message.success("User deleted successfully!");
      } else if(res?.status == "Failed") {
        message.error(res.message)
        localStorage.removeItem("token")
      }else{
        message.error("Error Found Plz Contact Admin..")

      }
    } catch (e) {
      console.error(e);

    }

  };

  const columns = [
    {
      title: "Cus ID",
      dataIndex: "id",
      key: "id",

    },
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
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      <hr />
      <Table
        style={{
          border: "2px solid #F68714",
          borderRadius: "8px",
        }}
        dataSource={data} columns={columns} />

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
