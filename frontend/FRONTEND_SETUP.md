# KEYSTONE Frontend — Final Setup

Copy this bundle into your existing `frontend/` project. Keep the shadcn-generated files you already have:
- `src/index.css`
- `src/components/ui/button.jsx`
- `src/lib/utils.js`
- `components.json`

Create `.env` in `frontend/`:
```env
VITE_API_URL=https://keystone-fieldservice.onrender.com
```

Install/confirm dependencies:
```bash
npm install axios react-router-dom antd @ant-design/icons lucide-react react-hook-form zod @hookform/resolvers recharts date-fns sonner clsx tailwind-merge dayjs
```

Run:
```bash
npm run dev
```

## UI stack
- shadcn/ui: primary app controls/design foundation
- Ant Design: enterprise tables/forms/modals
- React Bits design language: restrained spotlight/glow interactions, motion and polish. The bundle includes a lightweight original spotlight treatment so it runs without extra registry files. If you install the official free React Bits SpotlightCard later, you can swap only `StatCard.jsx` without changing the architecture.

## Important
Browser CORS must be enabled on Spring Boot. See `BACKEND_CORS_REQUIRED.md`.
