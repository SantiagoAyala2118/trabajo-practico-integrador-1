import { body } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must contain at leas 2 characters and a maximum of 30")
    .matches(/^(?=.*[A-Za-z])(?!.*\s)[A-Za-z]+$/)
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await TagModel.findOne({
          where: { name: req.body.name },
        });

        if (nameExisting) {
          return Promise.reject("There is already a tag with that name");
        }
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
];

// Tag:
// ● name: 2-30 caracteres, único, obligatorio, sin espacios.
