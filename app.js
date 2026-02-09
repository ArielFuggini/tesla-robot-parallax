// ============================================================================
// Tesla Optimus - Parallax Scroll Demo
// Three.js Scene with Photorealistic Humanoid Robot
// ============================================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 100, 1000);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 3);

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    alpha: true,
    precision: 'highp'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// ============================================================================
// Lighting Setup - Photorealistic
// ============================================================================

// Main Key Light (left front)
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.camera.left = -15;
keyLight.shadow.camera.right = 15;
keyLight.shadow.camera.top = 15;
keyLight.shadow.camera.bottom = -15;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
scene.add(keyLight);

// Fill Light (right back)
const fillLight = new THREE.DirectionalLight(0xccddff, 0.6);
fillLight.position.set(-8, 4, -6);
scene.add(fillLight);

// Back Light (rim light)
const rimLight = new THREE.DirectionalLight(0xff6600, 0.5);
rimLight.position.set(0, 5, -10);
scene.add(rimLight);

// Ambient Light (subtle)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ============================================================================
// Robot Creation - Procedural Optimus Design
// ============================================================================

const robotGroup = new THREE.Group();
scene.add(robotGroup);

// Materials
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.0
});

const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.9,
    roughness: 0.15,
    envMapIntensity: 0.8
});

const plasticsBlackMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.3,
    roughness: 0.4
});

const jointsGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.95,
    roughness: 0.1
});

