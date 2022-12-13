const Products = require("../models/product");

const findAll = async (req, res) => {
  try {
    const { featured, rating, company, name, sort,fields, per_page, skip } = req.query;
    const queryObj = {};

    if (featured) {
      queryObj.featured = featured === "true" ? true : false;
    }
    if (rating) {
      queryObj.rating = Number(rating) 
    }
    if (company) {
      queryObj.company = company
    }
    if (name) {
      queryObj.name = {$regex: name, $options: "i"};
    }
    
    console.log(queryObj)
    let result = Products.find(queryObj);
    if(sort){
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList)
    }
    if(fields){
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList)
    }

    if(per_page) {
      result = result.limit(per_page)
    }

    if (skip) {
      result = result.skip(skip);
    }

    const products = await result
    res.status(200).json({ status: "success",nbHits: products.length, products });
  } catch (err) {
    res.status(500).json({ status: "unsuccessful" });
  }
};

const findByQuery = async (req, res) => {
  try {
    console.log(req.query);
    const products = await Products.find(req.query);
    if (products.length < 0) {
      return res.status(404).json({ message: "No featured products" });
    }
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    const products = await Products.find({});
    res
      .status(200)
      .json({ status: "success", product: product, products: products });
  } catch (err) {
    res.status(500).json({ status: "unsuccessful" });
  }
};

const findOne = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Products.findOne({ _id: productID });
    if (!product) {
      return res
        .status(404)
        .json({ status: "unsuccessful", message: "Product not found!" });
    }
    res.status(200).json({ status: "ok", product: product });
  } catch (err) {
    res.status(500).json({ status: "unsuccessfull" });
  }
};

const findOneAndUpdate = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Products.findOneAndUpdate(
      { _id: productID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ status: "unsuccessful", message: "Product not found!" });
    }
    const products = await Products.find({});
    res
      .status(200)
      .json({ status: "ok", product: product, products: products });
  } catch (err) {
    res.status(500).json({ status: "unsuccessfull" });
  }
};

const findOneAndDelete = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Products.findOneAndDelete({ _id: productID });
    if (!product) {
      return res
        .status(404)
        .json({ status: "unsuccessful", message: "Product not found!" });
    }
    res.status(200).json({ status: "ok", product: product });
  } catch (err) {
    res.status(500).json({ status: "unsuccessfull" });
  }
};

module.exports = { findAll, create, findByQuery };
