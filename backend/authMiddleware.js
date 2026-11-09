
const crypto = require('crypto');

const activeTokens = new Set();

// Admin credentials must be configured in Azure environment variables
const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;

/**
 * Validates admin credentials and generates a secure token
 */
function authenticateAdmin(username, password) {
  // Ensure environment variables are configured
  if (!ADMIN_USER || !ADMIN_PASS) {
    console.error('Admin credentials are not configured.');
    return null;
  }

  // Validate credentials
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Generate a cryptographically secure random token
    const token = crypto.randomBytes(32).toString('hex');

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

  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.headers['x-admin-token'];

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized access. Admin authentication required.'
    });
  }

  next();
}

/**
 * Revokes an admin session token
 */
function logoutToken(token) {
  activeTokens.delete(token);
}

module.exports = {
  authenticateAdmin,
  requireAdminAuth,
  logoutToken
};
