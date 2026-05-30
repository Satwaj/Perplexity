# 🔌 Backend Integration Guide

This document explains what the frontend expects from the backend API.

## API Base URL

The frontend uses environment variable `VITE_API_BASE_URL` which defaults to `http://localhost:3000`.

```
Development: http://localhost:3000
Production: https://your-backend-domain.com
```

## CORS Configuration

**Required CORS Headers:**
```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Authentication Flow

### 1. Register
```
POST /api/auth/register
Body: { email, username, password }
Response: { user: { id, email, username }, token }
```
Store `token` in localStorage as `authToken`

### 2. Login
```
POST /api/auth/login
Body: { email, password }
Response: { user: { id, email, username }, token }
```
Store `token` in localStorage as `authToken`

### 3. Get Current User
```
GET /api/auth/get-me
Headers: { Authorization: "Bearer <token>" }
Response: { user: { id, email, username } }
```

## Chat API Endpoints

### 1. Send Message
```
POST /api/chats/message
Headers: { Authorization: "Bearer <token>" }
Body: { message: "user message", chat: "chatId or null" }
Response: { chat: { _id, title }, aiMessage: { content, role } }
```

### 2. Get All Chats
```
GET /api/chats
Headers: { Authorization: "Bearer <token>" }
Response: { chats: [{ _id, title, updatedAt }] }
```

### 3. Get Chat Messages
```
GET /api/chats/:chatId/messages
Headers: { Authorization: "Bearer <token>" }
Response: { messages: [{ content, role, timestamp }] }
```

### 4. Delete Chat
```
DELETE /api/chats/delete/:chatId
Headers: { Authorization: "Bearer <token>" }
Response: { success: true }
```

## WebSocket (Socket.io)

### Connection URL
Same as API base URL with Socket.io transport

### Expected Events
```javascript
socket.on('connect') // Connection established
socket.on('error') // Error occurred
socket.on('disconnect') // Connection closed
```

## Response Format

All API responses should follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "err": "Optional error code"
}
```

## Error Handling

Frontend expects error messages in:
- `response.data.message` (primary)
- `response.data.err` (fallback)

## Token Storage

Frontend stores auth token in localStorage:
```javascript
localStorage.getItem('authToken') // Used in Authorization header
localStorage.removeItem('authToken') // On logout
```

## Production Checklist

- [ ] CORS properly configured
- [ ] Auth endpoints return correct structure
- [ ] Chat endpoints require auth
- [ ] Socket.io server running on same domain as API
- [ ] SSL/TLS certificates valid
- [ ] Rate limiting configured
- [ ] Error messages clear and helpful

## Testing Integration

```bash
# Development
VITE_API_BASE_URL=http://localhost:3000 npm run dev

# After backend changes
npm run build
npm run preview
```

## Common Issues

### "CORS Error"
- Check CORS headers from backend
- Verify origin matches production domain
- Test with curl: `curl -i http://localhost:3000/api/auth/get-me`

### "401 Unauthorized"
- Token not in localStorage
- Token expired
- Missing Authorization header from frontend

### "Socket Connection Failed"
- Socket.io server not running
- Port not accessible
- CORS issues with WebSocket

---

**For questions, contact:** [Your Contact Info]
