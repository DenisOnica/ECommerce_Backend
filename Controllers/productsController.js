const mongoose = require("mongoose");
const Product = require("../Database/dbSchema");

const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handlePostProducts = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    imageURL: req.body.imageURL,
    description: req.body.description,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const handleEditProducts = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const handleDeleteProducts = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleReviewProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    product.reviews.push({ name, comment });

    product = await product.save();

    return res.json(product);
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addToCartCount = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.addToCartCount += 1;
    await product.save();

    res.status(200).json({ message: "addToCartCount updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const buyCount = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.buyCount += 1;
    await product.save();

    res.status(200).json({ message: "buyCount updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const purchaseProducts = async (req, res) => {
  try {
    const productsInCart = req.body;

    for (const product of productsInCart) {
      const { id, qt } = product;
      const filter = { _id: id };
      const update = { $inc: { purchaseCount: qt } };
      await Product.updateOne(filter, update);
    }
    res.status(200).json({ message: "Purchase successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleGetProducts,
  handlePostProducts,
  handleEditProducts,
  handleDeleteProducts,
  handleGetProduct,
  handleReviewProduct,
  addToCartCount,
  buyCount,
  purchaseProducts,
};
