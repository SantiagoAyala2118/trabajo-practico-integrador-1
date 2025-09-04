// Users (acceso admin):
// ● GET /api/users → Listar todos los usuarios con sus perfiles. (solo admin)
// ● GET /api/users/:id → Obtener usuario específico con perfil y artículos. (solo admin)
// ● PUT /api/users/:id → Actualizar usuario (solo admin).
// ● DELETE /api/users/:id → Eliminación lógica de usuario (solo admin).

import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ProfileModel,
        as: "profile",
      },
    });

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error("Server error while getting all users", err);
    return res.status(500).json({
      message: "Server error while getting all users",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne(
      { where: { id: req.params.id } },
      {
        attributes: {
          exclude: ["password"],
        },
        include: [{
          model: ProfileModel,
          as: "profile",
        },
        {
          model: ArticleModel,
          as: 'articles'
        }],
      }
    );

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error("Server error while getting user", err);
    return res.status(500).json({
      message: "Server error while getting user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }

    await UserModel.update(validatedData, {
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    console.error("Server error while updating user", err);
    return res.status(500).json({
      message: "Server error while updating user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.destroy({ where: { id: req.params.id } });
  } catch (err) {
    console.error("Server error while deleting user", err);
    return res.status(500).json({
      message: "Server error while deleting user",
    });
  }
};
