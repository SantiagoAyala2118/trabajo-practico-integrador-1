import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      first_name,
      lastname,
      biography,
      avatar_url,
      birth_date,
    } = req.body;

    //CREO UN USUARIO
    const user = await UserModel.create({
      username: username,
      email: email,
      password: password,
      role: role,
    });

    //AUTOMATICAMENTE CREO UN PERFIL
    await ProfileModel.create({
      first_name: first_name,
      lastname: lastname,
      biography: biography,
      avatar_url: avatar_url,
      birth_date: birth_date,
      user_id: user.id, //LE ASIGNO EL ID DEL USUARIO QUE SE CREÓ MÁS ARRIBA
    });
  } catch (err) {
    console.error("Server error while registering", err);
    return res.status(500).json({
      message: "Server error while registering",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        username: username,
        password: password,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Wrong credentials",
      });
    }

    return res.status(200).json({
      message: "Logged correctly",
    });
  } catch (err) {
    console.log("Server error while Loging", err);
    return res.status(500).json({
      message: "Server error while Loging",
    });
  }
};
