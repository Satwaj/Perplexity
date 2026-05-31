import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setBattle,
  setBattles,
  setCurrentBattle,
  deleteBattle as deleteBattleAction,
} from "../battle.slice";
import { startBattle, getBattles, deleteBattle } from "../service/battle.api";
import { useCallback } from "react";

export const useBattle = () => {
  const dispatch = useDispatch();
  const battlesObj = useSelector((state) => state.battle?.battles || {});
  const currentBattleId = useSelector((state) => state.battle?.currentBattle);
  const loading = useSelector((state) => state.battle?.loading);
  const error = useSelector((state) => state.battle?.error);

  // Convert battles object to array
  const battles = Object.values(battlesObj);
  const currentBattle = currentBattleId ? battlesObj[currentBattleId] : null;

  const handleStartBattle = async (problem) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const result = await startBattle(problem);
      dispatch(setBattle(result));
      dispatch(setCurrentBattle(result._id));
      return result;
    } catch (err) {
      const errorMsg = err.message || "Failed to start battle";
      dispatch(setError(errorMsg));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetBattles = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await getBattles();
      dispatch(setBattles(data.battles || []));
    } catch (err) {
      const errorMsg = err.message || "Failed to fetch battles";
      dispatch(setError(errorMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleOpenBattle = (battle) => {
    if (battle === null) {
      dispatch(setCurrentBattle(null));
    } else {
      dispatch(setCurrentBattle(battle._id || battle.id));
    }
  };

  const handleDeleteBattle = async (battleId) => {
    try {
      await deleteBattle(battleId);
      dispatch(deleteBattleAction(battleId));
      if (currentBattle === battleId) {
        dispatch(setCurrentBattle(null));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to delete battle"));
    }
  };

  return {
    battles,
    currentBattle,
    loading,
    error,
    handleStartBattle,
    handleGetBattles,
    handleOpenBattle,
    handleDeleteBattle,
  };
};
