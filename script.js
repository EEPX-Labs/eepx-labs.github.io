// الأسئلة الشائعة (FAQ Data)
const faqs = [
    {
        q: "How do I download my software or templates after purchase?",
        a: "Once your payment is confirmed, you will instantly receive a secure download link via email and direct access on your dashboard."
    },
    {
        q: "Are updates included with my purchase?",
        a: "Yes! All products come with lifetime minor updates and 1 year of major version updates completely free of charge."
    },
    {
        q: "Can I use these templates for commercial client projects?",
        a: "Definitely. Our commercial and enterprise licenses allow you to build unlimited projects for yourself or your clients."
    }
];

// دالة عرض المنتجات في الجريد
function renderProducts(itemsToDisplay) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (itemsToDisplay.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-slate-500">
                <i class="fa-solid fa-box-open text-4xl mb-3"></i>
                <p class="text-base font-semibold">No products found matching your search.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = itemsToDisplay.map(product => `
        <div onclick="window.location.href='product.html?id=${product.id}'" class="product-card group cursor-pointer">
            <div class="card-image-container h-48 bg-slate-950/55 relative flex items-center justify-center border-b border-slate-800/60">
                <span class="absolute top-3 right-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                    ${product.badge}
                </span>
                <img src="${product.image}" alt="${product.title}" class="max-h-32 w-auto object-contain drop-shadow-lg" onerror="this.src='logo_darkmode.png'">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs uppercase font-bold tracking-wider text-slate-500">${product.subCategory}</span>
                    <span class="text-cyan-400 font-extrabold text-lg">${product.price}</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">${product.title}</h3>
                <p class="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">${product.shortDesc}</p>
                <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-cyan-400 font-bold text-xs">
                    <span class="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Explore Project & Pricing <i class="fa-solid fa-arrow-right"></i>
                    </span>
                    <span class="text-slate-500 text-[11px] font-normal">Details</span>
                </div>
            </div>
        </div>
    `).join('');
}

// دالة عرض الـ FAQ
function renderFaqs() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = faqs.map((faq, index) => `
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm transition-all">
            <button onclick="toggleFaq(${index})" class="w-full px-6 py-4 text-left font-bold text-white flex justify-between items-center hover:text-cyan-400 transition-colors">
                <span>${faq.q}</span>
                <i id="faq-icon-${index}" class="fa-solid fa-chevron-down text-sm text-slate-500 transition-transform"></i>
            </button>
            <div id="faq-content-${index}" class="hidden px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-800/40 pt-3">
                ${faq.a}
            </div>
        </div>
    `).join('');
}

function toggleFaq(index) {
    const content = document.getElementById(`faq-content-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// تهيئة الأحداث والتشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // التأكد من تحميل البيانات وإرسالها للدوال
    if (typeof products !== 'undefined') {
        renderProducts(products);
    }
    renderFaqs();

    // فلترة المنتجات حسب التصنيف
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-cyan-500', 'text-white', 'shadow-md');
                b.classList.add('bg-slate-950', 'text-slate-300', 'border', 'border-slate-800');
            });
            btn.classList.add('active', 'bg-cyan-500', 'text-white', 'shadow-md');
            btn.classList.remove('bg-slate-950', 'text-slate-300', 'border', 'border-slate-800');

            const filterValue = btn.getAttribute('data-filter');
            if (filterValue === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filterValue || p.subCategory === filterValue);
                renderProducts(filtered);
            }
        });
    });

    // البحث اللحظي
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.shortDesc.toLowerCase().includes(query) || 
                p.subCategory.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }

    // زر العودة للأعلى
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});