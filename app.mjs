import express from "express";
import bodyParser from "body-parser";
import Astrologer from "./models/astrologer.js";
import { connect } from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connect();

app.use(bodyParser.json());

import user from "./routes/user.js";

// Middleware to populate astrologers
app.use(async (req, res, next) => {
  req.astrologers = await Astrologer.find();
  next();
});

app.use("/user", user);

app.post("/toggleTopAstrologer", async (req, res) => {
  const { id, status } = req.body;
  const astrologer = await Astrologer.findById(id);
  if (astrologer) {
    astrologer.isTopAstrologer = status;
    await astrologer.save();
  }
  res.send(await Astrologer.find());
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
