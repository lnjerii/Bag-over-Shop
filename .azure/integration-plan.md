# Integration hand-off — Bag Over Shop

## Frontend
- Project folder: workspace root (`.`)
- Install: `npm install`
- Build/typecheck: `npm run build`
- Dev: `npm run dev`
- Data seam: no API client; catalog and all photography are centralized in `src/data/store.ts`
- Mock files to remove: none; this approved project is intentionally frontend-only
- Cart persistence: browser `localStorage` key `bag-over-shop-cart`

## Backend and API
- Backend: none by approved scope
- Run/build/health command: not applicable
- API routes: none
- WhatsApp handoff: `https://wa.me/254741363694` with URL-encoded order summary

## Database
- Database and migrations: none
- Seed data: none

## Shared types
- `Product` and `Category`: `src/data/store.ts`
- Shared package/client alias: none

## Services
- Essential: React + TypeScript + Vite storefront, Tailwind CSS, browser-local cart, WhatsApp order handoff
- Enhancement: none
