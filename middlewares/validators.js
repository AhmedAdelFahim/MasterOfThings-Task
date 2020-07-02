const Joi = require('@hapi/joi');
const models = require('../models/index')
const signUpSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),
    city: Joi.string().required(),
    dateOfBirth:Joi.date().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) // password must at least 3 symbols and at most 30 symbols and contains letters or number only
        .required(),
});
const signUpValidator = async (req, res, next) => {
    const {body: {firstName, lastName, userName, city, password, email, dateOfBirth}} = req;
    const errors = {};
    try {
        // validate input data vs predefined schema
        const value = await signUpSchema.validateAsync({firstName, lastName, userName, city, password, email, dateOfBirth})

        const userByUserName = await models.User.findAll({
            where:{
                userName
            }
        });
        const userByEmail = await models.User.findAll({
            where:{
                email
            }
        });

        // check uniqueness of user name
        if(userByUserName.length>0) {
            errors.userName = "User Name already existed"
        }

        // check uniqueness of email
        if(userByEmail.length>0) {
            errors.email = "Email already existed"
        }
        if(errors.email || errors.userName){
            return res.status(500).send({errors})
        }
        next()
    } catch (e) {
        if(e.details && e.details.length>0) {
            if(e.details[0].message && e.details[0].path && e.details[0].path.length > 0) {
                res.status(500).send({errors:{[e.details[0].path[0]]:e.details[0].message.replace(/\"/g,"")}})
            }
        }

    }
}

module.exports = {
    signUpValidator
}
