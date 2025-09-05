import { matchedData } from "express-validator";
import { ArticleTagModel } from "../models/article_tag.model.js";

//FUNCIÓN PARA AGREGAR UN ARTICULO A UNA TAREA
export const createArticleTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const articleTag = await ArticleTagModel.create(validatedData);

    return res.status(201).json({
      message: "Article-tag created",
      articleTag,
    });
  } catch (err) {
    console.error("Server error while creating an article-tag", err);
    return res.status(500).json({
      message: "Server error while creating an article-tag",
    });
  }
};

//FUNCIÓN PARA ELIMINAR UN ARTICLE-TAG
export const deleteArticleTag = async (req, res) => {
  try {
    await ArticleTagModel.destroy({ where: { id: req.params.articleTagId } });

    return res.status(200).json({
      message: "Article-tag deleted",
    });
  } catch (err) {
    console.error("Server error while deleting an article-tag", err);
    return Promise.reject("Server error while deleting an article-tag");
  }
};
