const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const bcrypt = require('bcryptjs');

// Giả sử có 1 user cứng trong DB
const fakeUser = {
  id: 1,
  username: 'student',
  email: 'student@example.com',
  password: bcrypt.hashSync('password', 10)
};

// Local login
passport.use(new LocalStrategy((username, password, done) => {
  if (username !== fakeUser.username && username !== fakeUser.email) {
    return done(null, false, { message: 'Sai username/email' });
  }
  if (!bcrypt.compareSync(password, fakeUser.password)) {
    return done(null, false, { message: 'Sai mật khẩu' });
  }
  return done(null, fakeUser);
}));

// Google login
passport.use(new GoogleStrategy({
  clientID: "GOOGLE_CLIENT_ID",
  clientSecret: "GOOGLE_CLIENT_SECRET",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Facebook login
passport.use(new FacebookStrategy({
  clientID: "FACEBOOK_APP_ID",
  clientSecret: "FACEBOOK_APP_SECRET",
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Apple login (demo, cần đăng ký Apple Developer)
passport.use(new AppleStrategy({
  clientID: "APPLE_CLIENT_ID",
  teamID: "APPLE_TEAM_ID",
  keyID: "APPLE_KEY_ID",
  privateKeyLocation: "AuthKey_APPLE_KEY_ID.p8",
  callbackURL: "/auth/apple/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
