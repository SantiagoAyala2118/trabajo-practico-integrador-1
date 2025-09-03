export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.userLogged;

  if (req.userLogged !== "admin") {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};
