# 📂 Battle Arena - Complete File Structure & Reference

## 🎯 Quick File Reference

### Core Files

#### 🔴 `battle.slice.js`
**Redux state management for battles**
- `currentBattle` - ID of currently viewed battle
- `battles` - Object of all battles keyed by ID
- `loading` - Loading state
- `error` - Error messages

Actions:
- `setBattle()` - Add single battle
- `setBattles()` - Set all battles
- `setCurrentBattle()` - Change current battle
- `deleteBattle()` - Remove battle
- `setLoading()`, `setError()` - State setters

---

#### 🟢 `useBattle.js` (Hook)
**Main hook for all battle logic**

Functions:
```javascript
const {
  battles,              // All battles object
  currentBattle,        // Current battle object (not ID)
  loading,              // Boolean
  error,                // Error string or null
  handleStartBattle,    // Start new battle
  handleGetBattles,     // Fetch battles
  handleOpenBattle,     // Select battle
  handleDeleteBattle    // Delete battle
} = useBattle();
```

Usage in components:
```jsx
const { battles, currentBattle, loading } = useBattle();
```

---

#### 🟡 `battle.api.js` (Service)
**API calls to backend**

Functions:
- `startBattle(problem)` - POST to `/api/battle`
- `getBattles()` - GET `/api/battle`
- `deleteBattle(battleId)` - DELETE `/api/battle/:id`

All include authentication header automatically.

---

## 🎨 Component Files

### BattleInputSection.jsx
**Input form for battles**

Props:
```jsx
<BattleInputSection
  problem={string}           // Textarea value
  setProblem={function}      // Textarea onChange
  onStartBattle={function}   // Submit handler
  loading={boolean}          // Show spinner
/>
```

Features:
- Textarea for problem input
- "Start Battle" button
- Loading animation
- Disabled when loading or empty

---

### SolutionCard.jsx
**Displays one AI's solution**

Props:
```jsx
<SolutionCard
  aiName="Mistral"           // "Mistral" or "Groq"
  solution={string}          // Solution text (markdown)
  score={number}             // 0-10
  reasoning={string}         // Judge reasoning (markdown)
  isWinner={boolean}         // Gold styling if true
/>
```

Features:
- AI name with emoji
- Score badge
- Solution display (scrollable)
- Reasoning section
- Winner styling (gold border)
- Markdown formatting

---

### JudgeResult.jsx
**Judge's verdict display**

Props:
```jsx
<JudgeResult
  winner={1 or 2}           // Which AI won
  solution1Score={number}   // Mistral score
  solution2Score={number}   // Groq score
/>
```

Features:
- Winner badge with trophy
- Side-by-side score comparison
- Score bars with percentages
- Difference calculation

---

### BattleLoadingState.jsx
**Loading animation during battle**

No props - just renders loading UI

Features:
- Bouncing emojis animation
- Text indicating "Battle in Progress"
- Animated progress bars
- Typing indicator dots
- Shows "Judge analyzing..."

---

### BattleHistory.jsx
**List of previous battles**

Props:
```jsx
<BattleHistory
  battles={object}           // All battles
  currentBattle={object}     // Selected battle
  onSelectBattle={function}  // Click handler
  onDeleteBattle={function}  // Delete handler
/>
```

Features:
- Scrollable list
- Shows problem, winner, scores
- Current battle highlighted
- Delete button on hover
- Shows creation date

---

## 🖥️ Page Components

### BattleArena.jsx
**Main page - orchestrates everything**

Layout:
```
Header (with Back button)
  ↓
Title & Description
  ↓
Grid Layout:
  ├─ Left (1/4): Input + History
  └─ Right (3/4): Results
```

Logic:
- Fetches battles on mount
- Manages problem input state
- Handles battle submission
- Shows loading state
- Displays current battle

---

## 🛠️ Utility Files

### markdown.utils.js
**Markdown renderer**

Function:
```jsx
<ReactMarkdown content="# Heading\n**bold**" />
```

