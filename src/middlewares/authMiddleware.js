//MIDDLEWARE PARA VERIFICAR QUE EL USUARIO QUE QUIERE HACER CUALQUIER COSA, ESTÁ AUTENTICADO
export const authMiddleware = async (req, res, next) => {
  try {
    //ONTENGO UN TOKEN DE LA REQUEST
    const token = req.cookies["token"];

    //SI NO ESTÁ AUTENTICADO, TIRO UN ERROR
    if (!token) {
      return res.status(401).json({
        message: "User not autenticated",
      });
    }

    //DECODIFICO EL TOKEN
    const decoded = verifyToken(token);

    //ALMACENO LA INFO DEL TOKEN DECODIFICADO
    req.userLogged = decoded;

    next();
  } catch (err) {
    console.error("Server error while checking the authentication", err);
    return res.status(500).json({
      message: "Server error while checking the authentication",
    });
  }
};
