
        function openMobileMenu() {
            document.getElementById('mobile-menu-overlay').classList.add('active');
            document.getElementById('mobile-menu-panel').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeMobileMenu() {
            document.getElementById('mobile-menu-overlay').classList.remove('active');
            document.getElementById('mobile-menu-panel').classList.remove('active');
            document.body.style.overflow = '';
        }
        document.getElementById('mobile-menu-btn').addEventListener('click', openMobileMenu);

        // Cart badge sync
        function updateCartBadge() {
            const cart = JSON.parse(localStorage.getItem('shopaholic_cart') || '[]');
            const total = cart.reduce((sum, i) => sum + i.qty, 0);
            document.querySelectorAll('.cart-counter-badge').forEach(el => el.textContent = total);
        }
        document.addEventListener('DOMContentLoaded', updateCartBadge);

        // ---- LOCAL PRODUCTS (replacing Sanity) ----
        const LOCAL_PRODUCTS = [
            {
                id: 'gold-hoop-earrings',
                name: 'Gold Hoop Earrings',
                brand: 'SHOPAHOLIC',
                category: 'earrings',
                price: 1800,
                oldPrice: 2400,
                isNew: true,
                images: [{ url: 'images/1.webp' }]
            },
            {
                id: 'pearl-drop-necklace',
                name: 'Pearl Drop Necklace',
                brand: 'SHOPAHOLIC',
                category: 'necklaces',
                price: 3200,
                oldPrice: null,
                isNew: false,
                images: [{ url: 'images/3.webp' }]
            },
            {
                id: 'statement-ring',
                name: 'Statement Ring',
                brand: 'SHOPAHOLIC',
                category: 'rings',
                price: 1500,
                oldPrice: 2000,
                isNew: true,
                images: [{ url: 'images/4.webp' }]
            },
            {
                id: 'layered-chain-necklace',
                name: 'Layered Chain Necklace',
                brand: 'SHOPAHOLIC',
                category: 'necklaces',
                price: 3800,
                oldPrice: 4500,
                isNew: false,
                images: [{ url: 'images/5.webp' }]
            },
            {
                id: 'charm-bracelet',
                name: 'Charm Bracelet',
                brand: 'SHOPAHOLIC',
                category: 'bracelets',
                price: 2600,
                oldPrice: null,
                isNew: true,
                images: [{ url: 'images/6.webp' }]
            },
            {
                id: 'crystal-stud-earrings',
                name: 'Crystal Stud Earrings',
                brand: 'SHOPAHOLIC',
                category: 'earrings',
                price: 1200,
                oldPrice: 1600,
                isNew: false,
                images: [{ url: 'images/7.webp' }]
            },
            {
                id: 'stackable-ring-set',
                name: 'Stackable Ring Set',
                brand: 'SHOPAHOLIC',
                category: 'rings',
                price: 2200,
                oldPrice: null,
                isNew: true,
                images: [{ url: 'images/8.webp' }]
            },
            {
                id: 'bangle-bracelet',
                name: 'Bangle Bracelet',
                brand: 'SHOPAHOLIC',
                category: 'bracelets',
                price: 2900,
                oldPrice: 3500,
                isNew: false,
                images: [{ url: 'images/10.webp' }]
            }
        ];

        (function () {
            const carousel = document.getElementById('heroCarousel');
            if (!carousel) return;

            const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
            const thumbs = Array.from(carousel.querySelectorAll('.hero-thumb'));
            const prevBtn = carousel.querySelector('.hero-prev');
            const nextBtn = carousel.querySelector('.hero-next');
            const counterCurrent = carousel.querySelector('.hero-counter-current');
            const progressBar = carousel.querySelector('.hero-progress');

            let current = 0;
            let autoplayTimer = null;
            let progressTimer = null;
            const AUTOPLAY_MS = 6000;

            function pad(n) { return String(n + 1).padStart(2, '0'); }

            function goTo(index) {
                slides[current].classList.remove('active');
                thumbs[current].classList.remove('active');
                current = (index + slides.length) % slides.length;
                slides[current].classList.add('active');
                thumbs[current].classList.add('active');
                counterCurrent.textContent = pad(current);
                restartAutoplay();
            }

            function next() { goTo(current + 1); }
            function prevSlide() { goTo(current - 1); }

            function restartAutoplay() {
                clearTimeout(autoplayTimer);
                clearInterval(progressTimer);
                progressBar.style.width = '0%';
                let elapsed = 0;
                progressTimer = setInterval(() => {
                    elapsed += 100;
                    progressBar.style.width = Math.min((elapsed / AUTOPLAY_MS) * 100, 100) + '%';
                }, 100);
                autoplayTimer = setTimeout(next, AUTOPLAY_MS);
            }

            thumbs.forEach((thumb) => {
                thumb.addEventListener('click', () => {
                    const idx = parseInt(thumb.getAttribute('data-index'), 10);
                    goTo(idx);
                });
            });

            nextBtn.addEventListener('click', next);
            prevBtn.addEventListener('click', prevSlide);

            carousel.addEventListener('mouseenter', () => {
                clearTimeout(autoplayTimer);
                clearInterval(progressTimer);
            });
            carousel.addEventListener('mouseleave', restartAutoplay);

            restartAutoplay();
        })();

        window.addEventListener('scroll', () => {
            const btn = document.getElementById('back-to-top');
            if (window.scrollY > 400) { btn.style.opacity='1'; btn.style.pointerEvents='auto'; }
            else { btn.style.opacity='0'; btn.style.pointerEvents='none'; }
        });

        async function loadHomeProducts() {
            const products = LOCAL_PRODUCTS;

            // Trendy Grid (first 4 products)
            const trendyGrid = document.getElementById('trendy-grid');
            if (trendyGrid) {
                trendyGrid.innerHTML = '';
                products.slice(0, 4).forEach(p => {
                    const imgUrl = p.images && p.images.length ? (p.images[0].url || p.images[0]) : '';
                    const card = document.createElement('div');
                    card.className = 'trendy-card group cursor-pointer';
                    card.onclick = () => window.location.href = `product-detail.html?id=${p.id}`;

                    const saleBadge = (p.oldPrice && p.oldPrice > p.price) ?
                        `<div class="absolute top-4 left-4 text-white text-[10px] px-3 py-1 uppercase font-bold tracking-widest" style="background:var(--pink,#F055B2)">Sale</div>` : '';
                    const newBadge = p.isNew ? `<div class="absolute top-4 right-4 text-white text-[10px] px-3 py-1 uppercase font-bold tracking-widest" style="background:#111">New</div>` : '';

                    card.innerHTML = `
                        <div class="relative bg-gray-50 aspect-[4/5] mb-3 sm:mb-5 overflow-hidden flex items-center justify-center">
                            <img src="${imgUrl}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            ${saleBadge}${newBadge}
                            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                                <button class="bg-white text-black text-[8px] sm:text-[10px] uppercase tracking-widest px-3 py-2 sm:px-8 sm:py-3 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300" style="transition: transform .3s, background .2s, color .2s" onmouseover="this.style.background='#F055B2';this.style.color='#fff'" onmouseout="this.style.background='#fff';this.style.color='#111'">View Details</button>
                            </div>
                        </div>
                        <div class="text-left">
                            <h4 class="font-semibold text-black uppercase text-sm mb-1 tracking-wide" style="transition:color .2s">${p.name}</h4>
                            <p class="text-gray-500 text-sm font-medium">
                                ${p.oldPrice ? `<span class="text-gray-400 line-through mr-2">Rs. ${p.oldPrice.toLocaleString()}</span> <span style="color:var(--pink,#F055B2)">Rs. ${p.price.toLocaleString()}</span>` : `Rs. ${p.price.toLocaleString()}`}
                            </p>
                        </div>
                    `;
                    trendyGrid.appendChild(card);
                });
            }

            // Collection Slider
            const slider = document.getElementById('collection-slider');
            if (slider) {
                slider.innerHTML = '';
                products.forEach(p => {
                    const imgUrl = p.images && p.images.length ? (p.images[0].url || p.images[0]) : '';
                    const item = document.createElement('div');
                    item.className = 'snap-center shrink-0 w-[70vw] sm:w-[40vw] lg:w-[25vw] aspect-[4/5] relative bg-gray-50 cursor-pointer overflow-hidden group';
                    item.onclick = () => window.location.href = `product-detail.html?id=${p.id}`;
                    item.innerHTML = `
                        <img src="${imgUrl}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="${p.name}">
                        <div class="absolute bottom-0 left-0 right-0 bg-white/90 py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p class="text-xs font-bold uppercase tracking-wide text-black truncate">${p.name}</p>
                            <p class="text-xs font-semibold mt-0.5" style="color:var(--pink,#F055B2)">Rs. ${p.price.toLocaleString()}</p>
                        </div>
                    `;
                    slider.appendChild(item);
                });
            }
        }

        document.addEventListener('DOMContentLoaded', loadHomeProducts);
