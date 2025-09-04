import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createArticleValidations,
  getArticleValidations,
  updateArticleValidations,
} from "../middlewares/validations/article.validations.js";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  getArticleUser,
  getArticleUserById,
  updateArticle,
} from "../controllers/article.controller.js";
import { ownerAdminMiddleware } from "../middlewares/ownerAdminMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";

const articleRouter = Router();

articleRouter.post(
  "/api/articles",
  authMiddleware,
  createArticleValidations,
  applyValidations,
  createArticle
);
articleRouter.get("/api/articles", authMiddleware, getAllArticles);
articleRouter.get(
  "/api/articles/:id",
  authMiddleware,
  getArticleValidations,
  applyValidations,
  getArticle
); //FALTAN VALIDACIONES
articleRouter.get("/api/articles/user", authMiddleware, getArticleUser);
articleRouter.get(
  "/api/articles/user/:id",
  authMiddleware,
  getArticleValidations,
  applyValidations,
  getArticleUserById
);
articleRouter.put(
  "/api/articles/:id",
  ownerAdminMiddleware,
  updateArticleValidations,
  applyValidations,
  updateArticle
);
articleRouter.delete(
  "/api/articles/:id",
  ownerAdminMiddleware,
  getArticleValidations,
  applyValidations,
  deleteArticle
);

export default articleRouter;
// Articles:
// ● POST /api/articles → Crear artículo. (usuario autenticado)
// ● GET /api/articles → Listar artículos publicados. (usuario autenticado)
// ● GET /api/articles/:id → Obtener artículo por su id. (usuario autenticado)
// ● GET /api/articles/user → Listar artículos publicados del usuario logueado. (usuario
// autenticado)
// ● GET /api/articles/user/:id → Obtener artículo del usuario logueado por su id. (usuario
// autenticado)
// ● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
// ● DELETE /api/articles/:id → Eliminación lógica (solo autor o admin).
