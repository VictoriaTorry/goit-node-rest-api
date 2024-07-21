import express, { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateUserSubscription,
} from "../controllers/authController.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} from "../models/user.js";
import { authenticate } from "../midlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

authRouter.post("/login", validateBody(userLoginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/:id",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateUserSubscription
);

export default authRouter;
