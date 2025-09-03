import { body } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";

//VALIDACIONES PARA CREAR UN ARTÍCULO
export const crateArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must contain at least 3 characters and a maximum of 200"
    ),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ min: 50 })
    .withMessage("Content must contain at least 50 characters"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Excerpt cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isIn(["published", "archived"])
    .withMessage("Status must be either 'published' or 'archived0'"),
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("User_id must be a number greater than zero")
    .custom(async (user_id, { req }) => {
      try {
        const userExisting = await UserModel.findOne({
          where: { id: req.body.user_id },
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that ID");
        }
      } catch (err) {
        console.error("Error checking the existency of the user by id");
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];
// Article:
// ● title: 3-200 caracteres, obligatorio.
// ● content: mínimo 50 caracteres, obligatorio.
// ● excerpt: máximo 500 caracteres.
// ● status: solo valores permitidos ('published', 'archived').
// ● user_id: debe existir y coincidir con usuario autenticado (excepto admin).
