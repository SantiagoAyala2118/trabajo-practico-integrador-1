import { ArticleModel } from '../models/article.model.js'
import { matchedData } from 'express-validator';
import { UserModel } from '../models/user.model.js';

//FUNCION PARA CREAR UN ARTÍCULO
export const createArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req);

        const article = await ArticleModel.create(validatedData);

        return res.status(201).json({
            message: 'Article created',
            article: article
        })
    } catch (err) {
        console.error('Server error while creating an article', err)
        return res.status(500).json({
            message: 'Server error while creating an article'
        })
    }
}

//FUNCIÓN PARA LISTAR TODOS LOS ARTÍCULOS
export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.findAll({
            attributes: {
                exclude: ['content']
            }
        })

        if (articles.length === 0) {
            return res.status(404).json({
                message: 'There are no articles in the DB'
            })
        }

        return res.status(200).json({
            message: 'Articles founded',
            articles: articles
        })
    } catch (err) {
        console.error('Server error while getting all the articles', err)
        return res.status(500).json({
            message: 'Server error while getting all the articles'
        })
    }
}

//FUNCIÓN PARA LISTAR UN ARTÍCULO
export const getArticle = async (req, res) => {
    try {
        const article = await ArticleModel.findOne({ where: { id: req.params.id } }, {
            attributes: {
                exclude: ['content']
            }
        })

        return res.status(200).json({
            message: 'Article founded',
            article: article
        })
    } catch (err) {
        console.error('Server error while getting one article', err)
        return res.status(500).json({
            message: 'Server error while getting one article'
        })
    }
}

//FUNCIÓN PARA TRAER LOS ARTÍCULOS ASOCIADOS A UN USUARIO LOGEADO (AUTENTICADO)
export const getArticleUser = async (req, res) => {
    const userLogged = req.userLogged;
    try {
        const userArticles = await ArticleModel.findOne({ where: { user_id: userLogged.id } }, {
            attributes: {
                exclude: ['content']
            },
            include: {
                model: UserModel,
                as: 'user',
                attributes: {
                    exclude: ['password']
                }
            }
        })

        if (!userArticles) {
            return res.status(404).json({
                message: 'There are no articles associated to that user_id'
            })
        }

        return res.status(200).json({
            message: 'Aticles founded',
            articles: articles
        })
    } catch (err) {
        console.error('Server error while getting the articles associated with an user', err)
        return res.status(500).json({
            message: 'Server error while getting the articles associated with an user'
        })
    }
}

//FUNCIÓN PARA TRAER LOS ARTICULOS ASOCIADOS A UN USUARIO LOGEADO (AUTENTICADO) POR SU ID
export const getArticleUserById = async (req, res) => {
    try {
        //FALTA COMPLETAR
    } catch (err) {
        console.error('Server error while getting the articles of the user by id', err)
        return res.status(500).json({
            message: 'Server error while getting the articles of the user by id'
        })
    }
}
