import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiTrash2 } from "react-icons/fi";

export const BattleHistory = ({
  battles,
  currentBattle,
  onSelectBattle,
  onDeleteBattle,
}) => {
  const theme = useTheme();

  if (!battles || Object.keys(battles).length === 0) {
    return (
      <div
        className={`${theme.bg.secondary} ${theme.border.primary} border rounded-lg p-6 text-center`}
      >
        <p className={`${theme.text.tertiary} text-sm`}>
          No battles yet. Start a new battle to see history!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${theme.bg.secondary} ${theme.border.primary} border rounded-lg overflow-hidden`}
    >
      <div className={`${theme.border.primary} border-b p-4`}>
        <h3 className={`font-bold ${theme.text.primary}`}>Battle History</h3>
        <p className={`text-xs ${theme.text.tertiary} mt-1`}>
          {Object.keys(battles).length} battles
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {Object.values(battles).map((battle) => {
          const isCurrentBattle = currentBattle?.id === battle.id;
          const winnerName = battle.winner === 1 ? "Mistral" : "Groq";

          return (
            <button
              key={battle.id}
              onClick={() => onSelectBattle(battle.id)}
              className={`w-full p-3 text-left border-b ${theme.border.primary} transition-colors ${
                isCurrentBattle
                  ? theme.isDark
                    ? "bg-gray-800 border-l-2 border-l-blue-500"
                    : "bg-gray-200 border-l-2 border-l-blue-600"
                  : theme.isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start justify-between group">
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${theme.text.primary} line-clamp-2`}
                  >
                    {battle.problem}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded">
                      🏆 {winnerName}
                    </span>
                    <span className={`text-xs ${theme.text.tertiary}`}>
                      {battle.solution_1_score} vs {battle.solution_2_score}
                    </span>
                  </div>
                  {battle.createdAt && (
                    <p className={`text-xs ${theme.text.tertiary} mt-1`}>
                      {new Date(battle.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBattle(battle.id);
                  }}
                  className={`p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ml-2 ${
                    theme.isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
                  }`}
                  title="Delete battle"
                >
                  <FiTrash2 size={16} className="text-red-500" />
                </button>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
