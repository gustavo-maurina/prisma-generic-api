import express from "express";

const router = express.Router();

router.route("/").post(async (req, res) => {
  res.status(200);
});

export default router;
