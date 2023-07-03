

const model = require('../../models/index');
const { BadRequestError } = require('../core/error.response');
const { getInforData } = require('../utils');
const User = model.user;

const UserServices = {
    getUser:  async () => {
        try {
            const users = await User.findAll({});
            let data = [];
            for (let i = 0; i < users.length; i++) {
                let user = getInforData({fileds:['id','full_name','phone','address'],object:users[i]});
                data.push(user);
            }
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    getUserById: async (id) => {
        try {
            const data = await User.findOne({
                where: {
                    id: id
                }
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    updateUser: async (id, full_name, phone, address) => {
        try {
            const data = await User.update({
                full_name: full_name,
                phone: phone,
                address: address
            }, {
                where: {
                    id: id
                }
            });
            if (data[0] === 1) {
                return "Success";
            }else{
                return "Fail";
            }
            
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

};

module.exports = UserServices;