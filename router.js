import TradeSchema from "./models/trade.model.js";
import PortfolioSchema from "./models/portfolio.model.js";

import TradeRouter from "./routers/trade.routes.js";
import StockRouter from "./routers/stock.routes.js";
import PortfolioRouter from "./routers/portfolio.routes.js";

import Router from "express";

const router = Router();

TradeRouter(router);
StockRouter(router);
PortfolioRouter(router);

TradeSchema.associations();
PortfolioSchema.associations();

export default router;
