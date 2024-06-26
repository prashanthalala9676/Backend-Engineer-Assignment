# Backend-Engineer-Assignment

## Project Documentation

1. Introduction

This document outlines the structure and components of a project created using Sequelize, a promise-based ORM for Node.js, to interact with a database. The project includes models, controllers, and routers for managing trades, stocks, and portfolios.

2. Database Setup

Sequelize was used to create and interact with the database.
Database configuration settings, such as database name, username, password, and host, are specified in a configuration file (config.js or similar).
Sequelize CLI was used to generate migration files for creating tables and seeding files for initial data population. 3. Models

Three models were created to represent different entities within the application:

Trade Model (tradeModel):

Represents a trade made by a user.
Includes attributes such as trade ID, stock ID, quantity, price, and timestamp.
Stock Model (stockModel):

Represents a stock available for trading.
Includes attributes such as stock ID, name, symbol, and current price.
Portfolio Model (portfolioModel):

Represents a user's portfolio containing various stocks.
Includes attributes such as portfolio ID, user ID, stock ID, quantity, and total value. 4. Controllers

Three controllers were created to handle HTTP requests and serve responses:

Trade Controller (tradeController):

Manages trade-related operations such as creating, updating, and deleting trades.
Interacts with the trade model to perform database operations.
Stock Controller (stockController):

Handles stock-related operations such as fetching stock details and updating stock prices.
Interacts with the stock model to retrieve and manipulate stock data.
Portfolio Controller (portfolioController):

Responsible for managing portfolio-related operations such as viewing portfolio details and adding/removing stocks from a portfolio.
Utilizes the portfolio model to interact with portfolio data in the database. 5. Routers

Three routers were created to define routes and map them to controller functions:

Trade Router (tradeRouter):

Defines routes for trade-related operations such as creating, updating, and deleting trades.
Routes requests to corresponding functions in the trade controller.
Stock Router (stockRouter):

Specifies routes for stock-related operations such as fetching stock details and updating stock prices.
Directs requests to appropriate functions in the stock controller.
Portfolio Router (portfolioRouter):

Sets up routes for portfolio-related operations such as viewing portfolio details and managing portfolio contents.
Routes requests to relevant functions in the portfolio controller. 6. Main Router and index.js

The main router aggregates all sub-routers and defines the base URL for the API endpoints.
index.js serves as the entry point for the application, where the main router is initialized and the server is started.




## API Design documentation

---

## -----------------------------------STOCK APIS-----------------------------------------

1 ->
POST METHOD
Url
http://localhost:3000/trade/createStocks

Request Body
{
"stock_name": "KOTAKBANK"
}

Response Body
{
"success": true,
"data": {
"id": 3,
"stock_name": "KOTAKBANK",
"updatedAt": "2024-04-21T14:52:23.322Z",
"createdAt": "2024-04-21T14:52:23.322Z"
}
}

2 ->
GET METHOD
Url
http://localhost:3000/trade/getAllStocks

Response Body
{
"success": true,
"data": [
{
"id": 1,
"stock_name": "RELIANCE",
"createdAt": "2024-04-20T17:51:04.000Z",
"updatedAt": "2024-04-20T17:51:04.000Z"
},
{
"id": 2,
"stock_name": "HDFCBANK",
"createdAt": "2024-04-21T06:14:37.000Z",
"updatedAt": "2024-04-21T06:14:37.000Z"
},
{
"id": 3,
"stock_name": "KOTAKBANK",
"createdAt": "2024-04-21T14:52:23.000Z",
"updatedAt": "2024-04-21T14:52:23.000Z"
}
]
}

3 ->
UPDATE METHOD
Url
http://localhost:3000/trade/updateStock

Request Body
{
"id": 5,
"stock_name": "KOTAKBANK"
}

Response Body

{
"status": true,
"data": "data updated successfully"
}

4 ->
DELETE METHOD
Url
http://localhost:3000/trade/removeStock

Request Body
{
"id": 5
}

Response Body

{
"status": true,
"data": "Data was deleted successfully"
}

---

## -----------------------------------TRADE APIS-----------------------------------------

1 ->
Url
POST METHOD
http://localhost:3000/trade/add
Request Body
{
"stock_id": 2,
"type": "sell",
"date": "2015-04-10",
"quantity": 100,
"price": 800
}

Response Body

{
"status": true,
"data": {
"id": 5,
"stock_id": 2,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"quantity": 100,
"price": 800,
"updatedAt": "2024-04-21T06:16:58.300Z",
"createdAt": "2024-04-21T06:16:58.300Z",
"portfolio": {
"average": 0,
"id": 5,
"stock_id": 2,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"quantity": 100,
"price": 800,
"trade_id": 5,
"updatedAt": "2024-04-21T06:16:58.330Z",
"createdAt": "2024-04-21T06:16:58.330Z"
}
}
}

2 ->
GET METHOD
Url

http://localhost:3000/trade/getAllTrade

