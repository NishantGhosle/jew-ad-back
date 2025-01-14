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
  console.log("Received files:", req.files);
  console.log("Received body:", req.body); 

  const { title, price, description } = req.body;

  const images = req.files.map((file) => {
    const base64Image = file.buffer.toString('base64');
    const mimeType = file.mimetype;
    return `data:${mimeType};base64,${base64Image}`;
  });

  console.log("Base64 Encoded Images:", images); 

  try {
    const newProduct = new Product({ title, price, description, images });
    await newProduct.save();

    const products = await Product.find(); 
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
