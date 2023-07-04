const { BadRequestError } = require("../core/error.response");
const { SuccessResponse ,CREATED } = require("../core/success.response");
const categoriesServices = require("../services/categories.services");

const categoriesController = {

    // get all categories
    getCategories: async (req, res, next) => {
        const data = await categoriesServices.getAllCategories();
        new SuccessResponse({
            message: "Get categories successfully",
            metadata: data,
        }).send(res);
    },


    // create category
    createCategory: async (req, res, next) => {
        const{category_name} = req.body;
        if (!category_name) {
            res.json({
                "message" : "Category name is not in body "
            });
        }
        const data = await categoriesServices.createCategory(category_name);
        new CREATED({
            message: "Create category successfully",
            metadata: data,
        }).send(res);
    },

    // update category
    updateCategories : async (req, res, next) => {
        const {category_id, category_name} = req.body;
        if (!category_id) {
            res.json({
                "message" : "Category id is not in body "
            });
        }
        if (!category_name) {
            res.json({
                "message" : "Category name is not in body "
            });
        }
        const data = await categoriesServices.updateCategories(category_id, category_name);
        new CREATED({
            message: "Update category successfully",
            metadata: data,
        }).send(res);
    },

    // delete category
    deleteCategories : async (req, res, next) => {
        const {category_id} = req.body;
        if (!category_id) {
            res.json({
                "message" : "Category id is not in body "
            });
        }
        const data = await categoriesServices.deleteCategories(category_id);
        new CREATED({
            message: "Delete category successfully",
            metadata: data,
        }).send(res);
    }
};


module.exports = categoriesController;