import OpenAI from "openai";
import ImageModel  from "../models/ImageModel.js";
import cloudinary from "cloudinary";

const createDesign = async (req, res) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required!" });
    }

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const openAiImageUrl = response.data[0]?.url;
        if (!openAiImageUrl) {
            return res.status(500).json({ message: "Image URL not returned from OpenAI." });
        }

        // Upload the image to Cloudinary
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(openAiImageUrl, {
            folder: "openai_images",
        });

        // Save the Cloudinary URL in the database
        const newImage = new ImageModel({
            prompt: prompt,
            imageUrl: cloudinaryResponse.secure_url,
            createdAt: new Date(),
        });
        await newImage.save();

        res.status(200).json({
            message: "Image generated and uploaded successfully!",
            data: { imageUrl: cloudinaryResponse.secure_url },
        });
    } catch (error) {
        console.error("Error in design creation:", error);
        res.status(500).json({ message: "Failed to generate or upload image", error: error.message });
    }
};

// Save design controller
const saveDesign = async (req, res) => {
    const { prompt, imageUrl, name, description, category } = req.body;

    if (!prompt || !imageUrl || !name || !description || !category) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const newImage = new ImageModel({
            prompt,
            imageUrl,
            name,
            description,
            category,
            createdAt: new Date(),
        });

        await newImage.save();

        res.status(200).json({ message: "Design saved successfully!", data: newImage });
    } catch (error) {
        console.error("Error saving design:", error);
        res.status(500).json({ message: "Failed to save design", error: error.message });
    }
};


const getImgs = async (req, res) => {
    try {
        const findedImgs = await ImageModel.find({});
        res.json({ success: true, message: findedImgs });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

const updateImgStatus = async (req, res) => {
    try {
        const { imgId, imgStatus } = req.body;

        // Find image and update status manually
        const image = await ImageModel.findOne({ _id: imgId });

        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        // Update the image status
        image.imgStatus = imgStatus;

        // Save the updated image status
        const updatedImage = await image.save();

        // Respond with the updated image status
        res.json({
            success: true,
            message: "Status updated successfully",
            updatedImg: updatedImage
        });

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update image status",
            error: error.message
        });
    }
};

const deleteDesign = async (req, res) => {
    try {
        const { imgId } = req.body;
        await ImageModel.findByIdAndDelete(imgId);
        res.json({ success: true, message: "Design Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const singleDesign = async (req, res) => {
    try {
        const { imgId } = req.query;
        const findedImgById = await ImageModel.findById(imgId);
        if (findedImgById) {
            res.json({ success: true, message: findedImgById });
        } else {
            res.json({ success: false, message: "Image not found." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const editDesign = async (req, res) => {
    const { imgId, name, description, category } = req.body;

    if (!imgId || !name || !description || !category) {
        return res.status(400).json({ message: "All fields are required for editing!" });
    }

    try {
        const image = await ImageModel.findById(imgId);

        if (!image) {
            return res.status(404).json({ message: "Image not found!" });
        }

        // Update fields
        image.name = name;
        image.description = description;
        image.category = category;

        const updatedImage = await image.save();

        res.status(200).json({
            message: "Design updated successfully!",
            data: updatedImage,
        });
    } catch (error) {
        console.error("Error editing design:", error);
        res.status(500).json({ message: "Failed to edit design", error: error.message });
    }
};


export { createDesign, getImgs, updateImgStatus, deleteDesign, singleDesign, editDesign, saveDesign };