import expressAsyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import { ListBrandProductModel } from '../models/ListBrandProductModel.js'

export const getAllBrandProduct = expressAsyncHandler(async (req, res) => {
    const allBrand = await ListBrandProductModel.find({})
    res.send(allBrand)
})


export const createBrandProduct = expressAsyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
      });
    const newBrand = new ListBrandProductModel({
        name: req.body.name,
        img: result.secure_url,
        cloudinary_id: result.public_id,
    }) 

    await newBrand.save()
    res.send(newBrand)
})

export const deleteBrandProduct = expressAsyncHandler(async (req, res) => {
    const brandProduct = await ListBrandProductModel.findById({_id: req.params.id})

    await cloudinary.uploader.destroy(brandProduct.cloudinary_id)

    if(brandProduct){
        await brandProduct.remove()
        res.send({msg: 'deleted brand product'})
    }else{
        res.send({msg: 'product not found'})
    }

})


export const paginationBrandProduct = expressAsyncHandler(async (req, res) => {
    var perPage = 5
    var page = req.params.page || 1

    ListBrandProductModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, brand) {
            ListBrandProductModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    ListBrannd: brand,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})