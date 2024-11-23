import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';

const HeaderCard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Row gutter={[16, 16]} justify="center" align="top" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* Order Details Card */}
      <Col xs={24} sm={12} md={8} style={{ display: 'flex' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCartOutlined style={{ fontSize: '18px', marginRight: '8px', color: '#1890ff' }} />
              <span>Order Details</span>
            </div>
          }
          bordered
          style={{
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '180px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '-70px' }}>
            <div style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}>
              <Tag icon={<SyncOutlined spin />} color="processing">
                Processing
              </Tag>
              <h5 style={{ margin: 0 }}>6</h5>
            </div>
            <div style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}>
              <Tag icon={<SyncOutlined spin />} color="pink">
                Delivering
              </Tag>
              <h5 style={{ margin: 0 }}>6</h5>
            </div>
            <div style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}>
              <Tag icon={<CheckCircleOutlined />} color="success">
                Delivered
              </Tag>
              <h5 style={{ margin: 0 }}>6</h5>
            </div>
            <div style={{ flex: '1', minWidth: '100px', textAlign: 'center' }}>
              <Tag icon={<CloseCircleOutlined />} color="error">
                Rejected
              </Tag>
              <h5 style={{ margin: 0 }}>6</h5>
            </div>
          </div>

        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} style={{ display: 'flex' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserOutlined style={{ fontSize: '18px', marginRight: '8px', color: '#f5222d' }} />
              <span>Total Users</span>
            </div>
          }
          bordered
          style={{
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '180px',
            justifyContent: 'space-between',
          }}
        >
          <p>Currently active and registered users.</p>
        </Card>
      </Col>
      {/* Selling Products Card */}
      <Col xs={24} sm={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClockCircleOutlined  style={{ fontSize: '18px', marginRight: '8px', color: '#52c41a' }} />
              <span>Time And Date</span>
            </div>
          }
          bordered
          style={{
            borderRadius: '12px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            width: '100%',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: '30px', fontWeight: 'bold', margin: 0 }}>{currentDateTime.toLocaleTimeString()}</p>
            <p style={{ fontSize: '20px', margin: 0 }}>{currentDateTime.toLocaleDateString()}</p>
          </div>
        </Card>
      </Col>


      {/* Total Users Card */}

    </Row>
  );
};

export default HeaderCard;
