import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/** Only super_admin can access */
export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized. Super Admin access required.' });
};

/** super_admin or admin */
export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'super_admin' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized as an admin' });
};

/** super_admin, admin, or manager */
export const managerOrAdmin = (req, res, next) => {
  if (req.user && ['super_admin', 'admin', 'manager'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized as a manager or admin' });
};
