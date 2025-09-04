import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { updateProfileValidations } from "../middlewares/validations/profile.validations.js";
import { applyValidations } from "../middlewares/validations/profile.validations.js";

const authRouter = Router();

authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);
authRouter.get("/api/auth/profile", authMiddleware, getProfile);
authRouter.put(
  "/api/auth/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);
authRouter.post("/api/auth/logout", authMiddleware, logout);

export default authRouter;
// ● POST /api/auth/register: Registro de usuario con creación automática de perfil.
// (público)
// ● POST /api/auth/login: Login con JWT enviado como cookie segura. (público)
// ● GET /api/auth/profile: Obtener perfil del usuario autenticado. (usuario autenticado)
// ● PUT /api/auth/profile: Actualizar perfil del usuario autenticado. (usuario autenticado)
// ● POST /api/auth/logout: Logout limpiando cookie de autenticación. (usuario
// autenticado)
