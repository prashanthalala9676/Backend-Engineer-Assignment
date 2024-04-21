import httpStatus from "http-status-codes";
import TradeModel from "../models/trade.model.js";
import PortfolioModel from "../models/portfolio.model.js";

export default class TradeController {
  // step2
  static async create(request, response) {
    try {
      let newTrade = await TradeModel.create(request.body);
      request.body.trade_id = newTrade.id;
      let portfolio = await TradeController.getPortfolioDetails(request.body);
      newTrade = JSON.parse(JSON.stringify(newTrade));
      newTrade.portfolio = portfolio;
      response.status(httpStatus.OK).send({ status: true, data: newTrade });
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: false, error: error.message });
    }
  }
  // step 3

  static async getPortfolioDetails(requestBody) {
    let portfolio;
    try {
      const portfolioDetails = await PortfolioModel.findAll({
        where: { stock_id: requestBody.stock_id },
        raw: true,
      });
      console.log("portfolioDetails - working", )
      //  step 4
      if (portfolioDetails.length > 0 && requestBody.type == "buy") {
        let buyTrades = portfolioDetails.filter((pd) => pd.type === "buy");
        console.log("buyTrades", buyTrades);
        let sum = 0;
        buyTrades.map((bt) => {
          console.log(bt.price);
          sum = sum + bt.price;
        });

        let calculatedValue = sum + requestBody.price;
        requestBody.average = Number(
          calculatedValue / (buyTrades.length + 1).toFixed(2)
        );
        console.log("requestBody.average", requestBody.average);
        portfolio = await PortfolioModel.create(requestBody);
      }
      if (
        portfolioDetails.length === 0 ||
        (portfolioDetails.length > 0 && requestBody.type == "sell")
      ) {
        if (requestBody.type == "buy") {
          requestBody.average = requestBody.price;
        }
        portfolio = await PortfolioModel.create(requestBody);
      }
      return portfolio;
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error;
    }
  }

  static async GetAllTrade(request, response) {
    try {
      const getTrade = await TradeModel.findAll();
      response.status(httpStatus.OK).send({ success: true, data: getTrade });
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, error: error.message });
    }
  }

  static async update(request, response) {
    try {
      const { id } = request.body; 
      if (!id) {
        return response
          .status(httpStatus.BAD_REQUEST)
          .json({ status: false, message: "ID not provided" });
      }
      let tradeUpdate = await TradeModel.update(request.body, {
        where: { id: request.body.id },
      });
      if (tradeUpdate[0] === 1) {
        response
          .status(httpStatus.OK)
          .send({ status: true, data: "data updated successfully" });
      } else {
        response
          .status(httpStatus.NOT_FOUND)
          .send({ status: false, message: "Data not found" });
      }
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error });
    }
  }

  static async remove(request, response) {
    try {
      const { id } = request.body;
      if (!id) {
        return response
          .status(httpStatus.BAD_REQUEST)
          .json({ status: false, message: "ID not provided" });
      }

      const tradeDeleted = await TradeModel.destroy({ where: { id } });

      if (tradeDeleted === 1) {
        return response
          .status(httpStatus.OK)
          .json({ status: true, data: "Data was deleted successfully" });
      } else {
        return response
          .status(httpStatus.NOT_FOUND)
          .json({ status: false, message: "Data not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, error: error.message });
    }
  }
}
