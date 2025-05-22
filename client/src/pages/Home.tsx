import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from '../api/products';
import ProductCard from '../components/ProductCard';

type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    image: '',
    ingredients: [],
  });
  const [ingredientsInput, setIngredientsInput] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleAddIngredient = () => {
    if (ingredientsInput.trim() !== '') {
      setForm({
        ...form,
        ingredients: [...form.ingredients, ingredientsInput.trim()],
      });
      setIngredientsInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(form);
      fetchProducts();
      setForm({ name: '', description: '', price: 0, image: '', ingredients: [] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: '#4caf50' }}>Add a Fruit Bowl</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInputChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Add Ingredient"
            value={ingredientsInput}
            onChange={e => setIngredientsInput(e.target.value)}
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            style={{ marginLeft: '0.5rem', backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0 1rem', cursor: 'pointer' }}
          >
            Add
          </button>
        </div>
        <p><strong>Ingredients:</strong> {form.ingredients.join(', ')}</p>

        <button
          type="submit"
          style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.7rem 1.5rem', border: 'none', cursor: 'pointer' }}
        >
          Add Fruit Bowl
        </button>
      </form>

      <h2 style={{ color: '#4caf50' }}>Available Fruit Bowls</h2>
      {products.length === 0 && <p>No fruit bowls found.</p>}
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
