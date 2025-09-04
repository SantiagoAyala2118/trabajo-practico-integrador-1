import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

//VALIDACIONES PARA CREAR UN USUARIO Y PERFIL
export const createUserValidations = [
  //VALIDACIONES PARA LOS CAMPOS DEL USUARIO
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
  //VALIDACIONES PARA LOS CAMPOS DEL PERFIL
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First_name cannot be empty")
    .isString()
    .withMessage("First_name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "First_name must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("First_name must contain only letters, not numbers or signs"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isString()
    .withMessage("Lastname must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Lastname must contain at least 5 characters and a maximum of 50"
    )
    .matches(/^[A-Za-z]+$/)
    .withMessage("Lastname must contain only letters, not numbers or signs"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biography cannot be empty")
    .isString()
    .withMessage("Biography must be a string")
    .isLength({ max: 500 })
    .withMessage("Biography cannot exceed 500 characters"),
  body("avatar_url")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The avatar_url cannot be empty")
    .isURL()
    .withMessage("The avatar_url format is invalid"),
  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Birth_date cannot be empty"),
];
// Profile:
// ● first_name y last_name: 2-50 caracteres, solo letras.
// ● biography: máximo 500 caracteres.
// ● avatar_url: formato URL válido (opcional).

//VALIDACIONES PARA TRAER UN SOLO USUARIO
export const getUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await UserModel.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];

//VALIDACIONES PARA ACTUALIZAR UN USUARIO
export const updateUerValidations = [
  body("username")
    .optional()
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
    .optional()
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
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
  body("role")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await UserModel.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];

export const deleteUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const userExisting = await UserModel.findOne({
          where: { id: req.params.id },
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];
