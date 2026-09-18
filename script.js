/* =========================================================
   EEPX LABS — Interactions
   ========================================================= */

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

const state = {
    filter: "all",
    query: "",
    slide: 0,
    autoplay: true,
    autoplayTimer: null
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
}

function getFilteredProducts() {
    const query = state.query.toLowerCase();

    return products.filter(product => {
        const matchesFilter =
            state.filter === "all" ||
            product.category === state.filter ||
            product.subCategory === state.filter;

        const haystack = [
            product.title,
            product.shortDesc,
            product.fullDesc,
            product.category,
            product.subCategory,
            ...(product.technologies || [])
        ].join(" ").toLowerCase();

        return matchesFilter && (!query || haystack.includes(query));
    });
}

function renderProducts(itemsToDisplay) {
    const grid = $("#products-grid");
    const resultCount = $("#results-count");
    if (!grid) return;

    if (resultCount) {
        resultCount.textContent = `${itemsToDisplay.length} ${itemsToDisplay.length === 1 ? "product" : "products"}`;
    }

    if (!itemsToDisplay.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <img src="assets/radar.svg" alt="">
                <p>No products found matching your search or filter.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = itemsToDisplay.map(product => {
        const mainImage = product.images?.[0] || product.image || "logo_darkmode.png";

        return `
            <article class="product-card reveal visible" data-product-id="${escapeHtml(product.id)}" tabindex="0">
                <div class="card-image-container">
                    <span class="product-badge">${escapeHtml(product.badge || "Digital Product")}</span>
                    <img src="${escapeHtml(mainImage)}"
                         alt="${escapeHtml(product.title)}"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='logo_darkmode.png';this.classList.add('card-fallback');">
                </div>

                <div class="product-content">
                    <div class="product-top">
                        <span class="product-category">${escapeHtml(product.subCategory || product.category)}</span>
                        <span class="product-price">${escapeHtml(product.price || "—")}</span>
                    </div>

                    <h3>${escapeHtml(product.title)}</h3>
                    <p>${escapeHtml(product.shortDesc || "")}</p>

                    <div class="product-footer">
                        <span class="details-link">View Details <i class="fa-solid fa-arrow-right"></i></span>
                        ${product.demoLink ? `
                            <a class="demo-link" href="${escapeHtml(product.demoLink)}" target="_blank" rel="noopener" data-stop-card>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                            </a>
                        ` : ""}
                    </div>
                </div>
            </article>
        `;
    }).join("");

    $$(".product-card").forEach(card => {
        card.addEventListener("click", event => {
            if (event.target.closest("[data-stop-card]")) return;
            const id = card.dataset.productId;
            window.location.href = `product.html?id=${encodeURIComponent(id)}`;
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.location.href = `product.html?id=${encodeURIComponent(card.dataset.productId)}`;
            }
        });
    });
}

function updateFilters() {
    $$(".filter-btn").forEach(button => {
        const active = button.dataset.filter === state.filter;
        button.classList.toggle("active", active);
    });
    renderProducts(getFilteredProducts());
}

function renderFaqs() {
    const container = $("#faq-container");
    if (!container) return;

    container.innerHTML = faqs.map((faq, index) => `
        <article class="faq-item ${index === 0 ? "open" : ""}">
            <button class="faq-question" type="button" aria-expanded="${index === 0}" data-faq="${index}">
                <span>${escapeHtml(faq.q)}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            <div class="faq-answer">${escapeHtml(faq.a)}</div>
        </article>
    `).join("");

    $$(".faq-question", container).forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            const isOpen = item.classList.contains("open");

            $$(".faq-item", container).forEach(other => {
                other.classList.remove("open");
                $(".faq-question", other)?.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
}

function renderShowcase() {
    const track = $("#showcase-track");
    const dots = $("#slider-dots");
    const slider = $("#showcase-slider");
    if (!track || !dots || !slider || !products?.length) return;

    const showcaseProducts = products.slice(0, Math.min(products.length, 5));

    track.innerHTML = showcaseProducts.map((product, index) => {
        const image = product.images?.[0] || product.image || "logo_darkmode.png";
        return `
            <article class="showcase-slide">
                <div>
                    <span class="slide-index">PRODUCT / ${String(index + 1).padStart(2, "0")}</span>
                    <span class="slide-category">${escapeHtml(product.category)} · ${escapeHtml(product.subCategory)}</span>
                    <h3>${escapeHtml(product.title)}</h3>
                    <p>${escapeHtml(product.shortDesc || "")}</p>
                    <div class="slide-actions">
                        <a href="product.html?id=${encodeURIComponent(product.id)}" class="primary-button">
                            View Product <i class="fa-solid fa-arrow-right"></i>
                        </a>
                        ${product.demoLink ? `
                            <a href="${escapeHtml(product.demoLink)}" target="_blank" rel="noopener" class="secondary-button">
                                Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        ` : ""}
                    </div>
                </div>
                <div class="slide-visual">
                    <span class="slide-price">${escapeHtml(product.price || "Digital")}</span>
                    <img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}"
                         onerror="this.onerror=null;this.src='logo_darkmode.png';">
                </div>
            </article>
        `;
    }).join("");

    dots.innerHTML = showcaseProducts.map((_, index) =>
        `<button class="slider-dot ${index === 0 ? "active" : ""}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>`
    ).join("");

    $$(".slider-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            goToSlide(Number(dot.dataset.slide));
            restartAutoplay();
        });
    });

    updateSlider();
}

