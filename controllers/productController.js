import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  console.log("Received files:", req.files); // Debugging step
  console.log("Received body:", req.body); // Debugging step

  const { title, price, description } = req.body;

  // Convert files to Base64
  const images = req.files.map((file) => {
    const base64Image = file.buffer.toString('base64');
    const mimeType = file.mimetype; // e.g., 'image/jpeg', 'image/png'
    return `data:${mimeType};base64,${base64Image}`; // Full Base64 data URI
  });

  console.log("Base64 Encoded Images:", images); // Debugging step

  try {
    const newProduct = new Product({ title, price, description, images });
    await newProduct.save();

    const products = await Product.find(); // Fetch products from DB
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      allProducts: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
