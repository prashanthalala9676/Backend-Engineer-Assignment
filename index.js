import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/config.database.js";
import routes from "./router.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

sequelize.sync({ alter: true });

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Routes
app.use("/trade", routes);

app.listen(PORT, () => {
  console.log("Server is running on: ", PORT);
});

export default app;
