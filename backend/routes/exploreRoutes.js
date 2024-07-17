
import express from "express";
import { explorePopularRepos } from "../controllers/exploreController.js";
import { ensureIsAuthenticated } from "../middleware/ensureIsAuthenticated.js";
const router = express.Router();

router.get('/repos/:language',ensureIsAuthenticated,explorePopularRepos)
export default router;