import Sequelize from "sequelize";
import sequelize from "../config/config.database.js";

const Stock = sequelize.define("stock", {
  id: {
    type: Sequelize.INTEGER(6),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  stock_name: {
    type: Sequelize.STRING(50),
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

export default Stock;
