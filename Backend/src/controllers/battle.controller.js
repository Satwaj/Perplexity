import runBattle from "../services/battle.graph.js";

export const battleController = async (req, res) => {

    const { problem } = req.body;

    const result = await runBattle(problem);

    res.status(200).json(result);
};

