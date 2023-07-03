const { HEADER } = require('../utils/constants/index');
const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const model = require('../../models/index');
const User = model.users;
const Account = model.accounts;
const jwt = require('jsonwebtoken');


const middlewareControllers = {
    // verify Token
    verifyToken : async (req,res,next) => {
        try {
            const token = req.header('authorization');
            if (token) {
                const accessToken = token.split(" ")[1];
                const secret = process.env.ACCESS_TOKEN;
                jwt.verify(accessToken,secret , (err,decode) => {
                    if (err) {
                        return res.status(403).json("Token is not vaild");
                    }else{
                        req.user = decode;
                        next();
                    }
                })
            }else{
                return res.status(401).json("You are not authentication");
            }
        } catch (error) {
             next(error);
        }
    },

    verifyTokenAndAdminAuth : async (req,res,next) => {
        middlewareControllers.verifyToken(req,res,() => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json("You're not allowed to");
            }
        })
       
    }

}




module.exports = middlewareControllers;