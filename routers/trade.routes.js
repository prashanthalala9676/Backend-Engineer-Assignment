import TradeController from "../controllers/trade.Controller.js";

export default function (router) {
  router.post("/add/", TradeController.create);
  router.get("/PortfolioDetails/", TradeController.getPortfolioDetails);
  router.get("/getAllTrade/", TradeController.GetAllTrade);
  router.put("/tradeUpdate/", TradeController.update);
  router.delete("/tradeRemove/", TradeController.remove);
}
