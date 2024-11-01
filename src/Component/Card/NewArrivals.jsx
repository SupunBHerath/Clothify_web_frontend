import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const NewArrivalCard = ({ img, name , description , price }) => (
  <Card
    hoverable
    className="shadow-lg"
    style={{
      width: 350,
      borderRadius: "10px",
      overflow: "hidden",
      transition: "transform 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
    cover={
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          height: "300px",
        }}
      >
        <img
          alt="Product"
          src={img}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
        />
      </div>
    }
  >
    <Meta
      title={<h3 style={{ fontWeight: "bold", color: "#333" }}>{name}</h3>}
      description={<p style={{ color: "#666", marginBottom: "10px" }}>{description}</p>}
    />
    <div style={{ paddingTop: "10px" }}>
      <h4 style={{ color: "#F68714", fontWeight: "bold" }}>{price}</h4>
    </div>
    <button
      type="button"
      style={{
        width: "100%",
        backgroundColor: "#F68714",
        color: "white",
        fontWeight: "bold",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        marginTop: "15px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#FF8C42";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#F68714";
      }}
    >
      Buy Now
    </button>
  </Card>
);

export default NewArrivalCard;
