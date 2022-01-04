import User from "../models/User";

let auth = async (ctx, next) => {
  console.log(ctx.cookie);
  let token = ctx.cookie;
  console.log(token);
  console.log("토큰" + token);
  const user = await User.findByToken(token.x_auth);

  if (!user) {
    ctx.body = { isAuth: false, error: true };
  } else {
    ctx.token = token;
    ctx.user = user;
    ctx.body = { isAuth: true, error: true };
    next();
  }
};
export default auth;
