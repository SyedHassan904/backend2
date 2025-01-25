import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";
// Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((img) => img !== undefined);

        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        let newProduct = await productModel.create({
            name: name,
            description: description,
            price: Number(price),
            category: category,
            subCategory: subCategory,
            image: imagesURL,
            sizes: JSON.parse(sizes),
            // bestseller: bestseller === true ? true : false, => very wrong
            bestseller: !!bestseller,
            date: Date.now(),
        })
        await newProduct.save();
        res.json({ success: true, message: "Product added" });


        // console.log(imagesURL);
        // console.log(images);
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// List product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, message: products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }
}

// Single Product
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const findedproduct = await productModel.findById(productId)
        res.json({ success: true, message: findedproduct });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, singleProduct, addProduct, removeProduct }