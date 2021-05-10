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
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("this file is not a photo"));
    }
  },
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", upload.single("ProfileImg"), userController.register);
app.post("/login", userController.login);
app.use("/users", upload.single("ProfileImg"), userRoute);
app.use("/post", upload.single("Images"), postRoute);
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

module.exports = upload;
