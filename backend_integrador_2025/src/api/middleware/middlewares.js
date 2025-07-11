// Middleware para verificar si el admin está autenticado
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/admin/login');
  }
}

// Middleware opcional de logging
export function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}


