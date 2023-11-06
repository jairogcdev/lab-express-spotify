require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

const app = express();
const router = express.Router();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
// default value for title local
const projectName = "Ironhack Spotify";

app.locals.appTitle = `${projectName} created with IronLauncher`;

const indexRouter = require("./routes/index.routes.js");
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`My Spotify project running on port ${PORT} 🎧 🥁 🎸 🔊`)
);
