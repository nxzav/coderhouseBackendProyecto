// Middleware
export function sessionIsActive(req, res, next) {
  if (req.session?.user) return res.redirect('/profile');
  return next();
}

export function auth(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/login');
}

export function isAdminOrPremium(req, res, next) {
  if (req.session?.user.role === 'admin' || req.session?.user.role === 'premium')
    return next();
  return res.status(403).json({ success: false, msg: 'You are not authorized to access this service' });
}

export function isUser(req, res, next) {
  if (req.session?.user.role === 'user' || req.session?.user.role === 'premium')
    return next();
  return res.status(403).json({ success: false, msg: 'Admins can not access the chat' });
}