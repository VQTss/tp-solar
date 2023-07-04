const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const UserServices = require("../services/user.services");


const UserControllers = {
    // Get all users
    getAllUsers: async (req, res,next) => {
        try {
            const data = await UserServices.getUser();
            new SuccessResponse({
                metadata: data,
                message: 'get all users successfully'
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    // Get user by id
    getUserById: async (req, res,next) => {
        try {
            const { id } = req.body;
            if (!id) {
                res.json({
                    "message" : "id is not in body"
                });
            }
            const data = await UserServices.getUserById(id);
            new SuccessResponse({
                metadata: data,
                message: 'get user by id successfully'
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    // Update user
    updateUser: async (req, res,next) => {
        try {
            const { id, full_name, phone, address } = req.body;
            if (!id) {
                res.json({
                    "message" : "id is not in body"
                });
            }
            if (!full_name) {
                res.json({
                    "message" : "full_name is not in body"
                });
            }
            if (!phone) {
                res.json({
                    "message" : "phone is not in body"
                });
            }
            const data = await UserServices.updateUser(id, full_name, phone, address);
            new SuccessResponse({
                metadata: data,
                message: 'update user successfully'
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
};

module.exports = UserControllers;