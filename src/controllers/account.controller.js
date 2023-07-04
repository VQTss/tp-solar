
const express = require('express');
const AccountsService = require('../services/accounts.services');
const { SuccessResponse } = require('../core/success.response');


// lấy thông tin user  và account

const AccountController = {
    getAccounts: async (req, res, next) => {
        try {
            const accounts = await AccountsService.getAccounts();
            res.json(accounts);
        } catch (error) {
            next(error);
        }
    },
    getAccountsById: async (req, res, next) => {
        try {
            const { id } = req.body;
            if (!id) {
                res.json({
                    "message": "id is not in body"
                });
            } else {
                const account = await AccountsService.getAccountsById(id);
                new SuccessResponse({
                    metadata: account,
                    message: 'get account by id successfully'
                }).send(res);
            }
        } catch (error) {
            next(error);
        }
    },
    deleteAccount: async (req, res, next) => {
        try {
            const { id } = req.body;
            if (!id) {
                res.json({
                    "message": "id is not in body"
                });
            } else {
                const data = await AccountsService.deleteAccount(id);
                new SuccessResponse({
                    message: 'delete account successfully',
                    metadata: data
                }).send(res);
            }

        } catch (error) {
            next(error);
        }
    },
}

module.exports = AccountController;


