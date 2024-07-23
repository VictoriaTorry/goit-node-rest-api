import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;

export const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .required()
    .pattern(
      emailRegexp,
      "match the input format. Example of input: ivanov@gmail.com"
    ),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});