Response Body
{
"success": true,
"data": [
{
"id": 1,
"stock_id": 1,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 900,
"quantity": 100,
"createdAt": "2024-04-20T20:03:44.000Z",
"updatedAt": "2024-04-20T20:03:44.000Z"
},
{
"id": 2,
"stock_id": 1,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 1000,
"quantity": 50,
"createdAt": "2024-04-20T20:04:03.000Z",
"updatedAt": "2024-04-20T20:04:03.000Z"
},
{
"id": 3,
"stock_id": 1,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 850,
"quantity": 100,
"createdAt": "2024-04-20T20:04:18.000Z",
"updatedAt": "2024-04-20T20:04:18.000Z"
},
{
"id": 4,
"stock_id": 2,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 1000,
"quantity": 200,
"createdAt": "2024-04-21T06:16:21.000Z",
"updatedAt": "2024-04-21T06:16:21.000Z"
},
{
"id": 5,
"stock_id": 2,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 800,
"quantity": 500,
"createdAt": "2024-04-21T06:16:58.000Z",
"updatedAt": "2024-04-21T14:41:47.000Z"
}
]
}

3 ->
UPDATE METHOD
Url
http://localhost:3000/trade/tradeUpdate

Request Body
{
"id": 5,
"quantity": 500
}

Response Body

{
"status": true,
"data": "data updated successfully"
}

4 ->
DELETE METHOD
Url
http://localhost:3000/trade/tradeRemove

Request Body
{
"id": 5
}

Response Body

{
"status": true,
"data": "Data was deleted successfully"
}

5 ->

---

## -------------------------------PORTFOLIO APIS-----------------------------------------

PORTFOLIO APIS

1 ->
GET METHOD
url
http://localhost:3000/trade/getAllPortfolio

Response Body
{
"success": true,
"data": [
{
"id": 1,
"stock_id": 1,
"trade_id": 1,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 900,
"quantity": 100,
"average": 900,
"createdAt": "2024-04-21T15:16:38.000Z",
"updatedAt": "2024-04-21T15:16:38.000Z"
},
{
"id": 2,
"stock_id": 1,
"trade_id": 2,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 1000,
"quantity": 50,
"average": 0,
"createdAt": "2024-04-21T15:17:00.000Z",
"updatedAt": "2024-04-21T15:17:00.000Z"
},
{
"id": 3,
"stock_id": 1,
"trade_id": 3,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 850,
"quantity": 100,
"average": 875,
"createdAt": "2024-04-21T15:17:29.000Z",
"updatedAt": "2024-04-21T15:17:29.000Z"
},
{
"id": 4,
"stock_id": 2,
"trade_id": 4,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 1000,
"quantity": 200,
"average": 1000,
"createdAt": "2024-04-21T15:17:50.000Z",
"updatedAt": "2024-04-21T15:17:50.000Z"
},
{
"id": 5,
"stock_id": 2,
"trade_id": 5,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 800,
"quantity": 100,
"average": 0,
"createdAt": "2024-04-21T15:18:10.000Z",
"updatedAt": "2024-04-21T15:18:10.000Z"
},
{
"id": 6,
"stock_id": 2,
"trade_id": 6,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 900,
"quantity": 50,
"average": 950,
"createdAt": "2024-04-21T15:18:32.000Z",
"updatedAt": "2024-04-21T15:18:32.000Z"
},
{
"id": 7,
"stock_id": 3,
"trade_id": 7,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 800,
"quantity": 200,
"average": 800,
"createdAt": "2024-04-21T15:18:48.000Z",
"updatedAt": "2024-04-21T15:18:48.000Z"
},
{
"id": 8,
"stock_id": 3,
"trade_id": 8,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 2000,
"quantity": 100,
"average": 0,
"createdAt": "2024-04-21T15:19:05.000Z",
"updatedAt": "2024-04-21T15:19:05.000Z"
},
{
"id": 9,
"stock_id": 3,
"trade_id": 9,
"type": "buy",
"date": "2015-04-10T00:00:00.000Z",
"price": 1000,
"quantity": 200,
"average": 900,
"createdAt": "2024-04-21T15:19:19.000Z",
"updatedAt": "2024-04-21T15:19:19.000Z"
}
]
}

2->
POST METHOD
Url
POST METHOD
http://localhost:3000/trade/createPortfolio
Request Body
{
"stock_id": 2,
"trade_id": 1
"type": "sell",
"date": "2015-04-10",
"quantity": 100,
"price": 800,
"average": 0
}

Response Body
{
"success": true,
"data": [
{
"id": 1,
"stock_id": 2,
"trade_id": 1,
"type": "sell",
"date": "2015-04-10T00:00:00.000Z",
"price": 800,
"quantity": 100,
"average": 0,
"createdAt": "2024-04-21T15:16:38.000Z",
"updatedAt": "2024-04-21T15:16:38.000Z"
}
]
}

3 ->
UPDATE METHOD
Url
http://localhost:3000/trade/updatePortfolio

Request Body
{
"id": 5,
"price": 5000
}

Response Body

{
"status": true,
"data": "data updated successfully"
}

4 ->
DELETE METHOD
Url
http://localhost:3000/trade/removePortfolio

Request Body
{
"id": 5
}

Response Body

{
"status": true,
"data": "Data was deleted successfully"
}
