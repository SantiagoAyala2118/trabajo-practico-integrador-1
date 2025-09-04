import { ArticleModel } from "../models/article.model.js";

export const authAuthorMiddleware = async (req, res, next) => {
  const userLogged = req.userLogged;

  if (ArticleModel.user_id !== userLogged.id) {
    return res.status(403).json({
      message: "Ypu cannot acceed this source",
    });
  }

  next();
};
