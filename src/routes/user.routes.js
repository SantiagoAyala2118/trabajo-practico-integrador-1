import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { deleteUserValidations, getUserValidations, updateUerValidations } from "../middlewares/validations/user.validations.js";
import { applyValidations } from '../middlewares/validator.js'

const userRouter = Router();

userRouter.get('/api/users', authAdminMiddleware, getAllUsers);
userRouter.get('/api/users/:id', authAdminMiddleware, getUserValidations, applyValidations, getUser);
userRouter.put('/api/users/:id', authAdminMiddleware, updateUerValidations, applyValidations, updateUser);
userRouter.delete('/api/users/:id', authAdminMiddleware, deleteUserValidations, applyValidations, deleteUser);


// Users (acceso admin):
// ● GET /api/users → Listar todos los usuarios con sus perfiles. (solo admin)
// ● GET /api/users/:id → Obtener usuario específico con perfil y artículos. (solo admin)
// ● PUT /api/users/:id → Actualizar usuario (solo admin).
// ● DELETE /api/users/:id → Eliminación lógica de usuario (solo admin).
