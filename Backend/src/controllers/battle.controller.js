import runBattle from "../services/battle.graph.js";
import battleModel from "../models/battle.model.js";
import { getIO } from "../sockets/server.socket.js";

export const battleController = async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem || problem.trim() === "") {
      return res.status(400).json({ error: "Problem is required" });
    }

    // Get socket.io instance and emit progress
    const io = getIO();
    
    const emitProgress = (progressData) => {
      // Broadcast to all connected clients
      io.emit("battleProgress", progressData);
    };

    // Emit initial progress
    emitProgress({
      stage: "initializing",
      progress: 5,
      message: " Starting battle...",
      timestamp: Date.now()
    });

    const result = await runBattle(problem, emitProgress);

    const battle = await battleModel.create({
      problem,
      solution_1: result.solution_1,
      solution_2: result.solution_2,
      solution_1_score: result.judge.solution_1_score,
      solution_2_score: result.judge.solution_2_score,
      solution_1_reasoning: result.judge.solution_1_reasoning,
      solution_2_reasoning: result.judge.solution_2_reasoning,
    });

    res.status(200).json({
      _id: battle._id,
      problem: battle.problem,
      solution_1: battle.solution_1,
      solution_2: battle.solution_2,
      solution_1_score: battle.solution_1_score,
      solution_2_score: battle.solution_2_score,
      solution_1_reasoning: battle.solution_1_reasoning,
      solution_2_reasoning: battle.solution_2_reasoning,
      createdAt: battle.createdAt,
    });
  } catch (error) {
    console.error("Battle Error Details:", {
      message: error.message,
      stack: error.stack,
      error: error
    });
    res.status(500).json({ 
      error: "Failed to create battle", 
      details: error.message 
    });
  }
};

export const getAllBattles = async (req, res) => {
  try {
    const battles = await battleModel
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({ battles });
  } catch (error) {
    console.error("Get Battles Error:", error);
    res.status(500).json({ error: "Failed to fetch battles" });
  }
};

export const deleteBattle = async (req, res) => {
  try {
    const { battleId } = req.params;

    await battleModel.findByIdAndDelete(battleId);
    res.status(200).json({ message: "Battle deleted successfully" });
  } catch (error) {
    console.error("Delete Battle Error:", error);
    res.status(500).json({ error: "Failed to delete battle" });
  }
};

