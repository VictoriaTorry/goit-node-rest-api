import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from 'fs/promises';
import Jimp from 'jimp';
import path from 'path';
import gravatar from 'gravatar';

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve('public', 'avatars');

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findOneAndUpdate(_id, { subscription });

    if (!result) {
      throw HttpError(404, `contact ${id} Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if(!req.file) {
      throw HttpError(404, "You did not add the photo for avatar");
    }
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);

  Jimp.read(oldPath, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(newPath);
  });

  await fs.rename(oldPath, newPath);
    const avatarURL = path.join('avatars', filename);

  await User.findOneAndUpdate(_id, {avatarURL});
  return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};