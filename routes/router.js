const { signedCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
const controller = require('../controller/controller');
const { check,body } = require('express-validator');
const Users = require('../model/model');

/* GET index page. */
router.get('/', controller.getIndex);

router.post('/', [
check('email')
.isEmail()
.withMessage('Please enter a valid email address')
.normalizeEmail()
.custom((value, {req} ) => {
    for(el in Users.forms){
        if(value === el.email ){
            return Promise.reject('E-mail already in use');
        }
    }
})],


controller.postIndex);

router.get('/user', controller.getUsers);










module.exports = router;