function createRobot() {
    const robot = new THREE.Group();
    
    // Head
    const headGroup = new THREE.Group();
    
    // Head face (rounded box)
    const headGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.8);
    const head = new THREE.Mesh(headGeometry, metalMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 2.8;
    
    // Round the corners
    const headGeom = new THREE.SphereGeometry(0.75, 16, 16);
    const headSmooth = new THREE.Mesh(headGeom, metalMaterial);
    headSmooth.castShadow = true;
    headSmooth.receiveShadow = true;
    headSmooth.position.y = 2.8;
    headSmooth.scale.set(1, 1.25, 0.6);
    
    // Eyes (optical sensors)
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 3.1, 0.5);
    leftEye.castShadow = true;
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 3.1, 0.5);
    rightEye.castShadow = true;
    
    headGroup.add(headSmooth, leftEye, rightEye);
    robot.add(headGroup);
    
    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.6, 16);
    const neck = new THREE.Mesh(neckGeometry, darkMetalMaterial);
    neck.castShadow = true;
    neck.receiveShadow = true;
    neck.position.y = 2.3;
    robot.add(neck);
    
    // Torso (main body)
    const torsoGeometry = new THREE.BoxGeometry(1.2, 2.0, 0.6);
    const torso = new THREE.Mesh(torsoGeometry, metalMaterial);
    torso.castShadow = true;
    torso.receiveShadow = true;
    torso.position.y = 0.8;
    robot.add(torso);
    
    // Chest panel detail
    const chestPanelGeometry = new THREE.BoxGeometry(1.0, 1.6, 0.1);
    const chestPanel = new THREE.Mesh(chestPanelGeometry, darkMetalMaterial);
    chestPanel.castShadow = true;
    chestPanel.position.y = 0.9;
    chestPanel.position.z = 0.35;
    robot.add(chestPanel);
    
    // Upper arm (left)
    const armUpperGeometry = new THREE.BoxGeometry(0.35, 1.4, 0.35);
    const leftUpperArm = new THREE.Mesh(armUpperGeometry, metalMaterial);
    leftUpperArm.castShadow = true;
    leftUpperArm.receiveShadow = true;
    leftUpperArm.position.set(-0.8, 1.8, 0);
    robot.add(leftUpperArm);
    
    // Upper arm (right)
    const rightUpperArm = new THREE.Mesh(armUpperGeometry, metalMaterial);
    rightUpperArm.castShadow = true;
    rightUpperArm.receiveShadow = true;
    rightUpperArm.position.set(0.8, 1.8, 0);
    robot.add(rightUpperArm);
    
    // Shoulder joint (left)
    const shoulderGeometry = new THREE.SphereGeometry(0.25, 12, 12);
    const leftShoulder = new THREE.Mesh(shoulderGeometry, jointsGoldMaterial);
    leftShoulder.castShadow = true;
    leftShoulder.position.set(-0.8, 2.2, 0);
    robot.add(leftShoulder);
    
    // Shoulder joint (right)
    const rightShoulder = new THREE.Mesh(shoulderGeometry, jointsGoldMaterial);
    rightShoulder.castShadow = true;
    rightShoulder.position.set(0.8, 2.2, 0);
    robot.add(rightShoulder);
    
    // Forearm (left)
    const armLowerGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const leftForearm = new THREE.Mesh(armLowerGeometry, metalMaterial);
    leftForearm.castShadow = true;
    leftForearm.receiveShadow = true;
    leftForearm.position.set(-0.8, 0.6, 0.2);
    robot.add(leftForearm);
    
    // Forearm (right)
    const rightForearm = new THREE.Mesh(armLowerGeometry, metalMaterial);
    rightForearm.castShadow = true;
    rightForearm.receiveShadow = true;
    rightForearm.position.set(0.8, 0.6, 0.2);
    robot.add(rightForearm);
    
    // Hand (left) - futuristic design
    const handGeometry = new THREE.BoxGeometry(0.28, 0.5, 0.28);
    const leftHand = new THREE.Mesh(handGeometry, plasticsBlackMaterial);
    leftHand.castShadow = true;
    leftHand.position.set(-0.8, 0, 0.3);
    robot.add(leftHand);
    
    // Hand (right)
    const rightHand = new THREE.Mesh(handGeometry, plasticsBlackMaterial);
    rightHand.castShadow = true;
    rightHand.position.set(0.8, 0, 0.3);
    robot.add(rightHand);
    
    // Elbow joints
    const elbowGeometry = new THREE.SphereGeometry(0.2, 12, 12);
    const leftElbow = new THREE.Mesh(elbowGeometry, jointsGoldMaterial);
    leftElbow.castShadow = true;
    leftElbow.position.set(-0.8, 1.2, 0.1);
    robot.add(leftElbow);
    
    const rightElbow = new THREE.Mesh(elbowGeometry, jointsGoldMaterial);
    rightElbow.castShadow = true;
    rightElbow.position.set(0.8, 1.2, 0.1);
    robot.add(rightElbow);
    
    // Hip section
    const hipGeometry = new THREE.BoxGeometry(1.3, 0.8, 0.6);
    const hip = new THREE.Mesh(hipGeometry, metalMaterial);
    hip.castShadow = true;
    hip.receiveShadow = true;
    hip.position.y = -0.7;
    robot.add(hip);
    
    // Upper leg (left)
    const legUpperGeometry = new THREE.BoxGeometry(0.4, 1.3, 0.4);
    const leftUpperLeg = new THREE.Mesh(legUpperGeometry, metalMaterial);
    leftUpperLeg.castShadow = true;
    leftUpperLeg.receiveShadow = true;
    leftUpperLeg.position.set(-0.4, -1.5, 0);
    robot.add(leftUpperLeg);
    
    // Upper leg (right)
    const rightUpperLeg = new THREE.Mesh(legUpperGeometry, metalMaterial);
    rightUpperLeg.castShadow = true;
    rightUpperLeg.receiveShadow = true;
    rightUpperLeg.position.set(0.4, -1.5, 0);
    robot.add(rightUpperLeg);
    
    // Knee joints
    const kneeGeometry = new THREE.SphereGeometry(0.22, 12, 12);
    const leftKnee = new THREE.Mesh(kneeGeometry, jointsGoldMaterial);
    leftKnee.castShadow = true;
    leftKnee.position.set(-0.4, -2.2, 0);
    robot.add(leftKnee);
    
    const rightKnee = new THREE.Mesh(kneeGeometry, jointsGoldMaterial);
    rightKnee.castShadow = true;
    rightKnee.position.set(0.4, -2.2, 0);
    robot.add(rightKnee);
    
    // Lower leg (left)
    const legLowerGeometry = new THREE.BoxGeometry(0.35, 1.2, 0.35);
    const leftLowerLeg = new THREE.Mesh(legLowerGeometry, metalMaterial);
    leftLowerLeg.castShadow = true;
    leftLowerLeg.receiveShadow = true;
    leftLowerLeg.position.set(-0.4, -2.9, 0);
    robot.add(leftLowerLeg);
    
    // Lower leg (right)
    const rightLowerLeg = new THREE.Mesh(legLowerGeometry, metalMaterial);
    rightLowerLeg.castShadow = true;
    rightLowerLeg.receiveShadow = true;
    rightLowerLeg.position.set(0.4, -2.9, 0);
    robot.add(rightLowerLeg);
    
    // Foot (left)
    const footGeometry = new THREE.BoxGeometry(0.45, 0.35, 0.55);
    const leftFoot = new THREE.Mesh(footGeometry, darkMetalMaterial);
    leftFoot.castShadow = true;
    leftFoot.receiveShadow = true;
    leftFoot.position.set(-0.4, -3.7, 0.1);
    robot.add(leftFoot);
    
    // Foot (right)
    const rightFoot = new THREE.Mesh(footGeometry, darkMetalMaterial);
    rightFoot.castShadow = true;
    rightFoot.receiveShadow = true;
    rightFoot.position.set(0.4, -3.7, 0.1);
    robot.add(rightFoot);
    
    return robot;
}

