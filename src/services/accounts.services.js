
const model = require('../../models/index');
const { getInforData } = require('../utils');
const Accounts = model.account;

const AccountsService = {
    getAccounts : async () => {
        try {
            const accounts = await Accounts.findAll({});
            let data = [];
            for (let i = 0; i < accounts.length; i++) {
                let account = getInforData({fileds:['id','username','password','email','role','user_id'],object:accounts[i]});
                data.push(account);
            }
            return data;
        } catch (error) {
            throw error;
        }
    },
    deleteAccount : async (id) => {
        try {
            const data = await Accounts.destroy({
                where: {
                    id: id
                }
            });
            return data;
        } catch (error) {
            throw error;
        }   
    },
    getAccountsById : async (id) => {
        try {
            const account = await Accounts.findOne({
                where: {
                    id: id
                }
            });
            return account;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = AccountsService;