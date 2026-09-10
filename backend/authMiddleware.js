const activeTokens = new Set();

const DEFAULT_ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'nisarga2026';

/**
 * Validates admin credentials and generates a token
 */
function authenticateAdmin(username, password) {
  if (username === DEFAULT_ADMIN_USER && password === DEFAULT_ADMIN_PASS) {
    const token = 'ANR_ADMIN_SES_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    activeTokens.add(token);
    return token;
  }
  return null;
}

/**
 * Middleware protecting admin routes
 */
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers['x-admin-token'];

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized access. Admin authentication required.'
    });
  }

  next();
}

/**
 * Revokes a session token
 */
function logoutToken(token) {
  activeTokens.delete(token);
}

module.exports = {
  authenticateAdmin,
  requireAdminAuth,
  logoutToken
};
