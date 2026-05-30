import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import { mistralModel, groqModel, geminiModel } from "./battle.service.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";
import z from "zod";

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
});

const solutionNode = async (state) => {

    const [mistralResponse, groqResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        groqModel.invoke(state.problem)
    ]);

    return {
        solution_1: mistralResponse.text,
        solution_2: groqResponse.text
    };
};

const judgeNode = async (state) => {

    const { problem, solution_1, solution_2 } = state;

    const judgeResponse = await groqModel.invoke(`
You are an AI judge.

Problem:
${problem}

Solution 1:
${solution_1}

Solution 2:
${solution_2}

Evaluate both solutions.

Return ONLY valid JSON in this format:

{
  "solution_1_score": 0,
  "solution_2_score": 0,
  "solution_1_reasoning": "",
  "solution_2_reasoning": ""
}
`);

    const content =
        typeof judgeResponse.content === "string"
            ? judgeResponse.content
            : judgeResponse.content[0]?.text;

    const parsed = JSON.parse(content);

    return {
        judge: parsed
    };
};





const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge_node", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge_node")
    .addEdge("judge_node", END)
    .compile();

export default async function runBattle(problem) {

    const result = await graph.invoke({
        problem
    });

    return result;
}