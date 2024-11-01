import React from "react";
import CategoryCard from "../Card/Category";
import c1 from "../../assets/Landing/Category/1.png";
import c2 from "../../assets/Landing/Category/2.png";
import c3 from "../../assets/Landing/Category/3.png";
import c4 from "../../assets/Landing/Category/4.png";
export default function LS4() {
  return (<div className="mt-5 ">
      <h2 className="fw-bold text-center">Shop By Category</h2>
  <hr />
    <div className="container ">
      <div className="row">
        <div className="col-md-6 col-sm-12 mt-5">
          <CategoryCard img={c1} path={"category/women"}/>
        </div>
        <div className="col-md-6 col-sm-12 mt-5">
          <CategoryCard img={c2} path={"category/men"} />
        </div>
      </div>
     
      <div className="row ">
        <div className="col-md-6 col-sm-12 mt-5">
          <CategoryCard img={c3} path={"category/kids"}  />
        </div>
        <div className="col-md-6 col-sm-12 mt-5">
          <CategoryCard img={c4} path={"category/baby"} />
        </div>
      </div>
    </div>
    </div>
  );
}
