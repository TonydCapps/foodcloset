# FoodCloset — Deployment & Local Development

A concise guide to run and develop the FoodCloset app (backend + frontend) locally, plus known issues and quick fixes.

**Project Overview:**
- **Backend:** Express + MongoDB in `backend/`.
- **Frontend:** Create React App (TypeScript) in `frontend/`.

**⚡ Quick Deploy:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for 5-minute Railway deployment or other options.

## Requirements
- Node >= 18 (Node 24 tested here) and npm.
- MongoDB (local or Atlas) accessible via `MONGODB_URI`.

## Environment
- Copy `backend/.env.example` and configure `MONGODB_URI`, `JWT_SECRET`, etc.
- Copy `frontend/.env.example` and configure `REACT_APP_API_URL` (defaults to `http://localhost:5000/api`).

## Quick Commands

**Backend:**
```powershell
cd backend
npm install
npm run start
```

**Frontend:**
```powershell
cd frontend
npm install --legacy-peer-deps
npm start        # React dev server (http://localhost:3000)
npm run build    # production build -> frontend/build
npx serve -s frontend/build -l 3000  # serve production build
```

## Docker (Production)

**Build and run locally:**
```bash
docker-compose build
docker-compose up
```

**Production deployment:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Database Seeding

```powershell
cd backend
node seed.js
```

## API Endpoints

- Health: `GET /api/health` — returns 200 JSON.
- Auth: `POST /api/auth/register`, `POST /api/auth/login` — see `backend/routes/auth.js`
- Resources: `GET /api/resources`, `POST /api/resources`, etc. — see `backend/routes/resources.js`
- Users: `GET /api/users/profile`, etc. — see `backend/routes/users.js`

## Troubleshooting

### "options.allowedHosts[0] should be a non-empty string"
Set `DANGEROUSLY_DISABLE_HOST_CHECK=true` in `frontend/.env.development.local` (dev only, not for production).

### Port 3000 already in use
Another process is occupying port 3000. Stop that process or accept a different port.

### MongoDB connection error
- Ensure MongoDB is running locally or connection string is correct
- Use MongoDB Atlas for cloud database: `mongodb+srv://user:pass@cluster.mongodb.net/foodcloset`

## Production Notes

- Build with `npm --prefix frontend run build` and serve static files with your static host or Node server.
- Use Docker for consistent environment across dev/prod.
- Set strong `JWT_SECRET` (min 32 characters).
- Enable HTTPS/TLS in production.
- Configure CORS for your domain.

## Files of Interest

- `backend/server.js` — Express server entry.
- `backend/middleware/errorHandler.js` — Global error handling.
- `frontend/src/pages/Map.tsx` — map page with Leaflet integration.
- `docker-compose.yml` — Local development Docker setup.
- `docker-compose.prod.yml` — Production Docker setup.
- `DEPLOYMENT_GUIDE.md` — Detailed deployment instructions for multiple platforms.
- `DEPLOYMENT.md` — Original deployment notes (legacy).

## CI/CD

See `.github/workflows/` for GitHub Actions pipeline (if configured).

---

Thank you for helping your community! 🙏