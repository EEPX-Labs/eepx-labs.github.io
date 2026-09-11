// بيانات المشاريع والمنتجات (يمكنك التعديل والإضافة هنا بكل سهولة)
const products = [
    {
        id: "eagle-fortify-tool",
        title: "Eagle Fortify Tool - Local Password & Security Utility",
        category: "software",
        subCategory: "security",
        price: "$5",
        badge: "v3.1",
        images: [
            "images/EFT_GH_Background.jpg",
            "images/EFT_GH_Preview_1.PNG",
            "images/EFT_GH_Preview_2.PNG",
            "images/EFT_GH_Preview_3.PNG",
            "images/EFT_GH_Preview_4.PNG"
        ],
        shortDesc: "Local password utility, secure passphrase generator, and private encrypted vault running 100% offline.",
        fullDesc: "Eagle Fortify Tool is a robust local password utility designed for privacy and security. It generates strong passwords, checks password strength, creates secure passphrases and email identities, and secures your credentials inside a private encrypted vault. Everything runs locally on your device with zero cloud sync or backdoors.",
        features: [
            "Private encrypted vault secured with AES-256-GCM & PBKDF2",
            "Strong password and secure passphrase generator",
            "Command-line tool (eftool) and intuitive desktop app",
            "100% local execution with zero cloud uploads or telemetry"
        ],
        customContent: `
            <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 mb-8 font-mono text-xs">
                <h3 class="text-sm font-sans font-bold uppercase tracking-wider text-slate-400 mb-3">Quick CLI Reference:</h3>
                <div class="space-y-2 text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p class="text-cyan-400"># Generate a strong password</p>
                    <p>eftool generate --length 24</p>
                    <p class="text-cyan-400 mt-2"># Check password strength</p>
                    <p>eftool analyze "your-password"</p>
                </div>
            </div>
        `,
        downloadLink: "#"
    },
    {
        id: "basira-desktop",
        title: "Basira - Personal Desktop Assistant",
        category: "software",
        subCategory: "desktop",
        price: "$29",
        badge: "New",
        image: "product2.png",
        shortDesc: "All-in-one personal productivity and workflow management tool for desktop.",
        fullDesc: "Basira streamlines your daily tasks, manages notes, organizes files, and tracks productivity metrics right from your desktop with lightning-fast performance.",
        features: ["Smart task manager", "Local database storage", "Customizable widgets", "Dark/Light modes"],
        downloadLink: "#"
    },
    {
        id: "zulenar-saas",
        title: "Zulenar - SaaS Web Template",
        category: "templates",
        subCategory: "web",
        price: "$19",
        badge: "Best Seller",
        image: "product3.png",
        shortDesc: "High-performance SaaS landing page template built with Tailwind CSS.",
        fullDesc: "Zulenar MVP template offers clean architecture, responsive layouts, animated components, and pre-built sections designed specifically for modern tech startups.",
        features: ["Fully responsive", "Tailwind CSS components", "Fast loading speed", "Easy customization"],
        downloadLink: "#"
    },
    {
        id: "stellar-tools",
        title: "Stellar AI Studio Pro (Free Utility)",
        category: "software",
        subCategory: "free-tools",
        price: "Free",
        badge: "Freebie",
        image: "product4.png",
        shortDesc: "Free local AI assistant studio connector with streaming SSE responses.",
        fullDesc: "A lightweight free developer utility designed to test local LLM endpoints, manage prompts, and handle real-time streaming interfaces seamlessly.",
        features: ["Local LLM support", "SSE streaming", "Open-source codebase", "Zero configuration"],
        downloadLink: "#"
    }
];
