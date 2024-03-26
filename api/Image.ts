import express from "express";
import mysql from "mysql";
import { putImageReq } from "../model/putImageReq";
export const router = express.Router();
export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web65_64011212086",
  password: "64011212086@csmsu",
  database: "web65_64011212086",
});

router.get("/", (req, res) => {
  conn.query('select * from Adv_img ', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
  // res.send('Get in trip.ts id: '+ req.params.id);
});

router.put("/:id", async (req, res) => {
  let id = +req.params.id;
  let image: putImageReq = req.body;
  let sql = "UPDATE `Adv_img` SET `img`=?,`id_user`=?,`name`=?,`score`=? WHERE `id_img`=?";
  sql = mysql.format(sql, [
    image.img,
    image.id_user,
    image.name,
    image.score,
    id
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ affected_row: result.affectedRows });
  });
});
router.get("/top", (req, res) => {
  conn.query('SELECT * FROM Adv_img ORDER BY score DESC LIMIT 10', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
  // res.send('Get in trip.ts id: '+ req.params.id);
});
router.delete("/:id", (req, res) => {
  let id = +req.params.id;
  let sql = "DELETE FROM `Adv_img` WHERE `id_img`=?";
  sql = mysql.format(sql, [id]);
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ affected_row: result.affectedRows });
    }
  });
});
// router.post("/", async (req, res) => {
//   const user = req.body;
//   const moment = require("moment");

//   const formattedDateTime = moment(new Date().toLocaleString()).format(
//     "Y-MM-DD HH:mm:ss"
//   );
//   console.log(formattedDateTime);
//   let sql =
//     "INSERT INTO `Adv_vote`(`id_img`, `username`, `date_time`, `score`) VALUES (?,?,?,?)";
//   sql = mysql.format(sql, [
//     user.id_img,
//     user.username,
//     formattedDateTime,
//     user.score,
//   ]);
// //   res.send(formattedDateTime);
//   conn.query(sql, (err, result) => {
//     res
//       .status(201)
//       .json({ affected_row: result.affectedRows, last_idx: result.insertId });
//   });
//   //   res.send(haspasswd);
// });