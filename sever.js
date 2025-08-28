const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

// load cấu hình passport
require('./config/passport');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session để passport lưu user
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// phục vụ frontend
app.use(express.static(path.join(__dirname, 'public')));

// route login thường (username + password)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/?error=1'
}));

// route google oauth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

// route facebook oauth
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

// route apple oauth (demo)
app.get('/auth/apple',
  passport.authenticate('apple')
);
app.get('/auth/apple/callback',
  passport.authenticate('apple', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);

// trang dashboard
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`<h1>Xin chào ${req.user.username || req.user.displayName}</h1><a href="/logout">Đăng xuất</a>`);
});

// logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
