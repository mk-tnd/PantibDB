require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./middlewares/error");
const { sequelize } = require("./models");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const postRoute = require("./route/postRoute");
const zoneRoute = require("./route/zoneRoute");
const promoteRoute = require("./route/promoteRoute");
const userController = require("./controllers/userController");
const commendRoute = require("./route/commendRoute");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", userController.register);
app.post("/login", userController.login);
app.use("/users", userRoute);
app.use("/post", postRoute);
app.use("/zone", zoneRoute);
app.use("/promote", promoteRoute);
app.use("/commend", commendRoute);

app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

sequelize.sync({ force: false }).then(() => console.log("DB Sync"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
