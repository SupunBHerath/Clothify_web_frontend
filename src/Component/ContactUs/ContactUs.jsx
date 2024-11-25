import React from "react";
import { Row, Col, Typography, Space, Image } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import log from "../../assets/Logo/logo.png"
const { Title, Text } = Typography;

const ContactUs = () => {
  return (
    <div id="contactus" style={{ padding: "20px" }}>
    <br /><br /><br />

      <h2 className="fw-bold text-center">Contact Us</h2>
      <hr />
    
    <div style={{ padding: "20px" }} className="mt-5 shadow-lg">
      <Row
        gutter={[16, 16]}
        align="middle"
        justify="center"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#fff",
          borderColor:"#F68714"
        }}
      >
       

        <Col xs={24} md={12} style={{ padding: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "0px" }}>
            <Image
              src={log} 
              alt="Clothify Store Logo"
              preview={false}
              width={200}
            />
          </div>
          <Title level={3} style={{ marginBottom: "20px", color: "#333" }}>
          Clothify Store (PVT) Ltd. 
          </Title>
          <Space direction="vertical" size="middle">
            <Space>
              <EnvironmentOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
              <Text>Clothify Store , Panadura</Text>
            </Space>
            <Space>
              <PhoneOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
              <Text>+94 123 456 789 </Text>
            </Space>
            <Space>
              <MailOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
              <Text>clothify@sample.com</Text>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ height: "100%", overflow: "hidden" }}>
            <iframe
              title="Clothify Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094313!2d144.95373531550415!3d-37.81627974291114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57738f0b678f0d5!2sFederation+Square!5e0!3m2!1sen!2sau!4v1690064840000!5m2!1sen!2sau"
              width="100%"
              height="400"
              style={{ border: "none" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </div>
    </div>

  );
};

export default ContactUs;
