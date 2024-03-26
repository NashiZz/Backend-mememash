import express from "express";
import {router as home} from "./api/home";
import {router as login} from "./api/login";
import {router as vote} from "./api/vote";
import {router as Image} from "./api/Image";
import {router as user} from "./api/user";
import {router as upload} from "./uploads/upload";
export const app = express();
import bodyParser from "body-parser";
import cors from "cors";
// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });
app.use(
    cors({
      origin: "*",
    })
  );
app.use(bodyParser.json());
app.use("/", home);
app.use("/login", login);
app.use("/vote", vote);
app.use("/user", user);
app.use("/image", Image);
app.use("/upload", upload);
app.use("/uploads", express.static("uploads"));
