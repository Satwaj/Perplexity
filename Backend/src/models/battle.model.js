import mongoose from "mongoose";

const battleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    problem: {
      type: String,
      required: true
    },

    solution_1: {
      type: String,
      required: true
    },

    solution_2: {
      type: String,
      required: true
    },

    solution_1_score: {
      type: Number,
      required: true
    },

    solution_2_score: {
      type: Number,
      required: true
    },

    solution_1_reasoning: {
      type: String
    },

    solution_2_reasoning: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const battleModel = mongoose.model("Battle", battleSchema);

export default battleModel;