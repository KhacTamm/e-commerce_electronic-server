import {UserModel} from '../models/UserModel.js'
import {generateToken} from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err))
}

export const registerUser = expressAsyncHandler(async (req, res) => {
 
 console.log(req.body.name)
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: '',
        phone: '',
        isAdmin: false,
    })
    const createUser = user.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address ,
        phone: user.phone,
        token: generateToken(user),
    });
})

export const login = expressAsyncHandler(async (req, res) => {
    const user = await  UserModel.findOne({email: req.body.email, password: req.body.password})

    if(user){ 
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    }else{
        res.status(401).send({message: "Email hoặc mật khẩu không hợp lệ"})
    }
})

export const UpdateUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findOne({_id: req.params.id})

    if(user){
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.address = req.body.address;
        if(req.body.password != undefined) {
            user.password = req.body.password
        }
        
        const updateUser = await user.save();


        if (updateUser) {
            return res
            .status(201)
            .send(updateUser);
        }
    }else{
        res.send({message: 'user not exists'})
    }
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({_id: req.params.id})

    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})



