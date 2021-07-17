import jwt from "jsonwebtoken";
import BaseController from "../controller/basecontroller";

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
  const authHeader = req.headers["Authorization"];

  if (!authHeader)
    return BaseController.sendError(res, {}, "No token provided", 401);

  const token = authHeader.split(" ")[1];
  
  if (token === null)
    return BaseController.sendError(res, {}, "Not logged in", 401);

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return BaseController.sendError(res, {}, "Invalid token", 403);
    }
    req.user = payload;
    next();
  });
}
