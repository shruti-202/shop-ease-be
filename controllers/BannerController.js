const Banners = require("../models/BannerModel");
const { nameValidator } = require("../constants/Validator");

const addBanner = async (req, res) => {
  let { name, bannerImageLink, productLink } = req.body;

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
  if (!bannerImageLink) {
    return res.status(400).json({
      statusCode: 400,
      message: "Banner Image Link cannot be empty",
    });
  }
  if (!productLink) {
    return res.status(400).json({
      statusCode: 400,
      message: "Product Link cannot be empty",
    });
  }
  try {
    const newBanner = new Banners({ name, bannerImageLink, productLink });
    newBanner
      .save()
      .then((result) => {
        return res.status(201).json({
          statusCode: 201,
          message: "Banner added successfully",
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

const getBanners = async (req, res) => {
  try {
    Banners.find()
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Banners fetched successfully",
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

const updateBanner = async (req, res) => {
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
    const bannerId = req.params.bannerId;
    Banners.findOneAndUpdate({ _id: bannerId }, req.body)
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Banner updated successfully",
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

const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.bannerId;
    Banners.findOneAndRemove({ _id: bannerId })
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Banner deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

module.exports = { addBanner, getBanners, updateBanner, deleteBanner };
