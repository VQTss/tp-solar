const { SuccessResponse } = require("../core/success.response");
const imageProductServices = require("../services/imageProduct.services");

const imageProductController = {
    getImageProduct: async (req, res) => {
        const { product_id } = req.body;
        if (!product_id) {
          return  res.status(400).json({
                message: "Product id is not in body",
            });
        }
        const data = await imageProductServices.getImageProduct(product_id);
        new SuccessResponse({
            message: "Get image product successfully",
            metadata: data,
        }).send(res);
    },
    createImageProduct: async (req, res) => {
        const { product_id, image_base64, image_name } = req.body;
        if (!product_id) {
          return  res.status(400).json({
                message: "Product id is not in body",
            });
        }
        if (!image_base64) {
         return   res.status(400).json({
                message: "Image base64 is not in body",
            });
        }
        if (!image_name) {
            return  res.status(400).json({
                message: "Product name is not in body",
            });
        }
        const data = await imageProductServices.createImageProduct(product_id, image_base64, image_name);
        new SuccessResponse({
            message: "Create image product successfully",
            metadata: data,
        }).send(res);
    },
    updateImageProduct: async (req, res) => {
        const { image_id, image_base64, image_name } = req.body;
        if (!image_id) {
            return   res.status(400).json({
                message: "Product id is not in body",
            });
        }
        if (!image_base64) {
            return    res.status(400).json({
                message: "Image base64 is not in body",
            });
        }
        if (!image_name) {
            return    res.status(400).json({
                message: "Product name is not in body",
            });
        }
        const data = await imageProductServices.updateImageProduct(product_id, image_base64, image_name);
        new SuccessResponse({
            message: "Update image product successfully",
            metadata: data,
        }).send(res);
    },
    deleteImageProduct: async (req, res) => {
        const { image_id } = req.body;
        if (!image_id) {
            return    res.status(400).json({
                message: "Image id is not in body",
            });
        }
        const data = await imageProductServices.deleteImageProduct(product_id);
        new SuccessResponse({
            message: "Delete image product successfully",
            metadata: data,
        }).send(res);
    },
};

module.exports = imageProductController;
