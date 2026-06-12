# 🚀 DEPLOYMENT GUIDE & PERFORMANCE OPTIMIZATION

## ✅ Google OAuth Configuration - Fixed!

### For Development (localhost)
✓ **Backend Route**: `http://localhost:3000/api/auth/google/callback`
✓ **Callback URL in .env**: `GOOGLE_REDIRECT_URI = http://localhost:3000/api/auth/google/callback`
✓ **Google Cloud Console**: Add `http://localhost:3000/api/auth/google/callback` to authorized redirect URIs

### For Production (Deployment)
The callback URL is **dynamically generated** based on `NODE_ENV`:
- If `NODE_ENV=production`: Uses `${BACKEND_URL}/api/auth/google/callback`
- If `NODE_ENV=development`: Uses `http://localhost:3000/api/auth/google/callback`

**Required .env variables for production:**
```
NODE_ENV=production
BACKEND_URL=https://your-backend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

---

## 🔧 Backend Performance Optimizations Applied

### 1. **Response Compression** ⚡
- Added `compression` middleware
- Reduces response size by ~70%
- Automatically compresses JSON, CSS, JS responses

### 2. **Security Headers** 🛡️
- Added `helmet` middleware
- Prevents common web vulnerabilities
- Improves security scoring

### 3. **Improved Logging** 📊
- Development: Detailed request logging (`morgan: dev`)
- Production: Combined format (`morgan: combined`)
- Reduces console spam in production

### 4. **Better CORS Configuration** 🌐
- Environment-aware origins
- Supports `FRONTEND_URL` variable for production
- Includes `PATCH` method support
- Better header handling

### 5. **Error Handling** ❌
- Global error handler middleware
- Consistent error responses
- Prevents stack traces leaking in production

### 6. **Health Check Endpoint** ✅
- `GET /health` for monitoring
- Returns `{ status: "OK", timestamp: "..." }`
- Perfect for load balancers and uptime monitors

### 7. **Optimized Body Parser** 📦
- Explicit body size limits (10mb max)
- Prevents huge payload attacks
- Supports both JSON and URL-encoded

---

## 🎨 Frontend Performance Optimizations Applied

### 1. **Aggressive Code Minification** 🗜️
- Terser minifier with default options
- Removes console.log() and debugger statements in production
- Reduces bundle size by ~40-50%

### 2. **Code Splitting** 📚
- Vendor chunk (React, Redux, Router)
- Utils chunk (Axios)
- Each feature loads independently
- Improves initial load time

### 3. **CSS Code Splitting** 🎨
- CSS is code-split separately
- Only loads CSS for active routes
- Reduces initial CSS bundle

### 4. **Dependency Optimization** 🔍
- Pre-bundled common dependencies
- Faster module resolution
- Better cache utilization

### 5. **Build Reporting** 📈
- Reports compressed size
- Warns if chunks exceed 500KB
- Helps identify bottlenecks

---

## 📋 Deployment Checklist

### Backend Deployment
- [ ] Update `MONGO_URI` with production database connection string
- [ ] Set `NODE_ENV=production`
- [ ] Set `BACKEND_URL=https://your-backend-domain.com`
- [ ] Set `FRONTEND_URL=https://your-frontend-domain.com`
- [ ] Generate a new strong `JWT_SECRET_KEY` (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Update all AI API keys (MISTRAL, GROQ, OPENAI, etc.)
- [ ] Run `npm install` to install new packages (compression, helmet)
- [ ] Update Google OAuth credentials in Google Cloud Console:
  - Add production redirect URI: `https://your-backend-domain.com/api/auth/google/callback`
  - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Test health endpoint: `GET https://your-backend-domain.com/health`
- [ ] Monitor logs and error rates

### Frontend Deployment
- [ ] Update `VITE_API_BASE_URL` to point to production backend
- [ ] Run `npm run build` (generates optimized dist folder)
- [ ] Deploy `dist` folder to CDN or static host (Vercel, Netlify, etc.)
- [ ] Verify API calls connect to production backend
- [ ] Test Google OAuth login/register flow
- [ ] Test logout functionality
- [ ] Check Network tab in DevTools:
  - Verify gzip compression applied (look for `Content-Encoding: gzip`)
  - Verify no console errors in production

### Google Cloud Console Updates
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. APIs & Services → Credentials
4. Edit OAuth 2.0 Client
5. Add these authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://your-backend-domain.com/api/auth/google/callback`
6. Save

---

## 🧪 Performance Testing

### Frontend Bundle Size
```bash
npm run build
# Check dist folder size - should be < 500KB gzipped
```

### Backend Response Compression
```bash
# Test with curl
curl -i -H "Accept-Encoding: gzip" https://your-backend-domain.com/health
# Should show: Content-Encoding: gzip
```

### Health Check
```bash
curl https://your-backend-domain.com/health
# Response: { "status": "OK", "timestamp": "..." }
```

---

## ⚠️ Common Issues & Fixes

### Issue: Google OAuth redirect_uri_mismatch
**Solution**: 
1. Verify `BACKEND_URL` is set correctly in .env
2. Verify redirect URI in Google Cloud Console matches backend URL
3. If using custom domain, ensure it's in Google Cloud authorized origins

### Issue: CORS errors in production
**Solution**:
1. Update `FRONTEND_URL` in backend .env
2. Ensure frontend domain is in allowed origins
3. Clear browser cache and cookies

### Issue: Slow API responses
**Solution**:
1. Enable compression: Check `Content-Encoding: gzip` header
2. Check MongoDB indexes on frequently queried fields
3. Monitor backend logs for slow queries

### Issue: Large bundle size
**Solution**:
1. Run `npm run build` and check `dist` folder
2. Look for large chunks in build output
3. Consider lazy-loading heavy components

---

## 📊 Performance Metrics to Monitor

- **Backend**: Response time < 200ms, uptime > 99.9%
- **Frontend**: First Contentful Paint < 2s, Largest Contentful Paint < 4s
- **Bundle Size**: < 500KB gzipped
- **API calls**: All compressed with gzip (check headers)
- **Database**: Query time < 50ms average

---

## 🔐 Security Reminders

- ✅ Helmet headers enabled (HSTS, X-Frame-Options, etc.)
- ✅ CORS properly configured (restrict origins)
- ✅ JWT_SECRET_KEY is strong and changed in production
- ✅ API keys are never committed to git (use .env)
- ✅ Passwords hashed with bcryptjs (salt rounds: 10)
- ✅ Console logs removed in production build
- ✅ Sourcemaps disabled in production

---

## 🚀 Quick Deployment Commands

### Backend
```bash
cd Backend
npm install
npm start  # For production with NODE_ENV=production
```

### Frontend
```bash
cd Frontend
npm install
npm run build  # Generates optimized dist folder
npm run preview  # Test production build locally
```

---

**Last Updated**: June 2026
**Status**: ✅ Production Ready
