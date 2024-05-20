import { Router } from "express";
import FlowDistribution from "../services/distribution.js";

const router = Router();

router.post("/", async (req, res) => {
  const users = req.body.users;
  const flowDistribution = new FlowDistribution(req.astrologers);
  flowDistribution.distributeUsers(users);

  await Promise.all(req.astrologers.map((astrologer) => astrologer.save()));
  res.send(req.astrologers);
});

export default router;
