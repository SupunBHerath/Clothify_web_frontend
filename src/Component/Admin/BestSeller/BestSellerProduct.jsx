import React, { useEffect, useState } from 'react'
import { getProductByBestSellers } from '../../../Service/ProductApi';
import ItemCard from './ItemCard';



export default function BestSellerProduct() {
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
    if (!isEmpty) {
        return null
    }

    return (
        <div className="mt-4">
            <div className="">
                <div className="row d-flex justify-content-center ">
                    <h3 className='fw-bold text-center'>Best Selling Prducts</h3>
                    <hr />
                    {bestSellerData.map((item) => {
                        const prices = item.sizes.map((size) => size.price);
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        return (
                            <>
                                <div
                                    style={{ marginTop: "-25px" }}
                                    key={item.id}
                                    className="col-sm-6 col-md-3 d-flex justify-content-center "
                                >
                                    <ItemCard
                                        product={{
                                            ...item,
                                            priceRange: `Rs ${minPrice} - Rs ${maxPrice}`,
                                            availableSizes: item.sizes.map((size) => size.name).join(", "),
                                        }}
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
