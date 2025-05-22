import React from 'react';

type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  }}>
    <img
      src={product.image}
      alt={product.name}
      style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
    />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
    <p><strong>Ingredients:</strong> {product.ingredients.join(', ')}</p>
  </div>
);

export default ProductCard;
