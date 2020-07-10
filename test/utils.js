const models = require('../models/index')
const userOne = {
    firstName:"Ahmed",
    lastName:"Adel",
    email:"ahmed1@gmail.com",
    password:"123456789",
    userName:"ahmed123",
    dateOfBirth:"2020-01-01",
    city:"cairo"
}

const setupDatabase = async function  ()  {
    await models.User.destroy({
        where: {},
        truncate: true
    })
}

module.exports = {
    userOne,
    setupDatabase
}
