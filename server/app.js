"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

/* ----------------------------------------------------- */
// Middlewares:

const cors = require("cors");
// {
//     origin: '*', // Allow all origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
//     allowedHeaders: undefined, // Allow headers requested by client (via Access-Control-Request-Headers)
//     exposedHeaders: undefined, // No response headers exposed to the browser
//     credentials: false, // Don't allow cookies or Authorization headers by default
//     preflightContinue: false, // Don't pass preflight OPTIONS to next middleware
//     optionsSuccessStatus: 204, // Response status code for successful OPTIONS
//     maxAge: undefined // Don't cache preflight responses
//   }

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET, PUT, POST, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true, // allow cookies/auth headers
  optionsSuccessStatus: 200,
  maxAge: 86400, // cache preflight for 1 day
};

app.use(cors(corsOptions))

// Accept json data
app.use(express.json());

/* ----------------------------------------------------- */
// Routes:

// Todo route
app.use("/api/todos", require("./src/routes/todoRouter"));

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});
/* ----------------------------------------------------- */
// Error handler
app.use(require("./src/middlewares/errorHandler"));

/* ----------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
