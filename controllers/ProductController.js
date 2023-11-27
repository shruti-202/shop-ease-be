const Products = require("../models/ProductModel");
const { nameValidator } = require("../constants/Validator");

const addProduct = async (req, res) => {
  let { name, description, category, price, discountedPrice, productImages } =
    req.body;
  if (!name) {
    return res.status(400).json({
      statusCode: 400,
      message: "Name cannot be empty",
    });
  }
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Name should be greater than 1 and less than equal 50 characters",
    });
  }
  if (!nameValidator(name)) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Invalid Name. Format: First [Last], both start with uppercase, & contains only alphabetical characters.",
    });
  }

  try {
    const newProduct = new Products({
      name,
      description,
      category,
      price,
      discountedPrice,
      productImages,
    });
    newProduct
      .save()
      .then((result) => {
        return res.status(201).json({
          statusCode: 201,
          message: "Product added successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    Products.find()
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Products fetched successfully",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

const updateProduct = async (req, res) => {
  let { name } = req.body;

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Name should be greater than 1 and less than equal 50 characters",
    });
  }
  if (!nameValidator(name)) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Invalid Name. Format: First [Last], both start with uppercase, & contains only alphabetical characters.",
    });
  }

  try {
    const productId = req.params.productId;
    Products.findOneAndUpdate({ _id: productId }, req.body)
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Product updated successfully",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    Products.findByIdAndDelete(productId)
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Product deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
