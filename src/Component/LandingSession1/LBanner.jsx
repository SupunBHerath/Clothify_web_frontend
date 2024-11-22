import React from 'react';
import banner from "../../assets/Landing/Kids Fashion.png";

export default function LBanner() {
  return (
    <div
    className='shadow-lg mt-4'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%', 
        maxWidth: '970px', 
        height: '250px',
        margin: '0 auto', 
      }}
    />
  );
}
