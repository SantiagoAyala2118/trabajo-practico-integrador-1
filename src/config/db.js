import { sequelize } from "./database.js";

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Se autenticó exitosamente la base de datos");
    await sequelize.sync();
    console.log("Se sincronizó exitosamente con la base de datos");
  } catch (err) {
    console.error("No se pudo conectar con la base de datos", err);
  }
};
