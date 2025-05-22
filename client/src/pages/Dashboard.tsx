import React, { useEffect, useState } from 'react';
import { fetchFruitBowls, FruitBowl, deleteFruitBowl } from '../api/productservice';
import FruitBowlCard from '../components/FruitBowlCard';
import AddProduct from '../components/AddProduct';

const Dashboard: React.FC = () => {
  const [fruitBowls, setFruitBowls] = useState<FruitBowl[]>([]);
  const [selectedBowl, setSelectedBowl] = useState<FruitBowl | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadFruitBowls = async () => {
    const data = await fetchFruitBowls();
    setFruitBowls(data);
  };

  useEffect(() => {
    loadFruitBowls();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteFruitBowl(id);
    loadFruitBowls();
  };

  const handleAddNew = () => {
    setSelectedBowl(null);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    loadFruitBowls();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Fruit Bowls Dashboard</h1>
      <button onClick={handleAddNew} style={{ marginBottom: 20 }}>
        Add New Fruit Bowl
      </button>

      {showAddForm && (
        <AddProduct
          existingFruitBowl={selectedBowl}
          onClose={handleFormClose}
        />
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {fruitBowls.map((bowl) => (
          <FruitBowlCard
            key={bowl._id}
            bowl={bowl}
            onDelete={handleDelete}
            onUpdate={(updatedBowl) => {
              setFruitBowls((prev) =>
                prev.map((b) => (b._id === updatedBowl._id ? updatedBowl : b))
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
