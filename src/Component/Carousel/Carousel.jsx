import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import s1 from "../../assets/Landing/side1.jpg";
import s2 from "../../assets/Landing/T1 1.png";

const images = [s1, s2];

const SideShow = () => {
  const [height, setHeight] = useState("100vh");
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    if (newWidth < 576) setHeight("40vh"); // Extra small screens
    else if (newWidth < 768) setHeight("50vh"); // Small screens
    else if (newWidth < 992) setHeight("75vh"); // Medium screens
    else setHeight("100vh"); // Large screens
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="container-fluid p-0" >
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", height }}>
            <div
              className="imge"
              style={{
                backgroundImage: `url(${image})`,
                height,
                width: "100%",
                backgroundSize: width < 768 ? "contain" : "cover",
                backgroundRepeat: "no-repeat",
                transition: "filter 0.5s",
              }}
            ></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SideShow;
