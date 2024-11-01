import React from 'react'
import DisCard from '../DiscountCard/DisCard'
import d1 from '../../assets/Landing/dis1.png'
import d2 from '../../assets/Landing/d2.png'
import d3 from '../../assets/Landing/d3.png'

export default function LS1(){
  return (
    <div className='mt-5'>
      <h2 className="fw-bold text-center">BEST PRICE IN MARKET</h2>
        <hr />
        <div className="container ">
            <div className="row">
                <div className="col-sm-12 col-md-4 mt-5">
                    <DisCard image={d1}/>
                </div>
                <div className="col-sm-12 col-md-4 mt-5">
                    <DisCard image={d2}/>
                </div>
                <div className="col-sm-12 col-md-4 mt-5">
                    <DisCard image={d3}/>
                </div>
            </div>
        </div>
    </div>
  )
}

