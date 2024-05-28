'use strict';


const httpStatus = require('http-status');

const UsersDao = require('../dao/UsersDao');
const AdminDao = require('../dao/AdminDao');
const responsHandler = require('../helper/response');
const {logger} = require('../helper/logger');
const { isEmpty, hashPassword, getCurrentTime, comparePassword, generateToken } = require('../config/function');

class AuthService {
    constructor() { 
        this.usersDao = new UsersDao();
        this.adminDao = new AdminDao()
    }

    register = async (bodyData) => {
        try {
            const { userId, password, confirmPassword } = bodyData;
            
            const isUserIdExists = await this.usersDao.findOneByWhere({ userId }, ['userId']);



            if (isUserIdExists) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'USERID_EXISTS'));

            if (password !== confirmPassword) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'PASSWORD_MISMATCH'));
            
            const newUserData = {
                userId,
                password: hashPassword(password),
                createdAt: getCurrentTime(),
                updatedAt: getCurrentTime()
            }

            const response = await this.usersDao.create(newUserData);

            if (isEmpty(response)) return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));

            return responsHandler.returnSuccess(httpStatus.CREATED, msgHelper.message('en', 'REGISTER_SUCCESS'), {});


        } catch (error) {
            logger.error(`AuthService.register ${error.message}`);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));

        }
    }

    login = async (bodyData) => {
        try {
            const { userId, password } = bodyData;
            const user = await this.usersDao.findOneByWhere({ userId }, ['password', 'id', 'userId']);

            if (!user) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'INVALID_CREDENTIALS'));

            const isPasswordMatch = comparePassword(password, user.password);


            if (!isPasswordMatch) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'INVALID_CREDENTIALS'));


            const userData = {
                id: user.id,
                userId: user.userId,
            }

            const token = generateToken(userData);

            return responsHandler.returnSuccess(httpStatus.OK, msgHelper.message('en', 'LOGIN_SUCCESS'), {
                token: token,
                user: userData
            });

        } catch (error) {
            
            logger.info(`AuthService.login ${error.message}`);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));
        }
    }
    adminLogin = async (bodyData) => {
        try {

            const { email, password } = bodyData;
            const user = await this.adminDao.findOneByWhere({ email }, ['password', 'id', 'email']);

            if (!user) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'INVALID_CREDENTIALS'));

            const isPasswordMatch = comparePassword(password, user.password);


            if (!isPasswordMatch) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'INVALID_CREDENTIALS'));


            const userData = {
                id: user.id,
                userId: user.userId,
            }

            const token = generateToken(userData);

            return responsHandler.returnSuccess(httpStatus.OK, msgHelper.message('en', 'LOGIN_SUCCESS'), {
                token: token,
                user: userData
            });

        } catch (error) {
            
            logger.info(`AuthService.login ${error.message}`);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));
        }
    }

    refreshToken = async (userData) => {
        try {
            const { id, userId } = userData;
            const user = await this.usersDao.findOneByWhere({ id }, ['id', 'userId']);

            if (!user) return responsHandler.returnError(httpStatus.BAD_REQUEST, msgHelper.message('en', 'INVALID_USER'));

            return responsHandler.returnSuccess(httpStatus.OK, msgHelper.message('en', 'TOKEN_REFRESH'), user);

        } catch (error) {
            logger.error(`AuthService.refreshToken ${error.message}`);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));
        }
    }
}

module.exports = AuthService;