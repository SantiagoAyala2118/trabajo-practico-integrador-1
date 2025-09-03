import { body } from "express-validator";
import { UserModel } from "../models/user.model.js";

// User/Auth:
// ● username: 3-20 caracteres, alfanumérico, único.
// ● email: formato válido, único.
// ● password: mínimo 8 caracteres, al menos una mayúscula, minúscula y número.
// ● role: solo valores permitidos ('user', 'admin').

//VALIDACIONES PARA CREAR UN USUARIO
export const createUserValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Username must contain at least 3 characters and a maximun of 20"
    )
    .matches(/^[a-zA-Z0-9]/)
    .withMessage("Username must be alphanumeric")
    .custom(async (username, { req }) => {
      try {
        const usernameExisting = await UserModel.findOne({
          where: { username: req.body.username },
        });

        if (usernameExisting) {
          return Promise.reject("Username already exists, try another one");
        }
      } catch (err) {
        console.error(
          "Error while checking the viability of the username",
          err
        );
        return Promise.reject(
          "Error while checking the viability of the username"
        );
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("The email format is not valid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          where: { email: req.body.email },
        });

        if (emailExisting) {
          return Promise.reject("That email already exists, try another one");
        }
      } catch (err) {
        console.error("Error checking the viability of the email", err);
        return Promise.reject("Error checking the viability of the email");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
];
