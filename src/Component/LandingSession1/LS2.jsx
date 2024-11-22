import React, { useEffect, useState } from 'react'
import ItemCard from '../Card/ItemCard';

import { getProduct } from '../../Service/ProductApi';


export default function LS2() {
  const [newArrivalProduct, setNewArrivalProduct] = new useState([]);
  useEffect(() => {
    const getProdutData = async () => {
      try {
        const response = await getProduct();
        const result = response.data;
  
        if (result.length > 0) {
          const filteredProducts = result.filter((product) => product.new === true);
          if (filteredProducts.length > 0) {
            setNewArrivalProduct(filteredProducts);
          } else {
            message.warning("No new products found...");
          }
        } else {
          message.warning("Products not found...");
        }
      } catch (error) {
        message.error("Failed to fetch products. Please try again later.");
      }
    };
  
    getProdutData();
  }, []);
  

  return (
    <div className="mt-5 mx-3">
         <h2 className="fw-bold text-center">New Arrivals</h2>
      <h4 className="fw-light text-center">
        Explore the latest trends and must-haves. Shop now and stay stylish with our fresh collection!
      </h4>
      <hr />
      <div className="container mt-5">
        <div className="row mt-2">
          {newArrivalProduct.map((item) => {
            const prices = item.sizes.map((size) => size.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            return (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
              >
                <ItemCard
                  product={{
                    ...item,
                    priceRange: `Rs ${minPrice} - Rs ${maxPrice}`,
                    availableSizes: item.sizes.map((size) => size.name).join(", "),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
