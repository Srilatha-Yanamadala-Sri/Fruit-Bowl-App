import React, { useState, useEffect } from 'react';
import { FruitBowl, createFruitBowl, updateFruitBowl } from '../api/productservice';

interface Props {
  existingFruitBowl: FruitBowl | null;
  onClose: () => void;
}

const AddProduct: React.FC<Props> = ({ existingFruitBowl, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    ingredients: '',
  });

  useEffect(() => {
    if (existingFruitBowl) {
      setFormData({
        name: existingFruitBowl.name,
        description: existingFruitBowl.description,
        price: existingFruitBowl.price.toString(),
        image: existingFruitBowl.image,
        ingredients: existingFruitBowl.ingredients.join(', '),
      });
    }
  }, [existingFruitBowl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFruitBowl: Omit<FruitBowl, '_id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      ingredients: formData.ingredients.split(',').map((i) => i.trim()),
    };

    try {
      if (existingFruitBowl) {
        // Update existing fruit bowl
        await updateFruitBowl(existingFruitBowl._id, newFruitBowl);
      } else {
        // Create new fruit bowl
        await createFruitBowl(newFruitBowl);
      }
      onClose();
    } catch (error) {
      alert('Failed to save fruit bowl');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, marginBottom: 20 }}>
      <h2>{existingFruitBowl ? 'Edit Fruit Bowl' : 'Add New Fruit Bowl'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          required
        />
        <button type="submit" style={{ marginRight: 10 }}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
