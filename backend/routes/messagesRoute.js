const router = require('express').Router()
const { register, login , setAvatar, getAllUsers } = require('../controllers/userController')
const {getAllMessages , addMessage} = require('../controllers/messagesController')

router.post("/getAllMessages",getAllMessages)
router.post("/addMessage",addMessage)

module.exports = router