# Vite to Next.js Migration Notes

## Summary
This project has been successfully migrated from Vite + React to Next.js 14 with App Router.

## Key Changes Made

### 1. Configuration Files
- ✅ Created `next.config.js` with webpack polyfills for Buffer, crypto, stream, and util
- ✅ Created `jsconfig.json` for path aliases
- ✅ Updated `tailwind.config.js` to use CommonJS and updated content paths
- ✅ Updated `.gitignore` to include Next.js build directories (`.next/`, `out/`)

### 2. Project Structure
- ✅ Created `app/` directory with Next.js App Router structure:
  - `app/layout.jsx` - Root layout with metadata
  - `app/providers.jsx` - Client-side providers (Wagmi, RainbowKit, QueryClient)
  - `app/page.jsx` - Home page route
  - `app/staking/page.jsx` - Staking page route
  - `app/globals.css` - Global styles (moved from `src/index.css` and `src/App.css`)

### 3. Dependencies
- ✅ Removed Vite-specific packages (`vite`, `@vitejs/plugin-react`)
- ✅ Added Next.js (`next`, `eslint-config-next`)
- ✅ Removed `react-router-dom` (Next.js handles routing)
- ✅ Added polyfill packages: `crypto-browserify`, `stream-browserify`, `util`, `process`

### 4. Component Updates
- ✅ Added `'use client'` directive to components using:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (window, document)
  - Client-side libraries (RainbowKit, Wagmi)
- ✅ Fixed window/document access to check `typeof window !== 'undefined'` for SSR compatibility
- ✅ Updated polyfills to work with Next.js

### 5. Removed Files
- ✅ Deleted `vite.config.js`
- ✅ Deleted `index.html`
- ✅ Deleted `src/main.jsx`
- ✅ Deleted `src/App.jsx`
- ✅ Deleted `src/vite-env.d.js`

## Important Notes

### Preline Script
The Preline script is referenced in `app/layout.jsx`. You may need to:
- Copy `node_modules/preline/dist/preline.js` to `public/preline.js` and update the path, OR
- Use a CDN version, OR
- Initialize Preline components differently in Next.js

### Asset Paths
- Static assets in `public/` folder are accessible via `/assets/...` paths
- Image imports using `/assets/...` should work correctly
- Relative paths like `./assets/...` may need adjustment

### Environment Variables
If you have environment variables, create a `.env.local` file in the root directory.

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

4. **Deploy to Vercel**
   - The project is now ready for Vercel deployment
   - Vercel will automatically detect Next.js and configure accordingly

## Testing Checklist

- [ ] Home page loads correctly
- [ ] Staking page accessible at `/staking`
- [ ] Wallet connections work (RainbowKit)
- [ ] All images and assets load properly
- [ ] CSS styles are applied correctly
- [ ] Client-side interactions work (modals, animations)
- [ ] Build completes without errors

## Potential Issues to Watch

1. **Preline Script Loading**: May need adjustment for production
2. **Image Optimization**: Next.js Image component can be used for better performance
3. **Client Components**: Some components may need additional `'use client'` directives if issues arise
4. **Polyfills**: Buffer/crypto polyfills are configured but may need testing with actual wallet connections

