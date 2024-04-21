import StockController from "../controllers/stock.controller.js";

export default function (router) {
  router.post("/createStocks/", StockController.Create);
  router.get("/getAllStocks/", StockController.GetAllStock);
  router.put("/updateStock/", StockController.update);
  router.delete("/removeStock/", StockController.remove);
}
