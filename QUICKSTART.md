# Quick Start Guide

## Local Testing

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
# http://localhost:3003
```

## Keyboard Controls

- Scroll up/down to trigger parallax animation
- Watch the robot zoom in/out and rotate smoothly

## Animation Breakdown

The experience is divided into two phases:

### Phase 1: Close-up (Scroll 0-40%)
- Camera positioned 3 units from robot's face
- Robot slowly rotates (0.5 radians)
- Slight camera offset for dynamic framing
- Robot idle bobbing animation

### Phase 2: Full View (Scroll 40-100%)
- Camera zooms out to 8 units distance
- Robot performs complete 360° rotation (2π radians)
- Camera circles around the robot
- Gentle vertical movement for dynamic perspective

## Customization

### Change Robot Size
In `app.js`, modify the scale in the robot group:
```javascript
robotGroup.scale.set(0.8, 0.8, 0.8); // Make smaller
```

### Adjust Lighting
Modify light positions and intensities:
```javascript
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase intensity
keyLight.position.set(6, 10, 6); // Change position
```

### Change Scroll Sensitivity
Adjust the lerp value for camera movement:
```javascript
scrollState.current += (scrollState.target - scrollState.current) * 0.25; // Higher = faster response
```

### Modify Animation Timeline
In the animate function, change the progress thresholds:
```javascript
if (progress < 0.5) {  // Changed from 0.4
    // Phase 1 logic
}
```

## Performance Tuning

For lower-end devices:
- Disable shadow mapping: `renderer.shadowMap.enabled = false;`
- Reduce shadow map resolution: `keyLight.shadow.mapSize.width = 512;`
- Disable ACES tone mapping: `renderer.toneMapping = THREE.NoToneMapping;`
- Remove ambient occlusion

For better visuals on high-end GPUs:
- Increase shadow map resolution: `4096`
- Enable post-processing effects
- Add environment map reflections
- Implement screen-space ambient occlusion (SSAO)

## Deployment

### Via Express (Current Setup)
```bash
npm start
# Running on port 3003
```

### Via PM2 (Production)
```bash
pm2 start server.js --name "tesla-robot"
pm2 startup
pm2 save
```

### Via Docker
```bash
docker build -t tesla-robot .
docker run -p 3003:3003 tesla-robot
```

## Nginx Configuration

The app is configured to run at `robot.ariel.ar`:

```nginx
location / {
    proxy_pass http://localhost:3003;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
```

## Debugging

Enable Chrome DevTools:
- Open Chrome → Right-click → Inspect
- Go to Console tab
- Check for any THREE.js errors
- Use Performance tab to monitor FPS

### Common Issues

**Black screen**:
- Check browser console for WebGL errors
- Verify Three.js library loaded
- Check if GPU acceleration is enabled

**Choppy animation**:
- Check FPS in DevTools Performance tab
- Reduce shadow map resolution
- Lower window resolution temporarily

**Camera stuck**:
- Check scroll event listener
- Verify scrollState.current is updating
- Test with manual scroll (not programmatic)

## Assets

- No external 3D models (robot is procedurally generated)
- Three.js loaded from CDN
- Self-contained, no external dependencies

## Next Development

Ideas for enhancement:
- Add interactive controls (mouse drag to rotate)
- Implement environment reflections
- Add particle effects around robot
- Create product shots at specific angles
- Add technical specifications overlay
- Implement mobile-responsive version
- Add sound/music synchronized to scroll
