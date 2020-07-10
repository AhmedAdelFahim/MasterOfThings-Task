const models = require('../models/index')
const redisClient = require('../db/redis')

const getLastLoginTime =async (req, res)=>{
    try {
        // retrieve user data by id
        const user = await models.User.findOne({
            where:{
                id:req.userId
            }
        });
        // retrieve user's last login dates from redis
        redisClient.client.lrange(req.userId.toString(), 0, -1, function (err, result) {
            if(!result) {
                return res.status(500).send({message: 'internal server error'})
            }
            res.send({userName:user.userName, lastLoginDate:result.reverse()})
        })

    } catch (e) {
        res.status(500).send({message: 'internal server error'})
    }


}

module.exports = {
    getLastLoginTime
}