const robot = createRobot();
robotGroup.add(robot);

// ============================================================================
// Scroll Animation
// ============================================================================

const scrollState = {
    current: 0,
    target: 0,
    velocity: 0,
    friction: 0.1
};

const animationState = {
    zoom: 3,           // Camera distance
    rotation: 0,       // Robot rotation
    cameraX: 0,        // Camera offset
    cameraY: 0         // Camera height offset
};

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    scrollState.target = scrollPercent;
    
    // Hide scroll hint after some scrolling
    const hint = document.querySelector('.scroll-hint');
    if (scrollPercent > 0.05) {
        hint.classList.add('hidden');
    } else {
        hint.classList.remove('hidden');
    }
});

// ============================================================================
// Animation Loop
// ============================================================================

function animate() {
    requestAnimationFrame(animate);
    
    // Smooth scroll lerp
    scrollState.current += (scrollState.target - scrollState.current) * 0.15;
    
    // Animation mapping based on scroll
    // Phase 1: 0.0 - 0.4 (zoom in/out + slight rotation)
    // Phase 2: 0.4 - 1.0 (full rotation + move around)
    
    const progress = scrollState.current;
    
    if (progress < 0.4) {
        // Initial zoom - close up face
        animationState.zoom = THREE.MathUtils.lerp(3, 1.2, progress / 0.4);
        animationState.rotation = progress * 0.5; // Slow rotation
        animationState.cameraX = Math.sin(progress * Math.PI) * 0.3;
        animationState.cameraY = 0;
    } else {
        // Zoom out and rotate around
        const phase2Progress = (progress - 0.4) / 0.6;
        animationState.zoom = THREE.MathUtils.lerp(1.2, 8, phase2Progress);
        animationState.rotation = 0.5 + phase2Progress * Math.PI * 2; // Full rotation
        
        // Circle around the robot
        const angle = phase2Progress * Math.PI * 2;
        animationState.cameraX = Math.cos(angle) * 3;
        animationState.cameraY = Math.sin(phase2Progress * Math.PI) * 1;
    }
    
    // Apply camera position
    const cameraDistance = animationState.zoom;
    camera.position.x = animationState.cameraX;
    camera.position.y = 1 + animationState.cameraY;
    camera.position.z = cameraDistance;
    camera.lookAt(0, 1, 0);
    
    // Rotate robot smoothly
    robotGroup.rotation.y = animationState.rotation;
    
    // Slight bob/idle animation
    const time = Date.now() * 0.001;
    robot.position.y = Math.sin(time * 0.5) * 0.05;
    robot.position.x = Math.cos(time * 0.3) * 0.02;
    
    // Gentle arms movement
    const armRotation = Math.sin(time * 0.4) * 0.15;
    robot.children.forEach(child => {
        if (child.position && 
            (Math.abs(child.position.x) > 0.7 && child.position.y > 0)) {
            // This is an arm-related element
            const isLeftArm = child.position.x < 0;
            child.rotation.z = armRotation * (isLeftArm ? 1 : -1);
        }
    });
    
    renderer.render(scene, camera);
}

// ============================================================================
// Window Resize
// ============================================================================

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Start animation
animate();
