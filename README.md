# A1-EcommerceApp

Full-stack Ecommerce sample app (React Native frontend + Node/Express backend).

## Repository layout

- `Backend/` — Node.js (ESM) API using Express and MongoDB (Mongoose).
- `Frontend/` — React Native mobile app (TypeScript + React Native).

## Prerequisites

- Node.js >= 20 (see `Frontend/package.json` engines). Use `nvm` or similar to manage Node versions.
- npm or yarn
- MongoDB (Atlas or local) accessible via `MONGO_URI`.

Optional (for email features):

- Mailtrap or SMTP credentials for sending verification & password reset emails.

## Backend (Backend/)

1. Install dependencies

```bash
cd Backend
npm install
# or: yarn
```

2. Environment

Create a `.env` file in `Backend/` (the app loads `./.env`). Example values:

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb
CORS_ORIGIN=http://10.0.2.2:3000

# JWT
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Forgot password redirect (frontend URL where users reset password)
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:19006/reset-password

# Mailtrap / SMTP
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=xxxxx
MAILTRAP_SMTP_PASS=xxxxx
```

3. Run

- Development (auto-restarts):

```bash
cd Backend
npm run dev
```

- Production / manual start:

```bash
cd Backend
npm start
```

The API base is mounted under `/api/v1`. A simple healthcheck endpoint is available at:

```
GET /api/v1/healthcheck
```

Notes:

- The backend connects to MongoDB using `MONGO_URI` and binds to `0.0.0.0` so it can be reached from emulators/devices on the same network.

## Frontend (Frontend/)

This is a React Native project (see `Frontend/package.json`).

1. Install dependencies

```bash
cd Frontend
npm install
# or: yarn
```

2. Run Metro (packager)

```bash
cd Frontend
npm run start
```

3. Run on device/emulator

- Android:

```bash
cd Frontend
npm run android
```

Notes:

- The frontend expects the backend API to be reachable from the mobile app (check emulator/device networking and `FORGOT_PASSWORD_REDIRECT_URL` used by backend emails).

## Quick development tips

- If running the mobile app on an Android emulator, the backend default CORS origin uses `http://10.0.2.2:3000` — update `CORS_ORIGIN` in the backend `.env` if needed.
- Use Mailtrap credentials (or a local SMTP) for testing outgoing emails.

## Project scripts (high level)

- Backend

  - `npm run dev` — start backend with nodemon

- Frontend
  - `npx react-native start` — start Metro
  - `npx react-native run-android` — build+run on Android

---

If you'd like, I can:

- add an example `.env.example` file to `Backend/` with the placeholders filled in, or
- add a short `README-Backend.md` and `README-Frontend.md` with more detailed API docs and screen setup.
