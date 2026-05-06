import mongoose, { Document } from "mongoose";

interface IPartnerDocs extends Document {
  owner: mongoose.Types.ObjectId;
  aadharUrl: string;
  rcUrl: string;
  licenseUrl: string;
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    aadharUrl: {
      type: String,
      required: true,
    },
    rcUrl: {
      type: String,
      required: true,
    },
    licenseUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true }
);

const partnerDocsModel =
  mongoose.models.PartnerDocs ||
  mongoose.model<IPartnerDocs>("PartnerDocs", partnerDocsSchema);

export default partnerDocsModel;