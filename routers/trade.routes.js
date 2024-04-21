import TradeController from "../controllers/tradeController.js";

// Routes for trade operations

export default function (router) {
  router.post("/add/", TradeController.create);
  router.get("/PortfolioDetails/", TradeController.getPortfolioDetails);
  router.get("/getAllTrade/", TradeController.GetAllTrade);
  router.put("/up/", TradeController.update);
  router.delete("/re/", TradeController.remove);
}
