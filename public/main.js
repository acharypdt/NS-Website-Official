
class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        nav {
            background: rgba(13, 2, 26, 0.5);
            backdrop-filter: blur(12px);
            padding: 1rem 2rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 195, 0, 0.2);
        }
        nav .logo a {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            color: #ffc300; /* radiant-marigold */
            text-decoration: none;
            text-shadow: 0 0 10px #ffc300;
        }
        nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        nav ul li {
            margin-left: 2rem;
        }
        nav ul li a {
            color: #ff9933; /* dharmik-saffron */
            text-decoration: none;
            font-weight: 600;
            font-family: 'Rajdhani', sans-serif;
            transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        nav ul li a:hover {
            color: #f0f8ff; /* star-white */
            text-shadow: 0 0 10px #8a2be2; /* majestic-purple */
        }
      </style>
      <nav>
        <div class="logo"><a href="index.html">NavaSanganakah</a></div>
        <ul>
          <li><a href="services.html">Services</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);

document.addEventListener('DOMContentLoaded', () => {
    // Cursor dust trail effect
    const cursorDust = document.getElementById('cursor-dust');
    if (cursorDust) {
        document.addEventListener('mousemove', (e) => {
            cursorDust.style.left = e.clientX + 'px';
            cursorDust.style.top = e.clientY + 'px';
        });
    }

    // Intersection observer for scroll animations
    const animatedElements = document.querySelectorAll('.home-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Dynamically update the copyright year
    const copyrightSpan = document.getElementById('copyright-year');
    if (copyrightSpan) {
        copyrightSpan.textContent = new Date().getFullYear();
    }

    // Three.js Sri Yantra Animation
    initSriYantraAnimation();
});

function initSriYantraAnimation() {
    const canvas = document.getElementById('sri-yantra-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const group = new THREE.Group();
    scene.add(group);

    const saffronMaterial = new THREE.LineBasicMaterial({ color: 0xff9933, linewidth: 2, transparent: true, opacity: 0.8 });
    const purpleMaterial = new THREE.LineBasicMaterial({ color: 0x8a2be2, linewidth: 2, transparent: true, opacity: 0.8 });

    // Simplified representation of Sri Yantra triangles
    const upwardTriangles = new THREE.Group();
    const downwardTriangles = new THREE.Group();

    const heights = [4, 3, 2, 1];
    heights.forEach((h, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, h, 0),
            new THREE.Vector3(-h, -h/2, 0),
            new THREE.Vector3(h, -h/2, 0),
        ]);
        const line = new THREE.LineLoop(geometry, purpleMaterial);
        upwardTriangles.add(line);
    });

    const downHeights = [3.5, 2.5, 1.5, 0.5];
     downHeights.forEach((h, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, -h, 0),
            new THREE.Vector3(h, h/2, 0),
            new THREE.Vector3(-h, h/2, 0),
        ]);
        const line = new THREE.LineLoop(geometry, saffronMaterial);
        downwardTriangles.add(line);
    });


    group.add(upwardTriangles);
    group.add(downwardTriangles);

    // Bindu (central point)
    const binduGeometry = new THREE.CircleGeometry(0.2, 32);
    const binduMaterial = new THREE.MeshBasicMaterial({ color: 0xffc300, emissive: 0xffc300 });
    const bindu = new THREE.Mesh(binduGeometry, binduMaterial);
    group.add(bindu);

    // Outer circles
    const circle1 = new THREE.LineLoop(new THREE.CircleGeometry(5, 128), saffronMaterial);
    circle1.geometry.vertices.shift();
    group.add(circle1);
    const circle2 = new THREE.LineLoop(new THREE.CircleGeometry(5.5, 128), purpleMaterial);
    circle2.geometry.vertices.shift();
    group.add(circle2);

    // Background stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() * -200) - 20;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xf0f8ff, size: 0.1, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        upwardTriangles.rotation.y = elapsedTime * 0.1;
        downwardTriangles.rotation.y = -elapsedTime * 0.1;
        group.rotation.z += 0.001;
        stars.rotation.y += 0.0002;

        // Pulsing bindu
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.3;
        bindu.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
