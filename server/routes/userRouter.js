const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', authentication, UserController.getAllUser)
router.post('/', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.delete('/:id', authentication, UserController.deleteUser)

module.exports = router
