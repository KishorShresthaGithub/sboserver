import jwt from "jsonwebtoken";

/**
 *
 * Method to verify the access token and add user to request
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = payload;
    next();
  });
}
