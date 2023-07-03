
const model = require('../../models');
const { BadRequestError } = require('../core/error.response');
const SliderImage = model.slider_image;


const mainPageServices = {
    getImagesForSlider : () => {
        try {
            const data = SliderImage.findAll({});
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    createImageSlider : (slider_name,slider_image,slider_status) => {
        try {
            const data = SliderImage.create({
                slider_name: slider_name,
                slider_image: slider_image,
                slider_status: slider_status,
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    updateImageSlider : (slider_id,image_name,image_base64,product_id) => {
        try {
            const data = SliderImage.update({
                image_name: image_name,
                image_base64: image_base64,
                product_id: product_id,
            },{
                where: {
                    slider_id: slider_id
                }
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    deleteImageSlider : (slider_id) => {
        try {
            const data = SliderImage.destroy({
                where: {
                    slider_id: slider_id
                }
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
};

module.exports = mainPageServices;