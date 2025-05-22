import React from 'react';
import { FruitBowl } from '../api/productservice';

interface Props {
  cart: FruitBowl[];
}

const Cart: React.FC<Props> = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{
      marginTop: 24,
      padding: 16,
      borderTop: '2px solid #eee',
      backgroundColor: '#fafafa',
      borderRadius: 12,
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <h2>Cart ({cart.length} items)</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: 'bold' }}>Total: ₹{total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
