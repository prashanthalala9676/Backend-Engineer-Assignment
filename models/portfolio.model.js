import Sequelize from "sequelize";
import sequelize from "../config/config.database.js";
import StockModel from "../models/stock.model.js";
import TradeModel from "../models/trade.model.js";

const Portfolio = sequelize.define("portfolio", {
  id: {
    type: Sequelize.INTEGER(6),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  stock_id: {
    type: Sequelize.INTEGER(6),
    references: {
      model: "stocks",
      key: "id",
    },
    allowNull: false,
  },
  trade_id: {
    type: Sequelize.INTEGER(6),
    references: {
      model: "trades",
      key: "id",
    },
  },
  type: {
    type: Sequelize.ENUM("buy", "sell"),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER(50),
    allowNull: false,
  },
  average: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
},
updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
}
});

Portfolio.associations = function () {
  Portfolio.belongsTo(TradeModel, { as: "trade", foreignKey: "trade_id" });
  Portfolio.belongsTo(StockModel, { as: "stock", foreignKey: "stock_id" });
};
export default Portfolio;
