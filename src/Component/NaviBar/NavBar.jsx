import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Space, Drawer } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import LoginDrawer from "../DrawerLogin/DrawerLogin";
import ShopingCardDrawer from "../ShopingCradDrawer/ShopingCardDrawer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const { role, loading, isLogin } = useUser();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };


  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate, loading]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleProfile = () => {
    if (isLogin) {
      navigate("profile");
    } else {
      alert("Please log in to view your profile. ", role);
      console.log(role);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        width:"100%",
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
          onClick={() => navigate("")}
          style={{ color: "white", margin: 0, fontWeight: "900" }}
        >
          CLOTHIFY STORE
        </Title>

        {isMobile ? (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <ShopingCardDrawer />
              </Space>
              {!isLogin && (
                <Space
                  style={{
                    color: "black",
                    cursor: "pointer",
                    marginRight: "20px",
                  }}
                >
                  <LoginDrawer />
                </Space>
              )}
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
                  onClick={() => navigate("")}
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Home
                </Button>
              </Space>
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  onClick={() => navigate("category")}
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Products
                </Button>
              </Space>
              <Space style={{ marginRight: "20px" }}>
                <Button
                  type="link"
                  onClick={() => navigate("category")}
                  style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                >
                  Contact Us
                </Button>
              </Space>
            </nav>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Space
                style={{
                  color: "black",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <ShopingCardDrawer />
              </Space>
              {!isLogin && (
                <Space
                  style={{
                    color: "black",
                    cursor: "pointer",
                    marginRight: "20px",
                  }}
                >
                  <LoginDrawer />
                </Space>
              )}
              {isLogin && (
                <Space
                  style={{
                    color: "black",
                    cursor: "pointer",
                    marginRight: "20px",
                  }}
                >
                  <UserOutlined className="text-white fw-bolder" onClick={handleProfile} />
                </Space>
              )}
            </div>
          </>
        )}
      </Header>

      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible}>
        <Space direction="vertical">
          <Button
            type="link"
            style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            onClick={() => {
              navigate("category");
              onClose();
            }}
          >
            Products
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
