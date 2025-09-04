import { sequelize } from "./database.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Se autenticó exitosamente la base de datos");
    await sequelize.sync({ force: true });

    console.log(
      "Se sincronizó exitosamente con la base de datos. Tablas creadas"
    );
  } catch (err) {
    console.error("No se pudo conectar con la base de datos", err);
  }
};
