import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const DisCard = ({image}) => (
  <Card
    hoverable
    style={{
      width: 350,
      height:350,
    }}
    cover={<img alt="example" src={image} />}
  >
  </Card>
);
export default DisCard;