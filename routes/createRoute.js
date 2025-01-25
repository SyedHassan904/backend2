import express from "express"
import { createDesign, getImgs, updateImgStatus, deleteDesign, singleDesign, editDesign, saveDesign } from "../controllers/createDeisgnController.js";
const createRouter = express.Router();
import userAuth from "../middleware/auth.js"

createRouter.post("/generate-image", userAuth, createDesign);
createRouter.get("/get-image", getImgs);
createRouter.post("/updateImgStatus", updateImgStatus);
createRouter.post("/deleteDesign", deleteDesign);
createRouter.get("/getSingleDesign", singleDesign);
createRouter.get("/getSingleDesign/:imgId", singleDesign);
createRouter.post("/save-design", saveDesign);
createRouter.post("/edit-design", editDesign);
export default createRouter;