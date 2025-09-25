document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('animated-background');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId = null;

    function setupCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // Fundo 'Universo' (Padrão)
    function setupUniverseBackground() {
        cancelAnimationFrame(animationFrameId);
        setupCanvas();
        particles = [];
        const particleCount = 70;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
        animateUniverse();
    }
    
    function animateUniverse() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0,0,width,height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.x = p.x < 0 ? width : 0;
            if (p.y < 0 || p.y > height) p.y = p.y < 0 ? height : 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animateUniverse);
    }

    // --- Código existente dos Sólidos 3D e Cursor ---
    const node3DContainers = document.querySelectorAll('.node-3d-container');
    const scenes = [];
    const renderers = [];
    const meshes = [];

    node3DContainers.forEach(container => {
        const section = container.closest('.section');
        const shapeType = section.dataset.shape;
        const color = new THREE.Color(section.dataset.color);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        let geometry;
        switch (shapeType) {
            case 'tetrahedron': geometry = new THREE.TetrahedronGeometry(1); break;
            case 'box': geometry = new THREE.BoxGeometry(1, 1, 1); break;
            case 'octahedron': geometry = new THREE.OctahedronGeometry(1); break;
            case 'dodecahedron': geometry = new THREE.DodecahedronGeometry(1); break;
            default: geometry = new THREE.SphereGeometry(1, 16, 16);
        }

        const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        scenes.push(scene);
        renderers.push(renderer);
        meshes.push(mesh);

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
            mesh.scale.set(scale, scale, scale);
            renderer.render(scene, camera);
        };
        animate();
    });

    window.addEventListener('resize', () => {
        node3DContainers.forEach((container, index) => {
            const renderer = renderers[index];
            const camera = scenes[index].children[0];
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
        });
    });

    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .section, .auth-input, .search-box-wrapper, .node-3d-container');

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const section = element.closest('.section');
            if (section) {
                const color = section.dataset.color;
                cursor.style.setProperty('--cursor-hover-color', color);
            }
            cursor.classList.add('furious-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('furious-hover');
        });
    });

    setupUniverseBackground();
});