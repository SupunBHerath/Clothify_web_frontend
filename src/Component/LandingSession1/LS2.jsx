import React from 'react';
import ItemCard from '../Card/ItemCard';
import a1 from '../../assets/Landing/NewArrivals/1.png';
import a2 from '../../assets/Landing/NewArrivals/2.png';
import a3 from '../../assets/Landing/NewArrivals/3.png';
import a4 from '../../assets/Landing/NewArrivals/4.png';

const newArrivalsData = [
  { id: 1, img: a1, name: "Stylish Jacket", description: "Perfect for chilly days", price: "$59.99" },
  { id: 2, img: a2, name: "Classic Sneakers", description: "Timeless style", price: "$79.99" },
  { id: 3, img: a3, name: "Elegant Watch", description: "Sophisticated and sleek", price: "$120.00" },
  { id: 4, img: a4, name: "Trendy Sunglasses", description: "UV protection", price: "$35.00" },
  { id: 5, img: a4, name: "Casual T-shirt", description: "Comfy and stylish", price: "$25.00" },
  { id: 6, img: a1, name: "Chic Handbag", description: "Elegant and practical", price: "$95.00" },
  { id: 7, img: a1, name: "Sporty Cap", description: "Stay cool", price: "$15.00" },
  { id: 8, img: a4, name: "Leather Wallet", description: "Premium quality", price: "$45.00" }
];

export default function LS2() {
  return (
    <div className="mt-5 mx-3">
      <h2 className="fw-bold text-center">New Arrivals</h2>
      <h4 className="fw-light text-center">
        Explore the latest trends and must-haves. Shop now and stay stylish with our fresh collection!
      </h4>
      <hr />
      <div className="container mt-5">
        <div className="row mt-2">
          {newArrivalsData.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
              <ItemCard 
                img={item.img} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
