import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";

export const ArticleTagModel = sequelize.define("Article_Tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

//RELACIONES
ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  as: "tags",
  foreignKey: "tag_id",
});

TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  as: "articles",
  foreignKey: "article_id",
});

ArticleTagModel.belongsTo(ArticleModel, {
  targetKey: "id",
  foreignKey: "article_id",
});

ArticleTagModel.belongsTo(TagModel, {
  targetKey: "id",
  foreignKey: "tag_id",
});
