import { ArticleModel } from "../models/article.model";

//CREAR UNA TAG (SOLO ADMIN)
export const createTag = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while creating a tag", err);
    return res.status(500).json({
      message: "Server error while creating a tag",
    });
  }
};

//TRAER TODOS LOS TAGS (USUARIO AUTENTICADO)
export const getAllTags = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while getting all tags", err);
    return res.status(500).json({
      message: "Server error while getting all tags",
    });
  }
};

//TRAER UNA TAG (SOLO ADMIN)
export const getTag = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while getting a tag", err);
    return res.status(500).json({
      message: "Server error while getting a tag",
    });
  }
};

//ACUALIZAR UNA TAG (SOLO ADMIN)
export const updateTag = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while updating a tag", err);
    return res.status(500).json({
      message: "Server error while updating a tag",
    });
  }
};

//ELIMINAR UNA TAG (SOLO ADMIN)
export const deleteTag = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server error while deleting a tag", err);
    return res.status(500).json({
      message: "Server error while deleting a tag",
    });
  }
};
