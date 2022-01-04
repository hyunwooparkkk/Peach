import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    default: Date.now,
  },
  firstdate: {
    type: Date,
    default: Date.now,
  },
  sex: {
    type: String,
  },
  authCode: {
    type: Number,
  },
  profileimage:[],
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainpassword) {
  console.log(this.password);
  const isMatch = await bcrypt.compare(plainpassword, this.password);
  return isMatch;
};

userSchema.methods.generateToken = async function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save();

  return user;
};

userSchema.statics.findByToken = async function (token) {
  let user = this;

  const decoded = await jwt.verify(token, "secretToken");
  console.log("thisis" + decoded);
  const gogo = await user.findOne({ _id: decoded, token: token });
  return gogo;
};

const User = mongoose.model("User", userSchema);
export default User;
