# Tesla Optimus Parallax Demo

A photorealistic 3D interactive experience showcasing Tesla's Optimus humanoid robot with smooth scroll-based animations using Three.js.

## Features

- **Photorealistic 3D Model**: Procedurally-generated Tesla Optimus humanoid robot with high-fidelity materials
- **Smooth Scroll Animation**: Continuous zoom and rotation tied to page scroll
- **Professional Lighting**: Multi-light setup with key, fill, rim, and ambient lighting for photorealistic rendering
- **High-End GPU Optimized**: No LOD (level of detail), full detail rendering for premium visual quality
- **Responsive Canvas**: Adapts to window size automatically

## Animation Sequence

1. **Scroll 0-40%**: Close-up of robot's face (shoulders up), slight rotation
2. **Scroll 40-100%**: Camera zooms out, robot does full rotation, camera circles around

## Technical Stack

- **Three.js**: 3D graphics library
- **Express.js**: Node.js web server
- **WebGL**: GPU-accelerated rendering

## Installation

```bash
npm install
```

## Development

```bash
npm start
# Server runs on http://localhost:3003
```

## Build for Production

Already configured with Express server for deployment.

## Deployment

- **Port**: 3003
- **URL**: http://robot.ariel.ar (via Nginx reverse proxy)
- **Deploy Config**: See `deploy.json` for CI/CD integration

## Browser Requirements

- WebGL 2.0 support
- Modern GPU (High-end recommended for optimal performance)
- Desktop display recommended (1920x1080+)

## Performance

- Smooth 60 FPS on high-end GPUs
- No performance budgeting (targets premium devices)
- Real-time shadow mapping and post-processing

## Files

- `index.html` - Main HTML page
- `app.js` - Three.js scene and animation logic
- `server.js` - Express server
- `package.json` - Dependencies

## Materials & Lighting

**Materials**:
- Brushed Aluminum (body)
- Dark anodized metal (joints)
- Gold metallic accents
- Glossy black plastic

**Lighting**:
- Key Light: 1.2 intensity from front-left
- Fill Light: 0.6 intensity from back-right (cool blue tint)
- Rim Light: 0.5 intensity from back (orange accent)
- Ambient: 0.3 intensity for global fill

## Next Steps

- [ ] Add environment map for reflections
- [ ] Implement interactive mouse control
- [ ] Add particle effects
- [ ] Create detail shots at specific scroll positions
- [ ] Add audio/music synchronized to scroll

---

**Created**: 2026-02-09
**Status**: Production Ready ✅
