passport.use(new GoogleStrategy({
  clientID: "GOOGLE_CLIENT_ID",
  clientSecret: "GOOGLE_CLIENT_SECRET",
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // 🔹 Lấy thông tin user từ Google
  const email = profile.emails[0].value;
  const name = profile.displayName;

  // 🔹 Kiểm tra DB (giả sử dùng MongoDB)
  let user = await User.findOne({ email });
  if (!user) {
    // Nếu chưa có → đăng ký mới
    user = await User.create({
      email,
      name,
      provider: "google",
      googleId: profile.id
    });
  }

  return done(null, user);
}));
