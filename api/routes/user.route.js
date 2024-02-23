import express from "express";

// Create a router instance
const router = express.Router();

// Define routes
router.get("/", (req, res) => {
  res.status(200).json({ message: "This is a demo route" });
});

export default router;
