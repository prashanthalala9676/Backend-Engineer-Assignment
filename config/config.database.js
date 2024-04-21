import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("database is connected to the server");
  })
  .catch((error) => {
    console.log("unabale to connect to database");
  });

export default sequelize;
