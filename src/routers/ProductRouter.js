import express from 'express'
import {
  getAllProduct,
  filterProductByType,
  findProductById,
  AddProduct,
  DeleteProduct,
  DeleteAllProduct,
  CommentProduct,
  UpdateProduct,
  HandlePaymentProduct,

  SearchProduct,
  SearchType,
  SearchBrand,

  paginationProduct,
  RateProduct,
  RepCommentProduct,
  BlogProduct,
  PinCommentProduct,
  filterProductByRandomField,
} from "../controllers/ProductController.js";
import { isAuth, isAdmin } from "../untils/until.js";
import { upload } from "../untils/until.js";

const ProductRouter = express.Router();

// ProductRouter.get("/:type", filterProductByType);
ProductRouter.post("/filter/random", filterProductByRandomField);
ProductRouter.get("/detail/:id", findProductById);
ProductRouter.get(`/pagination/:page`, paginationProduct);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

ProductRouter.post(
  "/create",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  AddProduct
);
ProductRouter.put(
  "/update",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  UpdateProduct
);
ProductRouter.put(
  "/handlepayment",
  // isAuth,
  // isAdmin,
  // upload.single("image"),
  HandlePaymentProduct
);
ProductRouter.post(
  "/blog/:id",
  // isAuth,
  // isAdmin,
  BlogProduct
);

ProductRouter.delete(
  "/delete/all",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  DeleteAllProduct
);

ProductRouter.delete(
  "/delete/:id",
  // isAuth,
  // isAdmin,
  upload.single("image"),
  DeleteProduct
);



        
ProductRouter.get('/search/product', SearchProduct)
ProductRouter.get('/search/type', SearchType)
ProductRouter.get('/search/brand', SearchBrand)

ProductRouter.get("/", getAllProduct);
export default ProductRouter