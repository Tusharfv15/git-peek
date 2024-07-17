import express from "express";
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import "./passport/githubAuth.js";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
dotenv.config();

const app = express();
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/explore", exploreRoutes);
app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
  connectMongoDb();
});
