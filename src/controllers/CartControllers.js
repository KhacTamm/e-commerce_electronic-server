import expressAsyncHandler from "express-async-handler";

import { ProductModel } from '../models/ProductModel.js'
import { CartModel } from '../models/CartModel.js'

export const getCart = expressAsyncHandler(async (req, res) => {

    const idUser = await CartModel.find({ idUser: req.params.id }).sort({
        createdAt: -1,
      });
      if (idUser) {
        res.send(idUser);
      } else {
        res.status(401).send({ message: "no order by user" });
      }
    //Lấy idUser từ query
    // const idUser = req.query.idUser

    //Tìm những sản phẩm mà user đã thêm
    // const carts = await CartModel.find({ idUser: idUser})

    // res.json(carts)   
});

//Hàm thêm sản phẩm
export const addToCart = expressAsyncHandler(async (req, res) => {
    //Lấy idUser từ query
    const idUser = req.body.idUser
    
    //Lấy idProduct từ query
    const idProduct = req.body.idProduct || req.body._id

    //Layas count từ query
    const qty = req.body.count || 1

    //Tìm sản phẩm mà user cần mua
    const product = await ProductModel.findOne({ _id: idProduct })

    //Tìm trong giỏ hàng xem thử user đã từng mua sản phẩm đó chưa
    const carts = await CartModel.findOne({ idUser: idUser, idProduct: idProduct})

    //Kiểm tra xem User đã từng thêm sản phẩm này chưa
    //Nếu không tìm thấy thì == null và insert vào
    //Nếu tìm thấy thì sẽ update số lượng
    if (!carts){

        const dataInsert = {
            idUser: idUser,
            idProduct: idProduct,
            name: product.name,
            salePrice: product.salePrice,
            price: product.price,
            amount: product.amount,
            qty: qty,
            image: product.image,
        }

        CartModel.insertMany(dataInsert)

        res.send("Thanh Cong!")

    }else{     

        carts.qty += parseInt(qty)

        carts.save()

        res.send("Thanh Cong!")

    }
});

//Hàm giam sản phẩm
export const decreaseToCart = expressAsyncHandler(async (req, res) => {
    // const deleteCart = await CartModel.findById({_id: req.params.id});
    const carts = await CartModel.findById({_id: req.params.id});

    carts.qty -= 1

    carts.save()

    res.send("Thanh Cong!")

});

//Hàm Xóa Sản Phẩm
export const deleteToCart = expressAsyncHandler(async (req, res) => {
    const deleteCart = await CartModel.findById({_id: req.params.id});
    const user = req.params.user
    if (deleteCart) {
      await deleteCart.remove();
      const idUser = await CartModel.find({idUser: user}).sort({
        createdAt: -1,
      });
      if (idUser) {
        res.send(idUser);
      } else {
        res.status(401).send({ message: "no order by user" });
      }
    } else {
      res.send("error in delete cart");
    }
});

//Hàm Xóa tất cả Sản Phẩm
export const deleteAllToCart = expressAsyncHandler(async (req, res) => {
  const userCart = await CartModel.find({idUser: req.params.id});
  if (userCart) {
    await CartModel.deleteMany({idUser: req.params.id})
    res.send({message: 'deleted cart success'});
  } else {
    res.send("error in delete cart");
  }
});

//Hàm Sửa Sản Phẩm
export const updateToCart = expressAsyncHandler(async (req, res) => {
     //Lấy idUSer của user cần sửa
     const idUser = req.query.idUser

    //Lấy idProduct của user cần sửa
    const idProduct = req.query.idProduct

    //Lấy count của user cần sửa
    const count = req.query.count

    //Tìm đúng cái sản phẩm mà User cần sửa
    var cart = await CartModel.findOne({idUser: idUser, idProduct: idProduct})

    cart.count = count
    
    cart.save()

    res.send("Update Thanh Cong")

});
