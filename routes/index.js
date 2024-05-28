const express = require('express');
const router = express.Router();

const authRoute = require('./authRoute');
const projectRoute = require('./projectRoute');
const questionRoute = require('./questionRoute');
const userQuestionRoute = require('./userQuestionRoute');
const userProjectRoute = require('./userProjectRoute');

router.use('/auth', authRoute);
router.use('/admin/project', projectRoute);
router.use('/admin/question', questionRoute);
router.use('/user/question', userQuestionRoute);
router.use('/user/project', userProjectRoute);



module.exports = router;