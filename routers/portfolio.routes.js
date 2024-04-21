import PortfolioController from "../controllers/portfolio.controller.js";

export default function (router) {
  router.post("/createPortfolio/", PortfolioController.Create);
  router.get("/getAllPortfolio/", PortfolioController.GetAllPortfolio);
  router.put("/updatePortfolio/", PortfolioController.update);
  router.delete("/removePortfolio/", PortfolioController.remove);
}
