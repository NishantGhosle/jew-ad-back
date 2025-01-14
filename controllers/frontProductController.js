import path from 'path';
import { promises as fs } from 'fs';

const getAllProducts = async (req, res) => {
  try {
    const dataPath = path.resolve('data', 'DATA.json');
    const data = await fs.readFile(dataPath, 'utf-8'); 
    const products = JSON.parse(data); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data file' });
  }
};

export { getAllProducts };