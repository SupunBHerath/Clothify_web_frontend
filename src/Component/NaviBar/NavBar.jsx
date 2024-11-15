import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Space, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LoginDrawer from "../DrawerLogin/DrawerLogin";
import ShopingCardDrawer from "../ShopingCradDrawer/ShopingCardDrawer";

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Header
        style={{
          backgroundColor: "#F68714",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        <Title
          level={4}
          style={{ color: "white", margin: 0, fontWeight: "900" }}
        >
          CLOTHIFY STORE
        </Title>

        {/* Display either desktop nav or mobile menu based on `isMobile` state */}
        {isMobile ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: isMobile ? 0 : "auto",
              }}
            >
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <ShopingCardDrawer />
              </Space>
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <LoginDrawer />
              </Space>
            </div>
            <div
              onClick={showDrawer}
              style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
            >
              <MenuOutlined />
            </div>
          </>
        ) : (
          <>
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Category
                </Button>
              </Space>
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  New Arrival
                </Button>
              </Space>
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Discount
                </Button>
              </Space>
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Contact Us
                </Button>
              </Space>
            </nav>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: isMobile ? 0 : "auto",
              }}
            >
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <ShopingCardDrawer />
              </Space>
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <LoginDrawer />
              </Space>
            </div>
          </>
        )}
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        visible={visible}
        style={{ maxWidth: "80%" }}
      >
        
        <Space direction="vertical" >

          <Button
            type="link"
            style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            onClick={onClose}
          >
            Category
          </Button>
          <Button
            type="link"
            style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            onClick={onClose}
          >
            New Arrival
          </Button>
          <Button
            type="link"
            style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            onClick={onClose}
          >
            Discount
          </Button>
          <Button
            type="link"
            style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            onClick={onClose}
          >
            Contact Us
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default NavBar;
