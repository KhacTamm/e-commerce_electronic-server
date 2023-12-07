import express from "express";
import {
  createNewTypeProduct,
  deleteTypeProduct,
  getAllTypeProduct,
  paginationTyPeProduct
} from "../controllers/ListTypeProductController.js";

import  {upload}  from "../untils/until.js";

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get(`/pagination/:page`, paginationTyPeProduct);
ListTypeProductRouter.post(
  "/create",
  upload.single("image"),
  createNewTypeProduct
  );
ListTypeProductRouter.delete(
  "/delete/:id",
  deleteTypeProduct
);
ListTypeProductRouter.get("/", getAllTypeProduct);

export default ListTypeProductRouter;
