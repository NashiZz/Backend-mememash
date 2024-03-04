import express from "express";
import {router as home} from "./api/home";
import {router as login} from "./api/login";
export const app = express();
import bodyParser from "body-parser";
// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });
app.use(bodyParser.json());
app.use("/", home);
app.use("/login", login);
