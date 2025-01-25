import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
    imgStatus: { type: String },
});

const ImageModel = mongoose.models.Image || mongoose.model("Image", imageSchema);
export default ImageModel;