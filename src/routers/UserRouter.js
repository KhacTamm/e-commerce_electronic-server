import express from 'express'
import {getAllUser, registerUser, login, DeleteUser, UpdateUser} from '../controllers/UserController.js'
const UserRouter = express.Router()
import {isAuth, isAdmin} from '../untils/until.js'

UserRouter.put('/update/:id', UpdateUser)
// UserRouter.post('/update/:id', registerUser)
UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)

export default UserRouter
