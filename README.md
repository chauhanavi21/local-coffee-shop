# Professor Java's Coffee Sanctuary — Website

A multi-page website for **Professor Java's Coffee Sanctuary**, a real coffee shop at 145 Wolf Rd, Albany, NY 12205.

## Real business details

| | |
|---|---|
| **Address** | 145 Wolf Rd, Shoppers Park, Albany, NY 12205 |
| **Phone** | (518) 435-0843 |
| **Hours** | Mon–Sat 7am–9pm · Sun 7am–7pm |
| **Website** | [professorjavas.com](https://professorjavas.com) |

Menu items and prices are sourced from Grubhub / in-store listings (2025–2026).

## Features

- **Member accounts** — Sign up / sign in with JWT auth
- **Personal cart** — Items added from the menu or order page are saved per customer in MongoDB
- **Member offers** — Welcome discount, pastry Friday, and rewards points
- **Order ahead** — Pickup ordering with demo checkout

## Quick Start

### 1. Install dependencies

```bash
cd noir-bean-coffee
npm install
```

### 2. Environment

Copy `.env.example` to `.env` (already included for local dev):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/professor-javas
JWT_SECRET=change-this-to-a-long-random-secret-in-production
JWT_EXPIRES_IN=7d
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

MongoDB must be running locally, or point `MONGODB_URI` at MongoDB Atlas.

### 3. Run dev (frontend + API)

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Try the flow

1. Create an account at `/signup`
2. Browse `/menu` and click **Add to order**
3. Open `/order` to review your cart and member offers
4. Complete demo checkout at `/order/checkout`

## Pages

- **Home** — Hero, best sellers, story, reviews
- **Menu** — Full menu with add-to-order (requires login)
- **Order Ahead** — Personal cart, member offers, pickup time
- **Login / Signup** — Member accounts
- **About** — Real business story
- **Visit** — Location, hours, directions
- **Contact** — Phone, address, contact form

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- Express + MongoDB + JWT (backend in `/server`)
- React Router
