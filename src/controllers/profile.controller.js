import { ProfileModel } from "../models/profile.model.js";

//TRAER UN PERFIL (USUARIO AUTENTICADO)
export const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ where: {} });
  } catch (err) {
    console.error("Server error while getting profile", err);
    return res.status(500).json("Server error while getting profile");
  }
};

//ACTUALIZAR UN USUARIO
export const updateProfile = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while updating a profile", err);
    return res.status(500).json({
      message: "Server error while updating a profile",
    });
  }
};
