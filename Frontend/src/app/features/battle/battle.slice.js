import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBattle: null,
  battles: {},
  loading: false,
  error: null,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBattle: (state, action) => {
      const battle = action.payload;
      state.currentBattle = battle._id;
      state.battles[battle._id] = battle;
    },
    setBattles: (state, action) => {
      state.battles = action.payload.reduce((acc, battle) => {
        acc[battle._id] = {
          id: battle._id,
          problem: battle.problem,
          solution_1: battle.solution_1,
          solution_2: battle.solution_2,
          solution_1_score: battle.solution_1_score,
          solution_2_score: battle.solution_2_score,
          solution_1_reasoning: battle.solution_1_reasoning,
          solution_2_reasoning: battle.solution_2_reasoning,
          winner: battle.solution_1_score > battle.solution_2_score ? 1 : 2,
          createdAt: battle.createdAt,
        };
        return acc;
      }, {});
    },
    setCurrentBattle: (state, action) => {
      state.currentBattle = action.payload;
    },
    deleteBattle: (state, action) => {
      delete state.battles[action.payload];
      if (state.currentBattle === action.payload) {
        state.currentBattle = null;
      }
    },
    clearBattle: (state) => {
      state.currentBattle = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setBattle,
  setBattles,
  setCurrentBattle,
  deleteBattle,
  clearBattle,
} = battleSlice.actions;

export default battleSlice.reducer;
