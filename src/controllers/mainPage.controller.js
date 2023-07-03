const { SuccessResponse } = require("../core/success.response");
const mainPageServices = require("../services/mainPage.services");


const mainPageControllers = {
    getImagesForSlider: (req, res) => {
        const data =  mainPageServices.getImagesForSlider();
        new SuccessResponse({
            message: "Get images for slider successfully",
            metadata: data,
        }).send(res);
    },
    createImageSlider : (req,res) => {
        const {slider_name , slider_image , slider_status} = req.body;
        if (!slider_name) {
            throw new BadRequestError("Slider name cannot be exist");
        }
        if (!slider_image) {
            throw new BadRequestError("Slider image cannot be exist");
        }
        if (!slider_status) {
            throw new BadRequestError("Slider status cannot be exist");
        }
        const data = mainPageServices.createImageSlider(slider_name,slider_image,slider_status);
        new SuccessResponse({
            message: "Create image slider successfully",
            metadata: data,
        }).send(res);
    },
    updateImageSlider : (req,res) => {
        const {slider_id, image_name , image_base64 , product_id} = req.body;
        if (!slider_id) {
            throw new BadRequestError("Slider id cannot be exist");
        }
        if (!image_name) {
            throw new BadRequestError("Image name cannot be exist");
        }
        if (!image_base64) {
            throw new BadRequestError("Image base64 cannot be exist");
        }
        if (!product_id) {
            throw new BadRequestError("Product id cannot be exist");
        }
        const data = mainPageServices.updateImageSlider(slider_id,image_name,image_base64,product_id);
        new SuccessResponse({
            message: "Update image slider successfully",
            metadata: data,
        }).send(res);
     
    },
    deleteImageSlider : (req,res) => {
        const {slider_id} = req.body;
        if (!slider_id) {
            throw new BadRequestError("Slider id cannot be exist");
        }
        const data = mainPageServices.deleteImageSlider(slider_id);
        new SuccessResponse({
            message: "Delete image slider successfully",
            metadata: data,
        }).send(res);
    },
};

module.exports = mainPageControllers;