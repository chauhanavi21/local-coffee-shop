# Professor Java's Coffee Sanctuary — Website

A multi-page website for **Professor Java's Coffee Sanctuary**, a real coffee shop at 145 Wolf Rd, Albany, NY 12205.

## Real business details

| | |
|---|---|
| **Address** | 145 Wolf Rd, Shoppers Park, Albany, NY 12205 |
| **Phone** | (518) 435-0843 |
| **Hours** | Mon–Sat 7am–9pm · Sun 7am–7pm |
| **Website** | [professorjavas.com](https://professorjavas.com) |

Menu items and prices are loaded from MongoDB (seeded on first API start).

## Features

- **Member accounts** — Sign up / sign in with JWT auth
- **Personal cart** — Items added from the menu or order page are saved per customer in MongoDB
- **MongoDB menu** — Products, prices, descriptions, and images served from the database
- **Member offers** — Welcome discount, pastry Friday, and rewards points
- **Order ahead** — Pickup ordering with demo checkout

## Quick Start

### 1. Install dependencies

```bash
cd noir-bean-coffee
npm install
```

### 2. Environment

Create a local `.env` file (this file is gitignored and never committed):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true
JWT_SECRET=generate-a-long-random-secret
JWT_EXPIRES_IN=7d
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### 3. Run dev (frontend + API)

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- Menu: [http://localhost:5000/api/menu](http://localhost:5000/api/menu)

On first run the API seeds the menu into MongoDB if the collection is empty.

### 4. Try the flow

1. Create an account at `/signup`
2. Browse `/menu` and click **Add to order**
3. Open `/order` to review your cart and member offers
4. Complete demo checkout at `/order/checkout`

## Pages

- **Home** — Hero, best sellers from DB, story, reviews
- **Menu** — Full menu from MongoDB with add-to-order (requires login)
- **Order Ahead** — Personal cart, member offers, pickup time
- **Login / Signup** — Member accounts
- **About** — Real business story
- **Visit** — Location, hours, directions
- **Contact** — Phone, address, contact form

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- Express + MongoDB + JWT (backend in `/server`)
- React Router
