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

    // Extract content from LangChain message objects
    const mistralContent = mistralResponse?.content || mistralResponse?.text || mistralResponse;
    const groqContent = groqResponse?.content || groqResponse?.text || groqResponse;

    return {
        solution_1: typeof mistralContent === 'string' ? mistralContent : JSON.stringify(mistralContent),
        solution_2: typeof groqContent === 'string' ? groqContent : JSON.stringify(groqContent)
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

    // Extract content from LangChain message objects
    const content =
        typeof judgeResponse.content === "string"
            ? judgeResponse.content
            : typeof judgeResponse.text === "string"
            ? judgeResponse.text
            : judgeResponse.content?.[0]?.text || JSON.stringify(judgeResponse);


    try {
        const parsed = JSON.parse(content);
        return {
            judge: parsed
        };
    } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError, "Content was:", content);
        throw new Error(`Failed to parse judge response: ${jsonError.message}`);
    }
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