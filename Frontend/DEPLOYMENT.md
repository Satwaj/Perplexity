# 🚀 Deployment Guide - Blinkly Frontend

## Environment Configuration

### Local Development
```bash
# .env (development)
VITE_API_BASE_URL=http://localhost:3000
```

### Production Deployment

#### **Vercel Deployment**
1. Go to your Vercel project settings
2. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com
   ```
3. Build will automatically use `.env.production`

#### **Render Deployment**
1. In Render dashboard, go to Environment settings
2. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com
   ```
3. Deploy and Vite will inject the variable at build time

#### **Other Platforms (Netlify, Railway, etc.)**
Set environment variable in platform dashboard:
```
VITE_API_BASE_URL=https://your-production-backend-url.com
```

## Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Linting
npm run lint
```

## Code Quality Checklist

✅ **Fixed Issues:**
- [x] Environment variables for API endpoints
- [x] Axios interceptors for token management
- [x] Socket.io with environment-based URLs
- [x] useEffect dependency arrays corrected
- [x] Protected component error handling
- [x] Redux configuration with serialization checks
- [x] Build optimization with code splitting
- [x] .gitignore properly configured

## Pre-Deployment Checklist

- [ ] All environment variables configured on deployment platform
- [ ] Backend API URL is correct for production
- [ ] CORS configured on backend for production domain
- [ ] Socket.io server configured for production domain
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors or warnings: `npm run lint`
- [ ] Test auth flow (login/register)
- [ ] Test chat functionality
- [ ] Test WebSocket connection

## Troubleshooting

### "API calls failing in production"
- Check backend URL in environment variables
- Verify CORS headers on backend
- Check network tab in DevTools for actual URL being used

### "Socket connection failing"
- Ensure Socket.io endpoint matches API base URL
- Check firewall/proxy settings
- Verify socket.io server is running

### "Build failing"
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors
- Run `npm run lint` to catch issues

## Production Monitoring

After deployment, check:
1. Network tab - Verify API calls go to correct endpoint
2. Console - Should be clean (no errors)
3. Application tab - Check if auth token is stored
4. WebSocket - Should connect without errors

---
**Last Updated:** May 2026
