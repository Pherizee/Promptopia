import { Document, Schema, model, models } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email: string;
  image: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;