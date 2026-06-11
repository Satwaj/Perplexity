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

const solutionNode = async (state, emitProgress) => {
    if (emitProgress) {
        emitProgress({
            stage: "generating",
            progress: 15,
            message: " Mistral is thinking...",
            timestamp: Date.now()
        });
    }

    const [mistralResponse, groqResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        groqModel.invoke(state.problem)
    ]);

    if (emitProgress) {
        emitProgress({
            stage: "generating",
            progress: 45,
            message: " Groq is thinking...",
            timestamp: Date.now()
        });
    }

    // Extract content from LangChain message objects
    const mistralContent = mistralResponse?.content || mistralResponse?.text || mistralResponse;
    const groqContent = groqResponse?.content || groqResponse?.text || groqResponse;

    if (emitProgress) {
        emitProgress({
            stage: "generating",
            progress: 60,
            message: "✅ Both solutions generated!",
            timestamp: Date.now()
        });
    }

    return {
        solution_1: typeof mistralContent === 'string' ? mistralContent : JSON.stringify(mistralContent),
        solution_2: typeof groqContent === 'string' ? groqContent : JSON.stringify(groqContent)
    };
};

const judgeNode = async (state, emitProgress) => {
    if (emitProgress) {
        emitProgress({
            stage: "judging",
            progress: 70,
            message: "⚖️ Judge is evaluating solutions...",
            timestamp: Date.now()
        });
    }

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

    if (emitProgress) {
        emitProgress({
            stage: "judging",
            progress: 85,
            message: " Calculating scores...",
            timestamp: Date.now()
        });
    }

    // Extract content from LangChain message objects
    const content =
        typeof judgeResponse.content === "string"
            ? judgeResponse.content
            : typeof judgeResponse.text === "string"
            ? judgeResponse.text
            : judgeResponse.content?.[0]?.text || JSON.stringify(judgeResponse);


    try {
        const parsed = JSON.parse(content);
        
        if (emitProgress) {
            emitProgress({
                stage: "complete",
                progress: 100,
                message: " Battle complete!",
                timestamp: Date.now()
            });
        }
        
        return {
            judge: parsed
        };
    } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError, "Content was:", content);
        throw new Error(`Failed to parse judge response: ${jsonError.message}`);
    }
};





export default async function runBattle(problem, emitProgress = null) {
    // Create wrapper functions that capture emitProgress
    const solutionNodeWrapper = async (state) => {
        return solutionNode(state, emitProgress);
    };

    const judgeNodeWrapper = async (state) => {
        return judgeNode(state, emitProgress);
    };

    // Create graph with wrapper nodes
    const graph = new StateGraph(state)
        .addNode("solution", solutionNodeWrapper)
        .addNode("judge_node", judgeNodeWrapper)
        .addEdge(START, "solution")
        .addEdge("solution", "judge_node")
        .addEdge("judge_node", END)
        .compile();

    const result = await graph.invoke({
        problem
    });

    return result;
}