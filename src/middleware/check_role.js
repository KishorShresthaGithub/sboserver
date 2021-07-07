import User, { Role } from "./../models/user";

/**
 * Function to check role of user
 *
 * @param {Array} roles ["admin","user"]
 * @returns
 */
export default function checkRole(roles) {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      const hasRole = roles.includes(Role.getString(user.role));

      if (!hasRole) return res.sendStatus(403);

      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
}
