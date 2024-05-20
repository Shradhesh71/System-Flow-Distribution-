import { Schema, model } from "mongoose";

const astrologerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
  },
  isTopAstrologer: {
    type: Boolean,
    default: false,
  },
  connections: {
    type: Number,
    default: 0,
  },
});

const Astrologer = model("Astrologer", astrologerSchema);

export default Astrologer;

