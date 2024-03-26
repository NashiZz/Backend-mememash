import express from "express";
import mysql from "mysql";
import { GetUser } from "../model/getUser";
import { PostUserRespone } from "../model/UserGetRespone";
import bcrypt from "bcrypt";

export const router = express.Router();
export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web65_64011212086",
  password: "64011212086@csmsu",
  database: "web65_64011212086",
});
router.put("/editProfile", (req, res) => {

    const user: PostUserRespone = req.body;
    console.log(req.body);
    let sql = "SELECT * FROM `Adv_user` WHERE id_user = ?";

    sql = mysql.format(sql,[user.id_user])
    conn.query(sql, async (err,result)=>{
        const userRes: PostUserRespone = result[0];
        try {
          const resLogin = await bcrypt.compare(
            user.password,
            userRes.password
          );
          if (resLogin) {
            let sql = "UPDATE `Adv_user` SET `username`=?,`img_avatar`=? WHERE id_user=?";
            sql = mysql.format(sql,[user.username,user.img_avatar,user.id_user])
            conn.query(sql, async (err,result)=>{
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
                })
            // res.status(200).json(userRes);
          } else {
            res.status(204).json(err);
          }
        } catch (error) {
          res.status(500).json(error);
        }
        // res.send(result);
    })
  });