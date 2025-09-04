import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { createArticle, getAllArticles, getArticle, getArticleUser } from "../controllers/article.controller.js";

const articleRouter = Router();

articleRouter.post('/api/articles',authMiddleware,createArticle);//FALTAN VALIDACIONES
articleRouter.get('/api/articles',authMiddleware,getAllArticles);//FALTAN VALIDACIONES
articleRouter.get('/api/articles/:id',authMiddleware,getArticle);//FALTAN VALIDACIONES
articleRouter.get('/api/articles/user',authMiddleware,getArticleUser)//FALTAN VALIDACIONES
articleRouter.get('/api/articles/user/:id',authMiddleware,)//FALTAN VALIDACIONES Y CONTROLADOR

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