import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = () => axios.get(API_URL);
export const createProduct = (product: any) => axios.post(API_URL, product);
