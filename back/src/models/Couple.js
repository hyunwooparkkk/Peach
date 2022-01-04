import mongoose from "mongoose";
const coupleSchema = mongoose.Schema({
  username1: {
    type: String,
  },
  birth1: {
    type: Date,
    default: Date.now,
  },
  username2: {
    type: String,
  },
  birth2: {
    type: Date,
    default: Date.now,
  },
  anniversary: {
    type: Date,
  },
  anniversarytext: {
    type: String,
  },
  authCode1: {
    type: Number,
  },
  authCode2: {
    type: Number,
  },
  image: [],
});

const Couple = mongoose.model("Couple", coupleSchema);
export default Couple;
