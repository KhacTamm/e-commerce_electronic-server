import expressAsyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import { ListTypeProductModel } from '../models/ListTypeProductModel.js'


export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
    const allType = await ListTypeProductModel.find({})
    res.send(allType)
})

export const createNewTypeProduct = expressAsyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
      });
    const newType = new ListTypeProductModel({
        name: req.body.name,
        img: result.secure_url,
        cloudinary_id: result.public_id,
    }) 

    await newType.save()
    res.send(newType)
})

export const deleteTypeProduct = expressAsyncHandler(async (req, res) => {
    const typeProduct = await ListTypeProductModel.findById({_id: req.params.id})

    await cloudinary.uploader.destroy(typeProduct.cloudinary_id)

    if(typeProduct){
        await typeProduct.remove()
        res.send({msg: 'deleted type product'})
    }else{
        res.send({msg: 'product not found'})
    }

})

export const paginationTyPeProduct = expressAsyncHandler(async (req, res) => {
    var perPage = 5
    var page = req.params.page || 1
    ListTypeProductModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            ListTypeProductModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    typeProducts: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

// export const DeleteTypeProduct = expressAsyncHandler(async (req, res) => {
//     const deleteTypeProduct = await ListTypeProductModel.findById(req.params.id)

//     // await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);

//     if(deleteTypeProduct){
//         await deleteTypeProduct.remove()
//         res.send({message: 'product deleted'})
//     } else{
//         res.send('error in deletetion')
//     }
// })
