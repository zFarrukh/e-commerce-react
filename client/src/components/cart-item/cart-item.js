

import './cart-item.style.scss';

import React from 'react'

function CartItem({ item: {imageUrl, price, name, quantity} }) {
    return (
        <div className="cart-item">
            <img src={imageUrl} alt="cart-item" />
            <div className="item-details">
                <span className='name'>{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default React.memo(CartItem)
