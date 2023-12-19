import React from 'react'
import './css.css'

export const ProductsList = ({ products }) => {
  return (
    <div className='products-container'>
      {products.map((product, index) => (
        <div className=' card container card-product' key={index}>
          <img src={product.image} alt={`imagen-${index}`} className='image-product'/>
          <div className='card-body contenainer-info' >
            <p>{product.name}</p>
            <b>Precio: <span>$</span>{product.price}</b>
          </div>
        </div>
      ))}
    </div>
  )
}
