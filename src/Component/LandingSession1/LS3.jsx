import React, { useEffect, useState } from 'react';
import s3 from '../../assets/Landing/s3.png';

export default function LS3() {
  const [height, setHeight] = useState("100vh");

  const updateHeight = () => {
    const width = window.innerWidth;
    if (width < 576) setHeight("40vh"); // Extra small screens
    else if (width < 768) setHeight("50vh"); // Small screens
    else if (width < 992) setHeight("75vh"); // Medium screens
    else setHeight("100vh"); // Large screens
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className='mt-5'
      style={{
        backgroundImage: `url(${s3})`,
        height: height,
        width: "100%",
        backgroundSize: window.innerWidth < 768 ? "contain" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "height 0.3s ease",
      }}
    ></div>
  );
}
