import { request } from "express";
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
      // console.log("portfolio test2", portfolio);
      newTrade = JSON.parse(JSON.stringify(newTrade));
      newTrade.portfolio = portfolio;
      // console.log("working", newTrade);
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
      //  step 4
      if (portfolioDetails.length > 0 && requestBody.type == "buy") {
        let buyTrades = portfolioDetails.filter((pd) => pd.type === "buy");
        console.log("buyTrades", buyTrades);
        // let calculateBuy = buyTrades.map(b => b.price);
        let sum = 0;
        buyTrades.map((bt) => {
          console.log(bt.price);
          sum = sum + bt.price;
        });
        console.log(sum);

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
        // If no portfolio entry exists, create a new one
        if (requestBody.type == "buy") {
          requestBody.average = requestBody.price;
        }
        portfolio = await PortfolioModel.create(requestBody); // You may need to adjust the default value for average_value
      }
      // Return the portfolio details
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
      const { id } = request.body; // Extract ID from request body
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
      const { id } = request.body; // Extract ID from request body
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
        .json({ status: false, error: error.message }); // Include error message
    }
  }
}

// create trade
//  1.-- trading and portfolio
//  2.create trade model - id  generate avutadi and store chesuko -- request_body_trade_id
//  3. get portfolio details based  on stock_id  -- portfolio.findAll(stock_id, order_by desc, limi 1)
//  4  if results.length === 0 ayite direct ga portfolio create chey
//  5. if(results.length > 0) take average value from results and
//  let calculatedValue = results[0].average_value+request.body.buy_value(price)
//  let averge = Number(calcultedValue/2) =>
// 6. request_body.average = average;
//7. create portfolio
