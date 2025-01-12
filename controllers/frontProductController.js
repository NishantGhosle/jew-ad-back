import path from 'path';
import { promises as fs } from 'fs';

const getAllProducts = async (req, res) => {
  try {
    const dataPath = path.resolve('data', 'DATA.json'); // Resolve the path to DATA.json
    const data = await fs.readFile(dataPath, 'utf-8'); // Read file asynchronously
    const products = JSON.parse(data); // Parse the JSON content
    res.status(200).json(products); // Respond with the data
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data file' });
  }
};

export { getAllProducts };