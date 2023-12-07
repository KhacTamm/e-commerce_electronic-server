import express from "express";
import { 
  getAllBrandProduct,
  createBrandProduct,
  deleteBrandProduct,
  paginationBrandProduct } 
from "../controllers/ListBrandProductController.js";
import  {upload}  from "../untils/until.js";

const ListBrandProductRouter = express.Router();

ListBrandProductRouter.get(`/pagination/:page`, paginationBrandProduct);
ListBrandProductRouter.get("/", getAllBrandProduct);

ListBrandProductRouter.post(
  "/create",
  upload.single("image"),
  createBrandProduct
);
ListBrandProductRouter.delete(
  "/delete/:id",
  deleteBrandProduct
  );
  

  
export default ListBrandProductRouter;
