# Deployment Instructions

## Current Status

✅ **Live with BoomBox GLB Model**
- URL: https://robot.ariel.ar
- Status: Production ready
- Model: Khronos BoomBox (11MB, high-quality PBR)
- Scroll: Smooth parallax animation (60 FPS target)

## Access

**Direct:** `https://robot.ariel.ar` (HTTPS)
**Local:** `http://localhost:3003`

## How It Works

1. **App starts on port 3003**
2. **Nginx proxies** from robot.ariel.ar:443 → localhost:3003
3. **BoomBox GLB loads** via `/boombox.glb`
4. **Scroll triggers** parallax animation via JavaScript
5. **Three.js renders** at 60 FPS with shadows

## Development

```bash
npm install
npm start
# Open http://localhost:3003
```

## Deployment

App is already deployed. To update:

```bash
git add .
git commit -m "your message"
git push origin master
```

## Files

- `index.html` - Page structure and styling
- `app.js` - Three.js scene, parallax logic (272 lines, production code)
- `server.js` - Express server with static file serving
- `boombox.glb` - 3D model (11MB)

## Architecture

- **Frontend:** Three.js + WebGL
- **Server:** Node.js + Express
- **Proxy:** Nginx (reverse proxy + SSL)
- **Model:** glTF binary format (GLB)

## Next Steps

- Adjust scroll sensitivity in app.js CONFIG.SCROLL_LERP_FACTOR
- Change lighting colors in CONFIG section
- Add more models or swap BoomBox
- Implement touch controls for mobile
