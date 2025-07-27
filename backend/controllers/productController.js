const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.findAll();
    res.json({ message: "Products fetched successfully", products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.Product.findOne({ where: { _id: id } });
    if (product) {
      res.json({ message: "Product fetched successfully", product });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await productModel.Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create product', details: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await productModel.Product.destroy({ where: { _id: id } });
    if (deleted) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
};

