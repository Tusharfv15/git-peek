import express from "express";
import { getUserProfileAndRepos } from "../controllers/userController.js";
import { ensureIsAuthenticated } from "../middleware/ensureIsAuthenticated.js";
import { likeProfile } from "../controllers/userController.js";
import { getLikes } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
router.get('/likes',ensureIsAuthenticated,getLikes)
router.post("/likes/:username", ensureIsAuthenticated, likeProfile);
export default router;
