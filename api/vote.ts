import express from "express";
import mysql from "mysql";
import { VoteGetXlable } from "../model/voteGetXlable";
import { VotePostDateReq } from "../model/votePostDateReq";
export const router = express.Router();
export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web65_64011212086",
  password: "64011212086@csmsu",
  database: "web65_64011212086",
});
router.get("/", (req, res) => {
  conn.query(
    `SELECT
    ROW_NUMBER() OVER (
      ORDER BY img.score DESC
      ) number , 
    img.id_img,
    img.img,
    img.name,
    img.score AS Adv_img_score,
    COUNT(vote.id_vote) AS countvote
    FROM Adv_img img
    LEFT JOIN Adv_vote vote ON img.id_img = vote.id_img
    GROUP BY img.id_img, img.score 
    ORDER BY img.score DESC`,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});
router.post("/ranking", (req, res) => {
  const body : VotePostDateReq = req.body;
  const date = "%"+body.date+"%"
  let sql = `SELECT ROW_NUMBER() OVER (ORDER BY max(vote.score) DESC) AS number,
        img.name,img.img,vote.id_img ,max(vote.score) as score
        FROM Adv_img img
        LEFT JOIN Adv_vote vote ON img.id_img = vote.id_img
        WHERE vote.date_time LIKE ?
        GROUP BY vote.id_img , img.name ,img.img 
        ORDER BY max(vote.score) DESC`;
  sql = mysql.format(sql,[date])
  conn.query(sql,(err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});
router.post("/ylabel", (req, res) => {
  const xlabel: VoteGetXlable = req.body;
  let sql = "SELECT score,DATE_FORMAT(date_time, '%H:%i') as time ,DATE_FORMAT(date_time, '%Y-%m-%d') AS day   FROM Adv_vote where  id_img = ?  LIMIT 1000";
  sql = mysql.format(sql,[xlabel.id_img])
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/", async (req, res) => {
  const user = req.body;
  const moment = require("moment");
  const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  // console.log(formattedDateTime);
  let sql =
    "INSERT INTO `Adv_vote`(`id_img`, `username`, `date_time`, `score`) VALUES (?,?,?,?)";
  sql = mysql.format(sql, [
    user.id_img,
    user.username,
    formattedDateTime,
    user.score,
  ]);
  //   res.send(formattedDateTime);
  conn.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
      }
  });
  //   res.send(haspasswd);
});
