import express from "express";
import mysql from "mysql";
import bcrypt from "bcrypt";
import { GetUser } from "../model/getUser";
import { PostUser } from "../model/postUser";
import { PostUserRespone } from "../model/UserGetRespone";

export const router = express.Router();
export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web65_64011212086",
  password: "64011212086@csmsu",
  database: "web65_64011212086",
});

router.post("/",  (req, res) => {
  const user: GetUser = req.body;
  let sql = "SELECT * FROM `Adv_user` WHERE email=?"
  sql = mysql.format(sql,[user.email])
    conn.query(sql, async (err,result)=>{
        const userRes: PostUserRespone = result[0];
        try {
          const resLogin = await bcrypt.compare(
            user.password,
            userRes.password
          );
          if (resLogin) {
            res.status(200).json(userRes);
          } else {
            res.status(204).json(err);
          }
        } catch (error) {
          res.status(500).json(error);
        }
        // res.send(result);
    })
  
//   res.send(user);
});
router.post("/singin", async (req, res) => {
  const user: PostUser = req.body;
  const status = "user";
  const haspasswd = await bcrypt.hash(user.password, 10);
  let sql =
    "INSERT INTO `Adv_user`( `username`, `email`, `password`, `img_avatar`, `status`) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [
    user.username,
    user.email,
    haspasswd,
    user.img_avatar,
    status,
  ]);
  conn.query(sql, (err, result) => {
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
  //   res.send(haspasswd);
});
