import { Router } from "express";
import { authAuthorMiddleware } from "../middlewares/ownerMiddleware.js";
import {
  createArticleTagValidations,
  delteArticleTagValidations,
} from "../middlewares/validations/article_tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article_tag.controller.js";

const articleTagsRouter = Router();

articleTagsRouter.post(
  "/api/articles-tags",
  authAuthorMiddleware,
  createArticleTagValidations,
  applyValidations,
  createArticleTag
);

articleTagsRouter.delete(
  "/api/articles-tags/:articleTagId",
  authAuthorMiddleware,
  delteArticleTagValidations,
  applyValidations,
  deleteArticleTag
);

export default articleTagsRouter;
// Articles Tags:
// ● POST /api/articles-tags → Agregar etiqueta a artículo. (solo autor)
// ● DELETE /api/articles-tags/:articleTagId → Remover etiqueta de artículo. (solo autor)
