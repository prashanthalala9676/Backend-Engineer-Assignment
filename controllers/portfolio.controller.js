import httpStatus from "http-status-codes";
import PortfolioModel from "../models/portfolio.model.js";

export default class PortfolioController {
  static async Create(request, response) {
    try {
      const addPortfolio = await PortfolioModel.create(request.body);
      response
        .status(httpStatus.OK)
        .send({ success: true, data: addPortfolio });
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, error: error.message });
    }
  }

  static async GetAllPortfolio(request, response) {
    try {
      const getPortfolio = await PortfolioModel.findAll();
      response
        .status(httpStatus.OK)
        .send({ success: true, data: getPortfolio });
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
      let portfolioUpdate = await PortfolioModel.update(request.body, {
        where: { id: request.body.id },
      });
      if (portfolioUpdate[0] === 1) {
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

      const portfolioDeleted = await PortfolioModel.destroy({ where: { id } });

      if (portfolioDeleted === 1) {
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
