import mongoose from "mongoose";
import { UserDocument } from "./User";
import Joi from "@hapi/joi";

type findPostFuzzily = (keywords: string) => Promise<UserDocument>;

export interface PostDocument extends mongoose.Document {
  title: string;
  authors: [{ email: string; name: string }];
  content: string;
}

export interface PostModel extends mongoose.Model<PostDocument> {
  findPostFuzzily: findPostFuzzily;
}

const postSchema = new mongoose.Schema(
  {
    title: String,
    authors: [mongoose.Types.ObjectId || { name: String, email: String }],
    content: String,
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostDocument, PostModel>("Post", postSchema);

export const postJoiSchema = Joi.object({
  title: Joi.string().max(40).required(),
  authors: Joi.array().items(
    Joi.object()
      .keys({
        email: Joi.string().email({ tlds: false }).required(),
        name: Joi.string().max(30),
      })
      .required()
  ),
  content: Joi.string().required(),
});
