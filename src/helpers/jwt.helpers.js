import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//FUNCIÓN PARA GENERAR UN TOKEN
export const generateToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.profile.first_name,
      lastname: user.profile.lastname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

//FUNCION PARA VERIFICAR UN TOKEN
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    throw new Error("Error verifying the token", err);
  }
};
