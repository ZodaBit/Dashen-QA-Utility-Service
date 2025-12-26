import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IReport, Report } from "../config/types/report";

const ReportSchema = new Schema<Report>(
  {
    reportType: { type: String, required: true },
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    fileUrl: { type: String, default: null },
    fileSize: { type: Number, default: null },
    fileName: { type: String, default: null },
    completedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

ReportSchema.plugin(mongoosePaginate);

const ReportModel = model<
  Report,
  mongoose.PaginateModel<Report> & {
    markCompleted(
      id: string,
      url: string,
      size?: number
    ): Promise<Report | null>;
  }
>("Report", ReportSchema);

export default ReportModel;
