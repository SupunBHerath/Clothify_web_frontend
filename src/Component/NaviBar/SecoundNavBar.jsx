import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const categories = [
  {
    title: 'Women',
    subcategories: [
      { name: 'Dresses', path: '/women/dresses' },
      { name: 'Tops', path: '/women/tops' },
      { name: 'Pants', path: '/women/pants' },
      { name: 'Shoes', path: '/women/shoes' },
    ],
  },
  {
    title: 'Men',
    subcategories: [
      { name: 'Shirts', path: '/men/shirts' },
      { name: 'Pants', path: '/men/pants' },
      { name: 'Jackets', path: '/men/jackets' },
      { name: 'Shoes', path: '/men/shoes' },
    ],
  },
  {
    title: 'Kids',
    subcategories: [
      { name: 'Boys', path: '/kids/boys' },
      { name: 'Girls', path: '/kids/girls' },
      { name: 'Toys', path: '/kids/toys' },
      { name: 'Accessories', path: '/kids/accessories' },
    ],
  },
  {
    title: 'Baby',
    subcategories: [
      { name: 'Clothing', path: '/baby/clothing' },
      { name: 'Toys', path: '/baby/toys' },
      { name: 'Accessories', path: '/baby/accessories' },
      { name: 'Nursery', path: '/baby/nursery' },
    ],
  },
];

const SecoundNavBar = () => {
  const navigate = useNavigate(); 

  return (
    <Layout>
      <Header style={{ background: '#ffff', display: 'flex', justifyContent: 'start' }}>
        <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
          {categories.map(category => (
            <Dropdown
              key={category.title}
              overlay={
                <Menu>
                  {category.subcategories.map(sub => (
                    <Menu.Item 
                      key={sub.name} 
                      onClick={() => navigate(sub.path)} 
                      style={{ textDecoration: 'none' }} // Remove underline
                    >
                      {sub.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={['hover']}
            >
              <Menu.Item 
                key={category.title} 
                icon={<DownOutlined />} 
                style={{ textDecoration: 'none' }} // Remove underline
              >
                {category.title}
              </Menu.Item>
            </Dropdown>
          ))}
        </Menu>
      </Header>
    </Layout>
  );
};

export default SecoundNavBar;
