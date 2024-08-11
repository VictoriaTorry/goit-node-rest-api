import express, { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  updateUserSubscription,
} from "../controllers/authController.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} from "../models/User.js";
import { authenticate } from "../midlewares/authenticate.js";
import { upload } from "../midlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

authRouter.post("/login", validateBody(userLoginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  // upload.array('avatars', 8) --- 8 це максимальна кількість файлів
  updateAvatar
)

authRouter.patch(
  "/:id",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateUserSubscription
);

export default authRouter;
