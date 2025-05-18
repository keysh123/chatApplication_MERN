const router = require('express').Router()
const { register, login , setAvatar, getAllUsers } = require('../controllers/userController')

router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar",setAvatar)
router.get("/getAllUsers/:id",getAllUsers)
module.exports = router