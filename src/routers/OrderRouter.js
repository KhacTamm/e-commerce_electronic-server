import express from 'express'
import {
  createOrder,
  GetAllOrder,
  DeleteOrder,
  ShippingProduct,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetAllOrderPaid,
  PaidProduct,
  GetOrderByUser,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  GetOrderPaidByUser,
  GetAllOrderInAMonth,
  GetAllOrderPaypal,
  GetAllOrderCancel,
  GetOrderPaypalByUser,
  updateOrder,
  PrintOrderGhn,
  clientCancelOrder,
} from "../controllers/OrderController.js";
import { isAuth, isAdmin } from "../untils/until.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/update/:id", updateOrder);
OrderRouter.post("/cancel/:id", clientCancelOrder);
OrderRouter.get("/print/:id", PrintOrderGhn);
OrderRouter.put("/shipping/:id", ShippingProduct);
OrderRouter.put("/paid/:id", PaidProduct);
OrderRouter.put('/delete/:id', DeleteOrder)

OrderRouter.get("/orderPaypal", GetAllOrderPaypal);
OrderRouter.get("/orderPendding", GetAllOrderPendding);
OrderRouter.get("/orderShipping", GetAllOrderShipping);
OrderRouter.get("/orderPaid", GetAllOrderPaid);
OrderRouter.get("/orderCancel", GetAllOrderCancel);

OrderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// --- user
OrderRouter.get("/:id", GetOrderByUser);
OrderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", GetOrderPaidByUser);


OrderRouter.get("/", GetAllOrder);



export default OrderRouter