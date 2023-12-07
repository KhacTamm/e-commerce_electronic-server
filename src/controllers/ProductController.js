import {ProductModel} from '../models/ProductModel.js'
import expressAsyncHandler from 'express-async-handler'
import { PinComment } from '../untils/until.js'
import cloudinary from 'cloudinary'
// import {data} from '../data.js'

export const getAllProduct = expressAsyncHandler(async (req, res) => {
    // await ProductModel.remove()
    // const product = await ProductModel.insertMany(data.products)
    // ProductModel.find()
    //     .then(product => res.send(product))
    //     .catch(err => console.log(err))
    const products = await ProductModel.find({})
    res.send(products)
})

export const findProductById = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    
    if(product){
        res.send(product)
    }else{
        res.send({message: 'product not found'})
    }
})

export const filterProductByType =  expressAsyncHandler(async (req, res) => {
    // ProductModel.find({type: req.params.type})
    //     .then(product => res.send(product))
    //     .catch(err =>    .log(err))
    // console.log('----------------')
    // console.log(req.params.type)

    const filterProductByType = await ProductModel.find({type: req.params.type}).limit(5)
    res.send(filterProductByType)
})

export const filterProductByRandomField = expressAsyncHandler(async (req, res) => {
    const products = await ProductModel.find(req.body)
    if(products){
        res.send(products)
    }else{
        res.send({message: 'product not found'})
    }
})

export const AddProduct = expressAsyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "dev_setups",
  });

  const product = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    salePrice: req.body.salePrice,
    amount: req.body.amount,
    type: req.body.type || 'iphone',
    brand: req.body.brand || 'iphone',
    image: result.secure_url,
    cloudinary_id: result.public_id,
    rating: 0,
    property: req.body.property || [],

    os: req.body.os,
    ram: req.body.ram,
    battery: req.body.battery,
    rom: req.body.rom,
    disk: req.body.disk,
    card: req.body.card,
    screen: req.body.screen,
    cameraAfter: req.body.cameraAfter,
    cameraBefore: req.body.cameraBefore,
    resolution: req.body.resolution,

    special: req.body.special,
    design: req.body.design,
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  } else {
    res.send("error add product");
  }
});

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.body._id);

  await cloudinary.uploader.destroy(product.cloudinary_id);

  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
  }

  if (product) {
    product.name = req.body.name;
    product.amount = req.body.amount;
    product.price = req.body.price;
    product.salePrice = req.body.salePrice;
    product.type = req.body.type;
    product.brand = req.body.brand;
    product.image = result?.secure_url || product.image;
    product.rating = 0;
    product.cloulinary_id = result?.public_id || product.cloudinary_id;

    product.os = req.body.os;
    product.ram = req.body.ram;
    product.battery = req.body.battery;
    product.rom = req.body.rom;
    product.screen = req.body.screen;
    product.cameraAfter = req.body.cameraAfter;
    product.cameraBefore = req.body.cameraBefore;
    product.resolution = req.body.resolution;
    product.card = req.body.card;
    product.disk = req.body.disk;
    


    product.special = req.body.special;
    product.design = req.body.design;

    console.log(req.body.name)

    const updateProduct = await product.save();
    if (updateProduct) {
        return res
        .status(201)
        .send({ message: "New Product Created", data: updateProduct });
    }
  }

  return res.send("update fail");
});

export const HandlePaymentProduct = expressAsyncHandler(async (req, res) => {
    const data = req.body
    let i = 0
   while( i < data.length ) {
    let id = data[i].idProduct
    const product = await ProductModel.findById(id);
    if(product) {
        product.amount = product.amount - data[i].qty;
        product.rating = product.rating + data[i].qty;
        // console.log(product.amount)
        const updateProduct = await product.save();
        if (updateProduct) {
          res.send("update success");
        }
    }
    i++
   }
   return res.send("update fail");
});

export const DeleteProduct = expressAsyncHandler(async (req, res) => {
    const deleteProduct = await ProductModel.findById(req.params.id)

    // await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);

    if(deleteProduct){
        await deleteProduct.remove()
        res.send({message: 'product deleted'})
    } else{
        res.send('error in deletetion')
    }
})

export const DeleteAllProduct = expressAsyncHandler (async (req, res) => {

    const deleteProduct = await ProductModel.deleteMany({})

     if(deleteProduct){
        res.send({message: 'product deleted'})
    } else{
        res.send('error in deletetion')
    }

});

export const SearchProduct = expressAsyncHandler(async (req, res) => {
    const name = req.query.name
    const product = await ProductModel.find({name: {$regex: name, $options: '$i'}})
    
    product.length > 0 ? res.send(product) : res.send({message: ' khong tim thay sp'})
})

// ---------------------------------------Type-----------------------
export const SearchType = expressAsyncHandler(async (req, res) => {
    // console.log(req.query.type)
    const type = req.query.type
    const product = await ProductModel.find({type: {$regex: type, $options: '$i'}})
    
    product.length > 0 ? res.send(product) : res.send({message: ' khong tim thay sp'})
})
// ---------------------------------------Type--------------------------


// ---------------------------------------Brand------------------------
export const SearchBrand = expressAsyncHandler(async (req, res) => {
    // console.log(req.query.type)
    const brand = req.query.brand
    // console.log(brand)
    const product = await ProductModel.find({brand: {$regex: brand, $options: '$i'}})
    // console.log(product)
    product.length > 0 ? res.send(product) : res.send({message: ' khong tim thay sp'})
})
// ---------------------------------------Brand------------------------

export const paginationProduct = expressAsyncHandler(async (req, res) => {
    var perPage = 4
    var page = req.params.page || 1
    ProductModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            ProductModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

export const RateProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const existsUser = product.reviews.find(x => x.name === req.body.name)
        if(existsUser){
            res.send({message: 'ban da danh gia san pham nay'})
        }else{
            product.reviews.push(req.body)
            const updateProduct = await product.save()
            res.send(updateProduct)
        }
        
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const CommentProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        product.comments.push(req.body)
        const updateCommentProduct = await product.save()
        res.send(updateCommentProduct)
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const RepCommentProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
        product.comments[indexComment].replies.push(req.body)

        await product.save()
        res.send(product)
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const PinCommentProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
        product.comments[indexComment] = req.body
        PinComment(product.comments, indexComment, 0)

        await product.save()
        res.send(product)
    }else{
        res.status(400).send({message: 'product not found'})
    }
})

export const BlogProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    
    if(product){
        product.blog = req.body.blogContent
        await product.save()
        res.send(product)
    }else{
        res.send({message: 'product not found'})
    }
})
