// ==========================================
// 1. PROJECTS DATABASE (Easy to Edit/Add)
// ==========================================
const projectsData = [
    {
        id: 1,
        title: "Basira AI Engine",
        category: "desktop",
        badge: "Featured",
        price: "$49",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        description: "Advanced intelligence desktop application for real-time document analysis and OCR parsing.",
        tags: ["Python", "FastAPI", "OCR"],
        buyUrl: "https://gumroad.com", // ضع رابط الشراء هنا
        demoUrl: "https://github.com/eepx-labs" // ضع رابط التفاصيل أو جيت هاب هنا
    },
    {
        id: 2,
        title: "Sentra G5 Suite",
        category: "web",
        badge: "Popular",
        price: "$29",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        description: "Modern dashboard and management interface designed for high-performance server metrics.",
        tags: ["Tailwind", "JavaScript", "Analytics"],
        buyUrl: "https://lemonsqueezy.com",
        demoUrl: "https://github.com/eepx-labs"
    },
    {
        id: 3,
        title: "Zulenar Core Utility",
        category: "free",
        badge: "Open Source",
        price: "Free",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        description: "Lightweight command-line utility for automated file transformation and text formatting.",
        tags: ["Python", "CLI", "Automation"],
        buyUrl: "https://github.com/eepx-labs",
        demoUrl: "https://github.com/eepx-labs"
    }
];

// ==========================================
// 2. RENDER PRODUCTS DYNAMICALLY
// ==========================================
function renderProducts(filter = "all") {
    const container = document.getElementById("products-grid");
    container.innerHTML = "";

    const filteredProjects = filter === "all" 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        const isFree = project.price.toLowerCase() === "free";
        
        const cardHtml = `
            <div class="product-card">
                <div class="card-image-container h-48 w-full bg-slate-900">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                        ${project.badge}
                    </span>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="text-xl font-bold text-white">${project.title}</h3>
                            <span class="text-lg font-extrabold ${isFree ? 'text-emerald-400' : 'text-cyan-400'}">${project.price}</span>
                        </div>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">${project.description}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-6">
                            ${project.tags.map(tag => `<span class="bg-slate-800 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-700">${tag}</span>`).join('')}
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-800/60">
                        <a href="${project.buyUrl}" target="_blank" class="flex-1 ${isFree ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-cyan-500 hover:bg-cyan-400'} text-slate-950 font-bold py-2.5 text-center text-sm rounded-xl transition-all">
                            ${isFree ? '<i class="fa-solid fa-download mr-1"></i> Get Free' : '<i class="fa-solid fa-cart-shopping mr-1"></i> Buy Now'}
                        </a>
                        <a href="${project.demoUrl}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl transition-all text-sm border border-slate-700" title="View Source / Demo">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHtml);
    });
}

// ==========================================
// 3. FILTER TABS HANDLER
// ==========================================
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        const filter = e.target.getAttribute("data-filter");
        renderProducts(filter);
    });
});

// Initial Render
renderProducts();

// ==========================================
// 4. ANIMATED BACKGROUND CANVAS (PARTICLES)
// ==========================================
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 45;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();