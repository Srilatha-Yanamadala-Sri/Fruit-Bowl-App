import React from 'react';

type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
};

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string | undefined) => void;
}

const ProductCard: React.FC<Props> = ({ product, onEdit, onDelete }) => (
  <div style={{ border: '1px solid #ddd', padding: 10, margin: 10 }}>
    <img src={product.image} alt={product.name} style={{ width: 150 }} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>Price: ${product.price.toFixed(2)}</p>
    <p>Ingredients: {product.ingredients.join(', ')}</p>

    <button onClick={() => onEdit(product)}>Edit</button>
    <button onClick={() => onDelete(product._id)} style={{ marginLeft: 10, color: 'red' }}>
      Delete
    </button>
  </div>
);

export default ProductCard;
