import mongoose, { Document, Model } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    minlength: [6, "Minimum username length is 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
