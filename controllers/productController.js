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

  // Normalize paths to use forward slashes
  const images = req.files.map(
    (file) =>
      `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
  );

  console.log("Full Image URLs:", images); // Debugging step

  try {
    const newProduct = new Product({ title, price, description, images });
    await newProduct.save();

    const products = await Product.find(); // Fetch products from DB
    const productsWithImages = products.map((product) => ({
      ...product.toObject(),
      images: product.images.map(
        (path) => path.replace(/\\/g, "/") // Ensure paths are normalized
      ),
    }));

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      allProducts: productsWithImages,
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
