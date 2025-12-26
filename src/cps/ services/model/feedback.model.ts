import { Feedback } from "../config/types/feedback";
import modules from "./imports/index";
import { type PaginateModel } from "mongoose";

const Schema = modules.mongoose.Schema;

const feedbackSchema = new Schema(
  {
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    name: { type: String },
    message: { type: String },
    source: { type: String, enum: ["app", "website"] },
    surveyResponses: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: { type: String, required: true },
      },
    ],
    enabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// add mongoose-troop middleware to support pagination
feedbackSchema.plugin(modules.paginator);

const FeedbackModel = modules.mongoose.model<Feedback, PaginateModel<Feedback>>("Feedback", feedbackSchema);

export default FeedbackModel;
