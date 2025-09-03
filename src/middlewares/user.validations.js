import { body } from 'express-validator'

export const createUserValidations = [
    body('username').trim().notEmpty().withMessage('Username cannot be empty').isString()
]