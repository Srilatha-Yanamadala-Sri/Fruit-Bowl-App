import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export interface FruitBowl {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
}


// Add this create function:
export const createFruitBowl = async (data: Omit<FruitBowl, '_id'>): Promise<FruitBowl> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
export const fetchFruitBowls = async (): Promise<FruitBowl[]> => {
  const response = await axios.get<FruitBowl[]>(API_URL);
  return response.data;
};

export const addFruitBowl = async (product: Omit<FruitBowl, '_id'>) => {
  const response = await axios.post<FruitBowl>(API_URL, product);
  return response.data;
};

export const updateFruitBowl = async (id: string, product: Partial<FruitBowl>) => {
  const response = await axios.put<FruitBowl>(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteFruitBowl = async (id: string) => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`);
  return response.data;
};
