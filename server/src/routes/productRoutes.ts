import express, { Request, Response } from 'express';
import { Product } from '../models/Product';

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product (single)
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

/* // Bulk insert
router.post('/bulk', async (req: Request, res: Response) => {
  try {
    const products = req.body;
    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'Request body must be an array of products.' });
    }
    const insertedProducts = await Product.insertMany(products);
    res.status(201).json(insertedProducts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to insert products', error: err });
  }
});

// Update product by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err });
  }
});

// Delete product by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}); */

export default router;
