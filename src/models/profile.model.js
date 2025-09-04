import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define("Profile", {
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

//RELACIONES
ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  targetKey: "id",
});

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "profile",
});
