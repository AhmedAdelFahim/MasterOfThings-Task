const redisClient = require('../db/redis')


const auth = (req, res, next) => {
    let sessionId = req.headers["session-id"]
    if (!sessionId) {
        return res.status(403).send({message: "No Session Id Provided"})
    }
    // get user's id from redis by session id
    redisClient.client.get(`sess:${sessionId}`, function (err, result) {
        if (!result) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = JSON.parse(result).userId
        next()
    })
}

module.exports = {
    auth
}
