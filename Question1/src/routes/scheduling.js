import express from "express";
import { scheduleVehicles } from "../services/schedulingsService.js";

const router = express.Router();

router.get("/:depotId", async (req, res) => {
  try {
    const result = await scheduleVehicles(
      req.params.depotId
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;