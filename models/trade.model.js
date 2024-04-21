import Sequelize from "sequelize";
import sequelize from "../config/config.database.js";
import StockModel from "../models/stock.model.js";

const Trade = sequelize.define("trade", {
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
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
},
updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
}
});

Trade.associations = function () {
  Trade.belongsTo(StockModel, { as: "stock", foreignKey: "stock_id" });
};

export default Trade;
