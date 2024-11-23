import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { getUserByProductQty } from "../../../Service/UserDetailsApi";

const BestCustomersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUserByProductQty();
        
        if (result.status == 200) {

          const formattedData = result.data.map((user) => ({
            key: user?.id, 
            id: "CS0"+user?.id, 
            email: user?.email || "N/A", 
            qty: user?.qty || 0,
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

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Quantity",
      dataIndex: "qty",
      key: "qty",
      sorter: (a, b) => a.qty - b.qty, 
     
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3 className="text-center">Best Customers</h3>
      <hr />
      <Table
        dataSource={data}
        columns={columns}
        style={{
          border: "2px solid #f5222d", 
          borderRadius: "8px", 
        }}
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default BestCustomersTable;
