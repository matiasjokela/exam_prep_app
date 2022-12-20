const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const questionsRouter = require("./controllers/questions");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error:", error);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use(middleware.requestLogger);
app.use(
  "/api/questions",
  middleware.tokenExtractor,
  middleware.userExtractor,
  questionsRouter
);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use("/stats", middleware.requestLogger);
app.use("/game", middleware.requestLogger);
app.use("/login", middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
