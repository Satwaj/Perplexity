# 🔌 Backend Integration Guide

## What the Frontend Expects

Your existing `battleController` in `Backend/src/controllers/battle.controller.js` is **perfect**! It already outputs the exact format the frontend needs.

## API Endpoints Required

### 1️⃣ START BATTLE - POST `/api/battle`

**Frontend sends:**
```javascript
POST /api/battle
Headers: {
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
Body: {
  "problem": "Explain React"
}
```

**Frontend expects response:**
```javascript
{
  "_id": "unique_battle_id",
  "problem": "Explain React",
  "solution_1": "React is a JavaScript library...",
  "solution_2": "React is a JavaScript library...",
  "solution_1_score": 9,        // Must be 0-10
  "solution_2_score": 8,        // Must be 0-10
  "solution_1_reasoning": "Mistral provided comprehensive explanation with good examples",
  "solution_2_reasoning": "Groq was clear but lacked depth",
  "createdAt": "2024-05-31T10:30:00Z"
}
```

✅ **Your current implementation matches this perfectly!**

---

### 2️⃣ GET ALL BATTLES - GET `/api/battle`

**Frontend sends:**
```javascript
GET /api/battle
Headers: {
  "Authorization": "Bearer {token}"
}
```

**Frontend expects response:**
```javascript
{
  "battles": [
    { /* battle object from above */ },
    { /* another battle */ }
  ]
}
```

**You need to add this route:**
```javascript
// Backend/src/routes/battle.routes.js
router.get("/", authMiddleware, getAllBattles);

// Backend/src/controllers/battle.controller.js
export const getAllBattles = async (req, res) => {
  const battles = await battleModel.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.status(200).json({ battles });
};
```

---

### 3️⃣ DELETE BATTLE - DELETE `/api/battle/:battleId`

**Frontend sends:**
```javascript
DELETE /api/battle/{battleId}
Headers: {
  "Authorization": "Bearer {token}"
}
```

**Frontend expects response:**
```javascript
{ "message": "deleted" }
// or any success response
```

**You need to add this route:**
```javascript
// Backend/src/routes/battle.routes.js
router.delete("/:battleId", authMiddleware, deleteBattle);

// Backend/src/controllers/battle.controller.js
export const deleteBattle = async (req, res) => {
  await battleModel.findByIdAndDelete(req.params.battleId);
  res.status(200).json({ message: "deleted" });
};
```

---

## 📊 Data Mapping

| Frontend Field | Backend Source | Type | Notes |
|---|---|---|---|
| `_id` | MongoDB `_id` | String | Battle unique ID |
| `problem` | Request body | String | User's question |
| `solution_1` | AI Model 1 response | String | Mistral's answer |
| `solution_2` | AI Model 2 response | String | Groq's answer |
| `solution_1_score` | Judge result | Number | 0-10 score |
| `solution_2_score` | Judge result | Number | 0-10 score |
| `solution_1_reasoning` | Judge result | String | Why Mistral scored X |
| `solution_2_reasoning` | Judge result | String | Why Groq scored Y |
| `createdAt` | MongoDB timestamp | ISO String | When battle was created |

---

## 🏆 Judge Scoring Guide

The judge should evaluate:
- **Accuracy** (0-10)
- **Clarity** (0-10)
- **Completeness** (0-10)
- **Usefulness** (0-10)

Final score: Average of these, rounded

---

## 📝 Complete Routes File Example

```javascript
// Backend/src/routes/battle.routes.js
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  battleController,
  getAllBattles,
  deleteBattle
} from "../controllers/battle.controller.js";

const router = express.Router();

// POST - Create new battle
router.post("/", authMiddleware, battleController);

// GET - Get all battles for user
router.get("/", authMiddleware, getAllBattles);

// DELETE - Delete specific battle
router.delete("/:battleId", authMiddleware, deleteBattle);

export default router;
```

---

## 🔐 Authentication

All requests include token in Authorization header:
```javascript
Authorization: `Bearer ${token}`
```

**Verify token is valid before processing any request!**

---

## ⚡ Performance Tips

1. **Add indexes** on `battleModel`:
   ```javascript
   battleSchema.index({ user: 1, createdAt: -1 });
   ```

2. **Pagination** for GET battles (optional):
   ```javascript
   // Add limit/skip for large result sets
   router.get("/?limit=20&skip=0")
   ```

3. **Cache judge scores** - Don't recalculate

---

## 🧪 Testing with Frontend

### Test Endpoint 1: Create Battle
```bash
curl -X POST http://localhost:3000/api/battle \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"problem": "Explain React"}'
```

### Test Endpoint 2: Get Battles
```bash
curl -X GET http://localhost:3000/api/battle \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Endpoint 3: Delete Battle
```bash
curl -X DELETE http://localhost:3000/api/battle/BATTLE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📱 Frontend will handle:
- Loading states
- Error messages
- Theme colors
- Responsive layout
- Markdown rendering
- Winner highlighting

## 🎯 Backend needs to provide:
- API endpoints
- Data validation
- AI model integration
- Judge scoring logic
- Database storage

---

## ✅ Checklist for Backend

- [ ] Add `GET /api/battle` endpoint
- [ ] Add `DELETE /api/battle/:battleId` endpoint
- [ ] Verify `POST /api/battle` returns correct format
- [ ] Add user ID to all battle queries
- [ ] Add date sorting to GET battles
- [ ] Test all endpoints with frontend
- [ ] Verify authentication on all routes
- [ ] Add error handling

---

## 🚀 You're Ready!

Once these endpoints are implemented:
1. Frontend can create battles
2. Frontend can view history
3. Frontend can delete battles
4. Full AI Battle Arena is live!

**The frontend is complete and waiting for your backend endpoints!** 🎉
