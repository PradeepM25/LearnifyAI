import mongoose from "mongoose";

const quickNoteSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true, trim: true },
    htmlContent: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const QuickNote = mongoose.models.QuickNote || mongoose.model("QuickNote", quickNoteSchema);
export default QuickNote;
