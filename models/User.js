const { Schema, model } = require("mongoose");
const profileModel = require("./Profile");
const { hash, compare } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  token: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "email is alreay used by another user"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.generateToken = async function () {
  this.token = sign({ id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: 1000*60*10,
  });
};

userSchema.statics.findByEmailAndPassword = async function (email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        reject("Incorrect credential");
      }
      if (!(await compare(password, user.password))) {
        reject("Incorrect credential");
      }
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashPassword = await hash(this.password, 10);
      console.log(hashPassword);
      this.password = hashPassword;
      next();
    }
  } catch (err) {
    next(err);
  }
});

userSchema.pre(
  "findOneAndDelete",
  async function (next) {
    const profileRemoved = await profileModel.deleteOne({ user: this.getQuery()._id });
    // console.log("profile Removed", profileRemoved);
    //@ post and comment to be removed
    next();
  }
);

const userModel = model("user", userSchema);

module.exports = userModel;
