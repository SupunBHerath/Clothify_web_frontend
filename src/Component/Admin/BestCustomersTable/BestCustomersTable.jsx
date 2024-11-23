import React from "react";
import { Table, Tag } from "antd";

const BestCustomersTable = () => {
  // Sample data
  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      purchases: 15,
      status: "Active",  // Active status
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      purchases: 12,
      status: "Offline",  // Offline status
    },
    {
      key: "3",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      purchases: 20,
      status: "Active",  // Active status
    },
    {
      key: "4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      purchases: 10,
      status: "Offline",  // Offline status
    },
  ];

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
      sorter: (a, b) => a.purchases - b.purchases, // Sortable by number of purchases
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "gray"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3 className="text-center">Best Customers</h3>
      <hr />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default BestCustomersTable;
