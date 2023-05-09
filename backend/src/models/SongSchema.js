import mongoose, { model, Schema } from "mongoose";

const SongSchema = new Schema(
  {
    user: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rhythm",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Song", SongSchema);
