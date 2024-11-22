import React, { useEffect, useState } from 'react'
import ItemCard from '../Card/ItemCard';

import { getProductByBestSellers } from '../../Service/ProductApi';


export default function LS1() {
  const [bestSellerData, setBestSellerData] = new useState([]);
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const getProdutData = async () => {
      const response = await getProductByBestSellers();
      const result = response.data;
      if (result.length > 0) {
        setBestSellerData(result)
        setIsEmpty(true)
      } else {
        message.warning("Producrs not found ...")
      }
    }
    getProdutData()
  }, [])
  if(!isEmpty){
    return null
  }

  return (
    <div className="mt-5 mx-3">
      <h2 className="fw-bold text-center">Best Seller</h2>
      <h4 className="fw-light text-center">Discover our most popular items. Shop the favorites everyone loves!</h4>
      <hr />
      <div className="container mt-5">
        <div className="row mt-2">
          {bestSellerData.map((item) => {
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
