require("dotenv").config();
const express = require("express");
const mongoConnection = require("./connection");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const healthRoute = require("./routes/HealthRoute");
const passport = require("passport");
const { initializePassport } = require("./passport");

const app = express();
app.use(cors());
mongoConnection(process.env.DATABASE_URL);

initializePassport(passport)

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRoute);
app.use(authRoutes);

app.listen(process.env.APP_PORT);
