import httpStatus from "http-status-codes";
import StockModel from "../models/stock.model.js";

export default class StockController {
  static async Create(request, response) {
    try {
      const newStocks = await StockModel.create(request.body);
      response.status(httpStatus.OK).send({ success: true, data: newStocks });
    } catch (error) {
      response
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ success: false, error: error.message });
    }
  }

  static async GetAllStock(request, response) {
    try {
      const getStocks = await StockModel.findAll();
      response.status(httpStatus.OK).send({ success: true, data: getStocks });
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
      let stockUpdate = await StockModel.update(request.body, {
        where: { id: request.body.id },
      });
      if (stockUpdate[0] === 1) {
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

      const stockDeleted = await StockModel.destroy({ where: { id } });

      if (stockDeleted === 1) {
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
