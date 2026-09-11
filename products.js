// بيانات المشاريع والمنتجات (الاعتماد الكامل على مصفوفة images)
const products = [
    {
        id: "eagle-fortify-tool",
        title: "Eagle Fortify Tool - Local Password & Security Utility",
        category: "software",
        subCategory: "security",
        price: "$5",
        badge: "v3.1 Stable",
        images: [
            "images/EFT_GH_Background.jpg"
        ],
        shortDesc: "Local password utility, secure passphrase generator, and private encrypted vault running 100% offline.",
        fullDesc: "Eagle Fortify Tool is a robust local password utility designed for privacy and security. It generates strong passwords, checks password strength, creates secure passphrases and email identities, and secures your credentials inside a private encrypted vault. Everything runs locally on your device with zero cloud sync or backdoors.",
        features: [
            "Private encrypted vault secured with AES-256-GCM & PBKDF2",
            "Strong password and secure passphrase generator",
            "Command-line tool (eftool) and intuitive desktop app",
            "100% local execution with zero cloud uploads or telemetry"
        ],
        changelog: [
            "v3.1: Added AES-256-GCM vault support & CLI speed updates.",
            "v3.0: Redesigned dark-mode user interface."
        ],
        customContent: `
            <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 mb-8 font-mono text-xs relative">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-sm font-sans font-bold uppercase tracking-wider text-slate-400">Quick CLI Reference:</h3>
                    <button onclick="copyCodeSnippet(this)" class="bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-[11px] font-sans font-semibold px-3 py-1 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5">
                        <i class="fa-regular fa-copy"></i> Copy
                    </button>
                </div>
                <div class="code-block space-y-2 text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p class="text-cyan-400"># Generate a strong password</p>
                    <p>eftool generate --length 24</p>
                    <p class="text-cyan-400 mt-2"># Check password strength</p>
                    <p>eftool analyze "your-password"</p>
                </div>
            </div>
        `,
        downloadLink: "#",
    },
    {
        id: "aurora-saas",
        title: "Aurora - Premium SaaS Landing Page Template",
        category: "templates",
        subCategory: "web",
        price: "$29",
        badge: "Best Seller",
        images: [
            "images/AURORA SaaS Showcase.png"
        ],
        shortDesc: "Premium SaaS landing page template built with pure HTML, CSS and Vanilla JavaScript.",
        fullDesc: "Aurora is a modern, responsive SaaS landing page template built with clean HTML5, CSS3, and Vanilla JavaScript. Designed for startups, SaaS products, agencies, AI tools, and modern businesses looking for a clean and professional online presence. No frameworks, no build tools, no dependencies - just open the file and it works.",
        features: [
            "Glassmorphism design with mouse glow effect",
            "Dark / Light mode toggle with localStorage persistence",
            "Animated statistics counters on scroll",
            "Interactive monthly / yearly pricing toggle",
            "FAQ accordion and smooth scroll navigation",
            "Fully responsive with mobile navigation",
            "Clean, well-commented and easy to customize code",
            "Cross browser compatible (Chrome, Edge, Firefox, Safari, Opera)"
        ],
        changelog: [
            "v1.0: Initial release with Hero, Features, Dashboard, Pricing, FAQ and Footer sections."
        ],
        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript (ES6)"
        ],
        downloadLink: "#",
        demoLink: "https://aurora-saas.vercel.app/",
    },
        {
        id: "nexora-digital-agency-template",
        title: "NEXORA - Premium Digital Agency HTML Template",
        category: "templates",
        subCategory: "web",
        price: "$29",
        badge: "Best Seller",
        images: [
            "images/Nexora Digital Agency Showcase.png"
        ],
        shortDesc: "Premium landing page template for digital agencies built with pure HTML, CSS and vanilla JavaScript.",
        fullDesc: "NEXORA is a modern, premium landing page template designed for digital agencies, creative studios and tech startups. It features a glassmorphism design, smooth scroll-reveal animations, animated counters, pricing toggle, FAQ accordion, theme switcher, mouse glow effect and a fully responsive layout — all built with zero frameworks and zero dependencies.",
        features: [
            "Premium glassmorphism design with gradient effects",
            "Fully responsive with sticky navigation & mobile menu",
            "Animated counters, scroll reveal & mouse glow effects",
            "Dark / light theme switcher with localStorage",
            "Pricing toggle, FAQ accordion & back-to-top button",
            "Clean, commented vanilla JavaScript — easy to customize"
        ],
        changelog: [
            "v1.0: Initial release — full landing page with 10+ sections."
        ],
        customContent: `
            <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 mb-8 font-mono text-xs relative">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-sm font-sans font-bold uppercase tracking-wider text-slate-400">Quick Stack Reference:</h3>
                    <button onclick="copyCodeSnippet(this)" class="bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-[11px] font-sans font-semibold px-3 py-1 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5">
                        <i class="fa-regular fa-copy"></i> Copy
                    </button>
                </div>
                <div class="code-block space-y-2 text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p class="text-cyan-400"># Include template files</p>
                    <p>index.html</p>
                    <p>css/style.css + responsive.css + animations.css</p>
                    <p class="text-cyan-400 mt-2"># Add script before closing body</p>
                    <p>&lt;script src="js/script.js"&gt;&lt;/script&gt;</p>
                </div>
            </div>
        `,
        downloadLink: "#",
        demoLink: "https://your-demo-link.com",
    }
];
