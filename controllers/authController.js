const models = require('../models/index');
const bcrypt = require('bcryptjs');
const redisClient = require('../db/redis')
const saltRounds = 10;

const signup = async (req, res) => {
    const {body: {firstName, lastName, userName, city, password, email, dateOfBirth}} = req;
    try {
        const hash = await bcrypt.hash(password, saltRounds)
        const user = await models.User.create({firstName, lastName, userName, city, password:hash, email, dateOfBirth})
        res.status(201).send({message:"You Registered Successfully."})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const signin = async (req, res) => {
    const {body: {password, email}} = req;
    try {
        const user = await models.User.findAll({where:{
                email
            }});
        if (user.length === 0) {
            return res.status(401).send({error: "Invalid email or password"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user[0].dataValues.password)
        if (!isPasswordMatch) {
            return res.status(401).send({error: "Invalid email or password"});
        }
        req.session.userId = user[0].dataValues.id;
        redisClient.client.rpush([user[0].dataValues.id.toString(),(new Date()).toLocaleString()],function(err, reply) {
            return res.status(200).send({
                name: `${user[0].dataValues.firstName} ${user[0].dataValues.lastName}` ,
                sessionId:req.sessionID
            })
        })


    } catch (e) {
        res.status(500).send({error: "internal server error"});
    }
}

module.exports = {
    signup,
    signin
}
