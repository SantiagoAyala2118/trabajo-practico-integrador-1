import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  createTagValidations,
  deleteTagValidations,
  getTagValidations,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
} from "../controllers/tag.controller.js";

const tagRouter = Router();

tagRouter.post(
  "/api/tags",
  authAdminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);

tagRouter.get("/api/tags", authMiddleware, getAllTags);

tagRouter.get(
  "/api/tags/:id",
  authAdminMiddleware,
  getTagValidations,
  applyValidations,
  getTag
);

tagRouter.put(
  "/api/tags/:id",
  authAdminMiddleware,
  updateTagValidations,
  applyValidations,
  updateTag
);

tagRouter.delete(
  "/api/tags/:id",
  authAdminMiddleware,
  deleteTagValidations,
  applyValidations,
  deleteTag
);

export default tagRouter;
// Tags:
// ● POST /api/tags → Crear etiqueta (solo admin).
// ● GET /api/tags → Listar todas las etiquetas. (usuario autenticado)
// ● GET /api/tags/:id → Obtener etiqueta específica con artículos asociados(solo admin).
// ● PUT /api/tags/:id → Actualizar etiqueta (solo admin).
// ● DELETE /api/tags/:id → Eliminar etiqueta (solo admin).
