import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;
type findByEmailFunction = (email: string) => Promise<UserDocument>;

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  name: string;
  gender: number;
  /*
   * For gender,
   * 0 - Prefered Not to Say
   * 1 - Female
   * 2 - Male
   * 3 - Non-binary/Thrid Gender
   * 4 - Other Genders
   */
  comparePassword: comparePasswordFunction;
  posts: [];
}

export interface UserModel extends mongoose.Model<UserDocument> {
  findByEmail: findByEmailFunction;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    name: String,
    gender: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    await next();
  } catch (e) {
    return next(e);
  }
});

// Compare encrypted password
const comparePassword: comparePasswordFunction = async function (
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

// Find a user by email middleware
const findByEmail: findByEmailFunction = async function (email) {
  const user = await (this as UserModel)
    .findOne({ email: email })
    .select("-password");
  if (!user) throw new Error("user not found");
  return user;
};

userSchema.statics.findByEmail = findByEmail;

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export const userJoiSchema = Joi.object<UserDocument>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .required(),
  name: Joi.string().max(30).required(),
  gender: Joi.number().valid(0, 1, 2, 3, 4).optional(),
});