function updateSlider() {
    const track = $("#showcase-track");
    if (!track) return;

    const count = track.children.length;
    if (!count) return;

    state.slide = (state.slide + count) % count;
    track.style.transform = `translateX(-${state.slide * 100}%)`;

    $$(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === state.slide);
    });
}

function goToSlide(index) {
    state.slide = index;
    updateSlider();
}

function nextSlide() {
    state.slide += 1;
    updateSlider();
}

function previousSlide() {
    state.slide -= 1;
    updateSlider();
}

function startAutoplay() {
    clearInterval(state.autoplayTimer);
    if (!state.autoplay) return;

    state.autoplayTimer = setInterval(nextSlide, 5000);
}

function restartAutoplay() {
    startAutoplay();
}

function setupSlider() {
    $("#slider-next")?.addEventListener("click", () => {
        nextSlide();
        restartAutoplay();
    });

    $("#slider-prev")?.addEventListener("click", () => {
        previousSlide();
        restartAutoplay();
    });

    $("#autoplay-toggle")?.addEventListener("click", () => {
        state.autoplay = !state.autoplay;
        const icon = $("#autoplay-toggle i");

        if (state.autoplay) {
            icon.className = "fa-solid fa-pause";
            startAutoplay();
        } else {
            clearInterval(state.autoplayTimer);
            icon.className = "fa-solid fa-play";
        }
    });

    const slider = $("#showcase-slider");
    slider?.addEventListener("mouseenter", () => clearInterval(state.autoplayTimer));
    slider?.addEventListener("mouseleave", startAutoplay);
    slider?.addEventListener("touchstart", () => clearInterval(state.autoplayTimer), { passive: true });
    slider?.addEventListener("touchend", startAutoplay, { passive: true });

    startAutoplay();
}

function openQuickView(product) {
    const modal = $("#product-modal");
    const body = $("#modal-body");
    if (!modal || !body) return;

    body.innerHTML = `
        <span class="modal-badge">${escapeHtml(product.badge || "Digital Product")}</span>
        <h2>${escapeHtml(product.title)}</h2>
        <p>${escapeHtml(product.fullDesc || product.shortDesc || "")}</p>

        <div class="modal-features">
            ${(product.features || []).slice(0, 5).map(feature => `
                <div class="modal-feature">
                    <img src="assets/circle-check.svg" alt="">
                    <span>${escapeHtml(feature)}</span>
                </div>
            `).join("")}
        </div>

        <div class="modal-actions">
            <a href="product.html?id=${encodeURIComponent(product.id)}" class="primary-button">
                Open Product <i class="fa-solid fa-arrow-right"></i>
            </a>
            ${product.demoLink ? `
                <a href="${escapeHtml(product.demoLink)}" target="_blank" rel="noopener" class="secondary-button">
                    Live Demo
                </a>
            ` : ""}
        </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeQuickView() {
    const modal = $("#product-modal");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function setupModal() {
    $("#close-modal-btn")?.addEventListener("click", closeQuickView);
    $("#modal-backdrop")?.addEventListener("click", closeQuickView);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeQuickView();
    });
}

function setupSearch() {
    const input = $("#search-input");
    if (!input) return;

    input.addEventListener("input", event => {
        state.query = event.target.value.trim();
        renderProducts(getFilteredProducts());
    });

    document.addEventListener("keydown", event => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            input.focus();
        }
    });
}

function setupFilters() {
    $$(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            state.filter = button.dataset.filter || "all";
            updateFilters();
        });
    });
}

function setupMobileMenu() {
    const button = $("#mobile-menu-button");
    const menu = $("#mobile-nav");
    if (!button || !menu) return;

    button.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
        button.innerHTML = open
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    $$("#mobile-nav a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            button.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

function setupBackToTop() {
    const button = $("#back-to-top");
    if (!button) return;

    window.addEventListener("scroll", () => {
        button.classList.toggle("visible", window.scrollY > 450);
    }, { passive: true });

    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach(item => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .12 });

    items.forEach(item => observer.observe(item));
}

function updateProductCount() {
    const count = $("#product-count");
    if (count && typeof products !== "undefined") count.textContent = products.length;
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof products === "undefined") {
        console.error("EEPX Labs: products.js could not be loaded.");
        return;
    }

    updateProductCount();
    renderProducts(products);
    renderFaqs();
    renderShowcase();

    setupSlider();
    setupSearch();
    setupFilters();
    setupModal();
    setupMobileMenu();
    setupBackToTop();
    setupReveal();
});
