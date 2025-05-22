import React, { useState } from 'react';
import { FruitBowl, updateFruitBowl, deleteFruitBowl } from '../api/productservice';

interface Props {
  bowl: FruitBowl;
  onUpdate: (updated: FruitBowl) => void;
  onDelete: (id: string) => void;
}

const FruitBowlCard: React.FC<Props> = ({ bowl, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: bowl.name,
    description: bowl.description,
    price: bowl.price,
    image: bowl.image,
    ingredients: bowl.ingredients.join(', '),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updated = await updateFruitBowl(bowl._id, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        ingredients: formData.ingredients.split(',').map(i => i.trim()),
      });
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update fruit bowl');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this fruit bowl?')) {
      try {
        await deleteFruitBowl(bowl._id);
        onDelete(bowl._id);
      } catch (err) {
        alert('Failed to delete fruit bowl');
      }
    }
  };

  if (isEditing) {
    return (
      <div className="fruit-bowl-card editing">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="fruit-bowl-card">
      <img src={bowl.image} alt={bowl.name} />
      <h3>{bowl.name}</h3>
      <p>{bowl.description}</p>
      <p>₹{bowl.price.toFixed(2)}</p>
      <p>Ingredients: {bowl.ingredients.join(', ')}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
        Delete
      </button>
    </div>
  );
};

export default FruitBowlCard;
