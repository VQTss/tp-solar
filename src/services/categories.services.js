const model = require("../../models/index");
const { BadRequestError } = require("../core/error.response");
const Category = model.category;
const categoriesServices = {
    getAllCategories: async () => {
        try {
            const data = await Category.findAll({});
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    createCategory: async (category_name) => {
        try {
            const data = await Category.create({
                category_name,
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    updateCategories : async (category_id, category_name) => {
        try {
            const data = await Category.update({
                category_name : category_name,
            },{
                where: {
                    category_id : category_id,
                }
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    deleteCategories : async (category_id) => {
        try {
            const data = await Category.destroy({
                where: {
                    category_id : category_id,
                }
            })
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }

    },
};

module.exports = categoriesServices;
