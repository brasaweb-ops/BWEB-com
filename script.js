// Remova o script anterior e substitua por este

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    const sections = document.querySelectorAll('.section .circle');
    const core = document.querySelector('.brasa-core-singleton');

    let width, height;
    let connections = [];

    const resizeCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        findConnections();
    };

    const findConnections = () => {
        const coreRect = core.getBoundingClientRect();
        const coreCenter = {
            x: coreRect.left + coreRect.width / 2,
            y: coreRect.top + coreRect.height / 2
        };

        connections = Array.from(sections).map(section => {
            const rect = section.getBoundingClientRect();
            return {
                start: coreCenter,
                end: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                },
                color: section.dataset.color || 'var(--brasa-pink)',
                active: false
            };
        });
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);

        connections.forEach(conn => {
            ctx.beginPath();
            ctx.moveTo(conn.start.x, conn.start.y);
            ctx.lineTo(conn.end.x, conn.end.y);
            
            ctx.strokeStyle = conn.active ? `rgba(0, 255, 255, 1)` : conn.color;
            ctx.lineWidth = conn.active ? 2 : 1;
            ctx.shadowColor = conn.active ? 'rgba(0, 255, 255, 0.8)' : conn.color;
            ctx.shadowBlur = conn.active ? 15 : 5;
            ctx.stroke();

            // Adiciona um ponto pulsante na ponta da linha
            if (conn.active) {
                ctx.beginPath();
                ctx.arc(conn.end.x, conn.end.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 255, 1)`;
                ctx.fill();
            }
        });
        
        ctx.shadowBlur = 0; // Reseta a sombra
    };

    const loop = () => {
        draw();
        requestAnimationFrame(loop);
    };

    sections.forEach(section => {
        const index = Array.from(sections).indexOf(section);
        section.addEventListener('mouseenter', () => {
            connections[index].active = true;
        });
        section.addEventListener('mouseleave', () => {
            connections[index].active = false;
        });
    });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', findConnections); // Atualiza posições em caso de scroll (para responsividade)

    resizeCanvas();
    loop();
});

// Adicione este código para a funcionalidade de busca

document.addEventListener('DOMContentLoaded', () => {
    const searchWrapper = document.querySelector('.search-box-wrapper');
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    searchIcon.addEventListener('click', () => {
        searchWrapper.classList.toggle('active');
        if (searchWrapper.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('blur', () => {
        if (!searchInput.value.trim()) {
            searchWrapper.classList.remove('active');
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animated-background');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = 70; // Ajuste este número para mais ou menos partículas

    function setupCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
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
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Desenha as partículas
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Faz as partículas "saírem" por um lado e "entrarem" pelo outro
            if (p.x < 0 || p.x > width) p.x = p.x < 0 ? width : 0;
            if (p.y < 0 || p.y > height) p.y = p.y < 0 ? height : 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        // Desenha as linhas de conexão
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                if (distance < 100) { // Distância máxima para conectar
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', setupCanvas);
    setupCanvas();
    animate();
});

// Preserve o código do fundo animado #animated-background, ele é separado.

// --- Início do código para as formas 3D dos nodos ---

document.addEventListener('DOMContentLoaded', () => {
    // Código existente do fundo animado #animated-background (NÃO MEXER AQUI)
    const canvasBg = document.getElementById('animated-background');
    const ctxBg = canvasBg.getContext('2d');
    let widthBg, heightBg;
    let particlesBg = [];
    const particleCountBg = 70; 

    function setupCanvasBg() {
        widthBg = canvasBg.width = window.innerWidth;
        heightBg = canvasBg.height = window.innerHeight;
        particlesBg = [];
        for (let i = 0; i < particleCountBg; i++) {
            particlesBg.push({
                x: Math.random() * widthBg,
                y: Math.random() * heightBg,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    function drawBg() {
        ctxBg.clearRect(0, 0, widthBg, heightBg);
        particlesBg.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > widthBg) p.x = p.x < 0 ? widthBg : 0;
            if (p.y < 0 || p.y > heightBg) p.y = p.y < 0 ? heightBg : 0;
            ctxBg.beginPath();
            ctxBg.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctxBg.fillStyle = p.color;
            ctxBg.fill();
        });

        for (let i = 0; i < particlesBg.length; i++) {
            for (let j = i + 1; j < particlesBg.length; j++) {
                const p1 = particlesBg[i];
                const p2 = particlesBg[j];
                const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                if (distance < 100) {
                    ctxBg.beginPath();
                    ctxBg.moveTo(p1.x, p1.y);
                    ctxBg.lineTo(p2.x, p2.y);
                    ctxBg.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctxBg.lineWidth = 0.5;
                    ctxBg.stroke();
                }
            }
        }
    }

    function animateBg() {
        drawBg();
        requestAnimationFrame(animateBg);
    }

    window.addEventListener('resize', setupCanvasBg);
    setupCanvasBg();
    animateBg();
    // --- Fim do código do fundo animado ---


    // --- Início do código para as formas 3D dos nodos ---

    const node3DContainers = document.querySelectorAll('.node-3d-container');
    const scenes = [];
    const renderers = [];
    const meshes = [];

    node3DContainers.forEach(container => {
        const section = container.closest('.section');
        const shapeType = section.dataset.shape;
        const color = new THREE.Color(section.dataset.color || 0xff0077);

        // Scene
        const scene = new THREE.Scene();
        scenes.push(scene);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2; // Ajuste para ver a forma

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        renderers.push(renderer);

        // Geometry
        let geometry;
        switch (shapeType) {
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(1);
                break;
            case 'box': // Cubo (Hexaedro)
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(1);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(1);
                break;
            default:
                geometry = new THREE.SphereGeometry(1, 16, 16); // Fallback
        }

        // Material (para o efeito neon/brilhante)
        const material = new THREE.MeshBasicMaterial({ 
            color: color, 
            wireframe: true, // Mostra apenas as arestas
            transparent: true,
            opacity: 0.7 
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshes.push(mesh); // Guardamos a mesh para animação

        // Luz (opcional para MeshBasicMaterial, mas bom para outros materiais)
        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Animação de rotação e pulsação
        const animate = () => {
            requestAnimationFrame(animate);

            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;

            // Pulsação de escala
            const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05; // Pulsa entre 0.95 e 1.05
            mesh.scale.set(scale, scale, scale);
            
            renderer.render(scene, camera);
        };
        animate();

        // Listener para hover na section pai
        section.addEventListener('mouseenter', () => {
            // Aumenta o brilho e a escala no hover
            mesh.material.color.set(0x00ffff); // Mudar para cor de hover
            mesh.material.opacity = 1;
            mesh.scale.set(1.1 * scale, 1.1 * scale, 1.1 * scale); // Aumenta um pouco mais no hover
        });

        section.addEventListener('mouseleave', () => {
            // Retorna ao estado normal
            mesh.material.color.set(color); // Retorna à cor original
            mesh.material.opacity = 0.7;
            mesh.scale.set(scale, scale, scale); // Retorna à escala de pulsação normal
        });
    });

    // Ajuste de renderização ao redimensionar a janela
    window.addEventListener('resize', () => {
        node3DContainers.forEach((container, index) => {
            const renderer = renderers[index];
            const camera = scenes[index].children[0]; // Assume que a câmera é o primeiro filho da cena
            
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
        });
    });

    // --- Fim do código para as formas 3D dos nodos ---
});

document.addEventListener('DOMContentLoaded', () => {
    // Código existente do fundo animado #animated-background (NÃO MEXER AQUI)
    // ...

    // Código para as formas 3D dos nodos (NÃO MEXER AQUI)
    // ...

    // ---- Início do código para o cursor customizado ----

    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .circle, .auth-input, .control-select, .search-icon');

    // Faz o cursor seguir o mouse
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Adiciona o efeito 'furioso' nos elementos interativos
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('furious-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('furious-hover');
        });
    });

    // --- Fim do código para o cursor customizado ----

    // O restante do seu código JavaScript
    // ...
});