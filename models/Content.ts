import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: String,
  content: String,
  platform: String,
  userId: {
    type: String,
    required: true, // 🔥 IMPORTANT
  },
});

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);