Supports:
- Headers (H1-H4)
- Bold (**text**)
- Italic (*text*)
- Inline code (`code`)
- Code blocks (```js...```)
- Lists (- and 1.)

---

## 📦 State Flow

```
User enters problem
    ↓
Click "Start Battle"
    ↓
handleStartBattle() called
    ↓
setLoading(true)
    ↓
startBattle(problem) API call
    ↓
Backend processes...
    ↓
Response received
    ↓
dispatch(setBattle(result))
    ↓
BattleLoadingState hidden
    ↓
Results displayed
```

---

## 🔌 Integration Points

### Redux Store
Location: `app.store.js`
```javascript
import battleReducer from './features/battle/battle.slice';

reducer: {
  battle: battleReducer
}
```

### Routes
Location: `app.routes.jsx`
```javascript
{
  path: "/battle",
  element: (
    <Protected>
      <BattleArena />
    </Protected>
  ),
}
```

### Sidebar
Location: `ChatSidebar.jsx`
```javascript
{ 
  icon: <GiSwordman size={20} />, 
  label: "Arena", 
  action: () => navigate("/battle") 
}
```

---

## 📊 Data Structure

### Battle Object
```javascript
{
  id: "string",                      // MongoDB _id
  problem: "Explain React",
  solution_1: "React is...",        // Mistral
  solution_2: "React is...",        // Groq
  solution_1_score: 9,              // 0-10
  solution_2_score: 8,              // 0-10
  solution_1_reasoning: "...",      // Judge opinion
  solution_2_reasoning: "...",      // Judge opinion
  winner: 1 or 2,                   // Calculated (highest score)
  createdAt: "ISO timestamp"
}
```

---

## 🧪 Testing Components

### Test BattleInputSection
```jsx
<BattleInputSection
  problem="test"
  setProblem={() => {}}
  onStartBattle={() => console.log('submit')}
  loading={false}
/>
```

### Test SolutionCard
```jsx
<SolutionCard
  aiName="Mistral"
  solution="Test solution"
  score={9}
  reasoning="Good explanation"
  isWinner={true}
/>
```

### Test JudgeResult
```jsx
<JudgeResult
  winner={1}
  solution1Score={9}
  solution2Score={8}
/>
```

---

## 🚀 Import Examples

### In Components
```javascript
import { useBattle } from "../hooks/useBattle";
import { BattleInputSection, SolutionCard } from "../components";
import { ReactMarkdown } from "../utils/markdown.utils";
```

### In Redux Selectors
```javascript
const battles = useSelector(state => state.battle.battles);
const loading = useSelector(state => state.battle.loading);
```

---

## 🔑 Key Constants

### API Base URL
```javascript
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";
```

### AI Names
```javascript
"Mistral"   // AI 1
"Groq"      // AI 2
```

### Score Range
```
0-10 (out of 10)
```

---

## 💾 File Sizes (Approximate)

| File | Lines | Purpose |
|------|-------|---------|
| battle.slice.js | 65 | Redux state |
| useBattle.js | 70 | Hook logic |
| battle.api.js | 60 | API calls |
| BattleInputSection.jsx | 40 | Input form |
| SolutionCard.jsx | 75 | Solution display |
| JudgeResult.jsx | 70 | Judge verdict |
| BattleLoadingState.jsx | 110 | Loading UI |
| BattleHistory.jsx | 85 | History list |
| BattleArena.jsx | 120 | Main page |
| markdown.utils.js | 130 | Markdown renderer |

**Total: ~825 lines of clean, modular code**

---

## ✅ Dependencies

### Already in project:
- `react`
- `react-redux`
- `@reduxjs/toolkit`
- `react-router`
- `react-icons` (for sidebar icons)
- `tailwindcss`

### May need:
- `react-icons/gi` (for sword icon - or use emoji)

---

## 🎯 Next Steps

1. ✅ Frontend complete
2. ⏳ Implement backend endpoints
3. ⏳ Test with frontend
4. ⏳ Deploy to production

**Frontend is ready now!** 🚀
