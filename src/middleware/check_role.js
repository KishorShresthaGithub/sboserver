import { Role } from "./../models/user";

export default function checkRole(roles) {
  return async (req, res, next) => {
    const user = req.user;

    console.log(Role.getString(user.role));
    
    const hasRole = roles.includes(Role.getString(user.role));

    if (!hasRole) return res.sendStatus(403);

    next();
  };
}
