import React, { useState } from "react";
import { Card, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ProductDialog from "../ProductDialog/ProductDialog";

const { Meta } = Card;

const ItemCard = ({ product }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const styles = {
    card: {
      width: 330,
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    cardHovered: {
      transform: "scale(1.05)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    },
    imageContainer: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "330px",
      borderRadius: "8px 8px 0 0",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    cartIcon: {
      position: "absolute",
      top: "15px",
      right: "15px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "50%",
      padding: "10px",
      transition: "background-color 0.3s ease, transform 0.3s ease",
      cursor: "pointer",
    },
    tag: {
      position: "absolute",
      top: "18px",
      left: "-25px",
      cursor: "pointer",
      transform: "rotate(-45deg)",
      transformOrigin: "center",
    },

    cartIconHovered: {
      backgroundColor: "#F68714",
      transform: "scale(1.1)",
    },
    buyButton: {
      width: "100%",
      backgroundColor: "#F68714",
      color: "white",
      fontWeight: "bold",
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      marginTop: "15px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.3s ease",
    },
    buyButtonHovered: {
      backgroundColor: "#FF8C42",
      transform: "scale(1.05)",
    },
    infoContainer: {
      padding: "5px 0",
      color: "#666",
    },
    sizeItem: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
    },
    text: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
    },
    sizePrice: {
      color: "#F68714",
      fontWeight: "bold",
    },
  };

  const getPriceRange = (sizes) => {
    if (!sizes || sizes.length === 0) return "No prices available";
    const prices = sizes.map((size) => size.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return `Rs ${minPrice} - Rs ${maxPrice}`;
  };

  return (
    <>
      <Card
        hoverable
        className="shadow-lg"
        style={styles.card}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        cover={
          <div style={styles.imageContainer}>

            <img
              alt="Product"
              src={product?.images[0]?.url}
              style={styles.image}
              onClick={handleDialogOpen}
            />
            <div
              style={{
                ...styles.cartIcon,
                ...(dialogOpen && styles.cartIconHovered),
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F68714")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)")}
              onClick={handleDialogOpen}
            >

              <ShoppingCartOutlined style={{ color: "white", fontSize: "20px" }} />
            </div>
            {product?.new && (<div
              style={{
                ...styles.tag,
              }}
            >
              <Tag color="success" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Tag>
            </div>)}
          </div>
        }
      >

        <Meta
          title={<h5 style={{ fontWeight: "bold", color: "#333" }}>{product?.name}</h5>}

        />
        <div style={styles.infoContainer}>
          <div style={styles.text} className="">
            <span> Category: </span>
            <strong>{product?.category}</strong>
          </div>
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.text}>
            <span>  Available Sizes:</span>
            <strong>{product?.sizes?.map((size) => size.name).join(", ")}</strong>
          </div>
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.sizeItem}>
            <span>Price Range</span>
            <span style={styles.sizePrice}>{getPriceRange(product?.sizes)}</span>
          </div>
        </div>

        <button
          type="button"
          style={styles.buyButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF8C42")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#F68714")}
          onClick={handleDialogOpen}
        >
          Buy Now
        </button>
      </Card>

      {dialogOpen && (
        <ProductDialog open={dialogOpen} product={product} onClose={handleDialogClose} />
      )}
    </>
  );
};

export default ItemCard;
