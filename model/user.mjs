import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import _ from "lodash";
import bcrypt from "bcryptjs";
const { compare, hash } = bcrypt;

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "{VALUE} is not a valid email.",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: [
      {
        street: {
          type: String,
          required: true,
        },
        locality: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        coordinatesType: {
          type: {
            type: String,
            default: "Point",
          },
          coordinates: {
            type: [Number],
            index: "2dsphere",
          },
        },
      },
    ],
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// This block of code is to restrict response (hashed password and token) that the client will receive after successfull signup.
UserSchema.methods.toJSON = function () {
  const user = this;
  const createdObject = user.toObject();

  return _.pick(createdObject, ["_id", "email", "address", "mobile"]);
};

// This block is to generate JsonWebToken for secure access to API’s.
UserSchema.methods.generateAuthToken = function () {
  const user = this;

  const access = "auth";
  const token = jwt
    .sign(
      {
        _id: user._id,
        access,
      },
      process.env.JWT_SECRET
    )
    .toString();

  user.tokens = user.tokens.concat([
    {
      access,
      token,
    },
  ]);

  return user.save().then(() => {
    return token;
  });
};

// UserSchema.statics.findByCredentials = function (email, password) {
//   const User = this;

//   return User.findOne({ email }).then((user) => {
//     if (!user) return Promise.reject();

//     return new Promise((resolve, reject) => {
//       compare(password, user.password, (err, res) => {
//         if (res) resolve(user);
//         else reject();
//       });
//     });
//   });
// };

// UserSchema.methods.removeToken = function (token) {
//   const user = this;

//   return user.update({
//     $pull: {
//       tokens: { token },
//     },
//   });
// };

// This block of code will accept the token which get passed from middleware function, then decode the token, find the user and return it.
UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth",
  });
};

// This block is to hash user password while signing up and on update
UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    hash(user.password, 8, function (err, hashedPassword) {
      user.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
