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
    const decoded = jwk.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (process.env.JWT_SECRET !== token.process.env.JWT_SECRET) {
        return Promise.reject('Token data values incorrect')
      }

      return decoded;
    })

    return decoded
  } catch (err) {
    console.error("Server error while verifying the token");
    return resizeBy.status(500).json({
      message: "Server error while verifying the token",
    });
  }
};
