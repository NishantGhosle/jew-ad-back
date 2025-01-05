import Product from '../models/productModel.js';

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).json({ message: "No products available" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { title, price, description, images } = req.body;

  if (!title || !price || !description || !images) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({ title, price, description, images });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add product", error: err.message });
  }
};

// Edit product
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, images } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = images || product.images;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

export { getProducts, addProduct, editProduct, deleteProduct };
