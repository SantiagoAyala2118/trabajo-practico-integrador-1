import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";

//CREAR UNA TAG (SOLO ADMIN)
export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const tag = await TagModel.create(validatedData);

    return res.status(201).json({
      message: "Tag created",
      tag: tag,
    });
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
    const tags = await TagModel.findAll();

    if (tags.length === 0) {
      return res.status(404).json({
        message: "There are not tags in the database",
      });
    }

    return res.status(200).json({
      message: "Tags founded",
      tags: tags,
    });
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
    const tag = await TagModel.findByPk(req.params.id);

    return res.status(200).json({
      message: "Tag founded",
      tag: tag,
    });
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
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }

    await TagModel.update(validatedData, { where: { id: req.params.id } });

    return res.status(200).json({
      message: "Tag updated",
    });
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
    await TagModel.destroy({ where: { id: req.params.id } });

    return res.status(200).json({
      mesage: "Tag deleted",
    });
  } catch (err) {
    console.error("Server error while deleting a tag", err);
    return res.status(500).json({
      message: "Server error while deleting a tag",
    });
  }
};
