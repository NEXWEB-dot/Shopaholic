
        // ---- LOCAL PRODUCTS (replacing Sanity) ----
        const LOCAL_PRODUCTS = [
            {
                id: 'luxe-crossbody-black',
                name: 'Luxe Crossbody — Black',
                brand: 'BAGIQUE',
                category: 'crossbody',
                price: 12500,
                oldPrice: 15000,
                isNew: true,
                colors: ['Black'],
                images: [{ url: 'images/img1.webp', color: 'Black' }]
            },
            {
                id: 'imported-shoulder-nude',
                name: 'Imported Shoulder Bag — Nude',
                brand: 'BAGIQUE',
                category: 'shoulder',
                price: 14800,
                oldPrice: null,
                isNew: false,
                colors: ['Beige'],
                images: [{ url: 'images/img2.webp', color: 'Beige' }]
            },
            {
                id: 'classic-handbag-brown',
                name: 'Classic Handbag — Brown',
                brand: 'BAGIQUE',
                category: 'handbag',
                price: 18500,
                oldPrice: 22000,
                isNew: true,
                colors: ['Brown'],
                images: [{ url: 'images/img3.jpg', color: 'Brown' }]
            },
            {
                id: 'premium-tote-tan',
                name: 'Premium Tote — Tan',
                brand: 'BAGIQUE',
                category: 'tote',
                price: 16000,
                oldPrice: null,
                isNew: false,
                colors: ['Tan'],
                images: [{ url: 'images/img4.jpg', color: 'Tan' }]
            },
            {
                id: 'mini-crossbody-pink',
                name: 'Mini Crossbody — Blush Pink',
                brand: 'BAGIQUE',
                category: 'crossbody',
                price: 9800,
                oldPrice: 12000,
                isNew: true,
                colors: ['Pink'],
                images: [{ url: 'images/img5.webp', color: 'Pink' }]
            },
            {
                id: 'structured-handbag-black',
                name: 'Structured Handbag — Black',
                brand: 'BAGIQUE',
                category: 'handbag',
                price: 21000,
                oldPrice: null,
                isNew: false,
                colors: ['Black'],
                images: [{ url: 'images/img6.webp', color: 'Black' }]
            },
            {
                id: 'everyday-tote-beige',
                name: 'Everyday Tote — Beige',
                brand: 'BAGIQUE',
                category: 'tote',
                price: 13500,
                oldPrice: 16500,
                isNew: false,
                colors: ['Beige'],
                images: [{ url: 'images/img7.jpg', color: 'Beige' }]
            },
            {
                id: 'mini-shoulder-cream',
                name: 'Mini Shoulder — Cream',
                brand: 'BAGIQUE',
                category: 'shoulder',
                price: 11200,
                oldPrice: null,
                isNew: true,
                colors: ['Cream'],
                images: [{ url: 'images/img8.jpg', color: 'Cream' }]
            },
            {
                id: 'bucket-bag-camel',
                name: 'Bucket Bag — Camel',
                brand: 'BAGIQUE',
                category: 'handbag',
                price: 17500,
                oldPrice: 20000,
                isNew: false,
                colors: ['Camel'],
                images: [{ url: 'images/img9.jpg', color: 'Camel' }]
            }
        ];

        let products = [];
        let currentCategory = 'all';
        let maxPrice = 50000;
        let wishlist = JSON.parse(localStorage.getItem('bagique_wishlist') || '[]');
        let shopSelectedColors = {};

        const COLOR_MAP = {
            'black': '#000000', 'white': '#FFFFFF', 'red': '#DB1215',
            'navy blue': '#1B2A4A', 'brown': '#6B3A2A', 'tan': '#D2B48C',
            'beige': '#F5F0E1', 'pink': '#F4A7B9', 'maroon': '#5E1B1C',
            'gray': '#808080', 'grey': '#808080', 'olive': '#556B2F',
            'cream': '#FFFDD0', 'camel': '#C19A6B', 'burgundy': '#800020',
            'navy': '#1B2A4A', 'blue': '#2563EB', 'green': '#16A34A',
            'light brown': '#B5651D', 'dark brown': '#5C4033', 'mustard': '#FFDB58'
        };

        function isLightColor(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return (r * 299 + g * 587 + b * 114) / 1000 > 180;
        }

        function selectShopColor(e, productId, color, btn) {
            e.preventDefault();
            e.stopPropagation();
            shopSelectedColors[productId] = color;
            const card = btn.closest('.product-card');
            card.querySelectorAll('.shop-color-' + productId).forEach(b => {
                b.classList.remove('ring-2', 'ring-black', 'ring-offset-1');
            });
            btn.classList.add('ring-2', 'ring-black', 'ring-offset-1');
            const product = products.find(p => p.id === productId);
            if (product && product.images) {
                const targetImg = product.images.find(img => img.color && img.color.trim().toLowerCase() === color.trim().toLowerCase());
                if (targetImg && targetImg.url) {
                    const imgEl = card.querySelector('.product-img');
                    if (imgEl) imgEl.src = targetImg.url;
                }
            }
        }

        // ---- SKELETON ----
        function showSkeleton() {
            const grid = document.getElementById('product-grid');
            let skeletonHTML = '';
            for (let i = 0; i < 8; i++) {
                skeletonHTML += `
                    <div class="bg-white rounded-xl overflow-hidden">
                        <div class="skeleton aspect-[3/4] w-full rounded-t-xl"></div>
                        <div class="p-4 space-y-2.5">
                            <div class="skeleton h-3 w-16 rounded-full"></div>
                            <div class="skeleton h-4 w-full rounded-full"></div>
                            <div class="skeleton h-3 w-24 rounded-full"></div>
                        </div>
                    </div>`;
            }
            grid.innerHTML = skeletonHTML;
        }

        async function loadProducts() {
            showSkeleton();
            // Small delay to simulate loading feel
            await new Promise(r => setTimeout(r, 300));
            products = LOCAL_PRODUCTS;
            renderGrid();
        }

        // ---- CART (localStorage) ----
        function getCart() { return JSON.parse(localStorage.getItem('bagique_cart') || '[]'); }
        function saveCart(cart) { localStorage.setItem('bagique_cart', JSON.stringify(cart)); }
        function updateBadge() {
            const total = getCart().reduce((sum,i) => sum + i.qty, 0);
            document.querySelectorAll('.cart-counter-badge').forEach(el => el.textContent = total);
        }

        // ---- WISHLIST ----
        function toggleWishlist(e, productId) {
            e.preventDefault();
            e.stopPropagation();
            const idx = wishlist.indexOf(productId);
            if (idx > -1) { wishlist.splice(idx, 1); }
            else { wishlist.push(productId); }
            localStorage.setItem('bagique_wishlist', JSON.stringify(wishlist));
            const btn = e.currentTarget;
            btn.classList.toggle('active');
            showToast(idx > -1 ? 'Removed from wishlist' : 'Added to wishlist');
        }

        // ---- CATEGORY ----
        function setCategory(cat, el) {
            currentCategory = cat;
            document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
            if (el) el.classList.add('active');
            const radio = document.querySelector(`input[name="sidebar-cat"][value="${cat}"]`);
            if (radio) radio.checked = true;
            renderGrid();
        }

        function setSidebarCategory(cat) {
            currentCategory = cat;
            document.querySelectorAll('.cat-chip').forEach(c => {
                c.classList.toggle('active', c.dataset.category === cat);
            });
            renderGrid();
        }

        // ---- PRICE RANGE ----
        function updatePriceRange(val) {
            maxPrice = parseInt(val);
            document.getElementById('price-range-label').textContent = 'Rs. ' + maxPrice.toLocaleString();
            renderGrid();
        }

        // ---- FILTER SIDEBAR ----
        function openFilter() {
            document.getElementById('filter-overlay').classList.add('active');
            document.getElementById('filter-panel').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeFilter() {
            document.getElementById('filter-overlay').classList.remove('active');
            document.getElementById('filter-panel').classList.remove('active');
            document.body.style.overflow = '';
        }

        // ---- CLEAR ALL ----
        function clearAllFilters() {
            currentCategory = 'all';
            maxPrice = 50000;
            document.getElementById('price-range').value = 50000;
            document.getElementById('price-range-label').textContent = 'Rs. 50,000';
            document.getElementById('search-input').value = '';
            document.getElementById('search-clear').classList.add('hidden');
            document.getElementById('sort-select').value = 'featured';
            document.querySelectorAll('.cat-chip').forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
            const radio = document.querySelector('input[name="sidebar-cat"][value="all"]');
            if (radio) radio.checked = true;
            renderGrid();
        }

        // ---- RENDER ----
        function renderGrid() {
            const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
            const sortVal = document.getElementById('sort-select').value;
            const grid = document.getElementById('product-grid');
            const noResults = document.getElementById('no-results');
            grid.innerHTML = '';

            let filtered = products.filter(p => {
                const catMatch = currentCategory === 'all' || p.category === currentCategory;
                const priceMatch = p.price <= maxPrice;
                const searchMatch = !searchQuery ||
                    p.name.toLowerCase().includes(searchQuery) ||
                    (p.brand && p.brand.toLowerCase().includes(searchQuery)) ||
                    (p.category && p.category.toLowerCase().includes(searchQuery));
                return catMatch && priceMatch && searchMatch;
            });

            switch (sortVal) {
                case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
                case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
                case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
                case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
                default: break;
            }

            document.getElementById('product-count').textContent = filtered.length + ' product' + (filtered.length !== 1 ? 's' : '');

            const activeFiltersEl = document.getElementById('active-filters');
            const activeFilters = [];
            if (currentCategory !== 'all') activeFilters.push(currentCategory);
            if (maxPrice < 50000) activeFilters.push('Under Rs.' + maxPrice.toLocaleString());
            if (searchQuery) activeFilters.push('"' + searchQuery + '"');
            if (activeFilters.length > 0) {
                activeFiltersEl.textContent = '· ' + activeFilters.join(' · ');
                activeFiltersEl.classList.remove('hidden');
            } else {
                activeFiltersEl.classList.add('hidden');
            }

            if (filtered.length === 0) {
                noResults.classList.remove('hidden');
                grid.classList.add('hidden');
                return;
            } else {
                noResults.classList.add('hidden');
                grid.classList.remove('hidden');
            }

            filtered.forEach((p, index) => {
                const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
                const isWished = wishlist.includes(p.id);

                if (p.colors && p.colors.length > 0 && !shopSelectedColors[p.id]) {
                    const firstColor = p.colors[0];
                    shopSelectedColors[p.id] = typeof firstColor === 'string' ? firstColor : (firstColor.name || 'Unknown');
                }

                let colorHtml = '';
                if (p.colors && p.colors.length > 0) {
                    colorHtml = `<div class="flex gap-1.5 mt-2 mb-1" onclick="event.preventDefault(); event.stopPropagation();">`;
                    p.colors.forEach((c, i) => {
                        const colorName = typeof c === 'string' ? c : (c.name || 'Unknown');
                        const hex = (typeof c === 'object' && c.value && c.value.hex) ? c.value.hex : (COLOR_MAP[colorName.trim().toLowerCase()] || '#808080');
                        const isLight = isLightColor(hex);
                        const isSelected = shopSelectedColors[p.id] === colorName;
                        colorHtml += `<button onclick="selectShopColor(event, '${p.id}', '${colorName}', this)" class="w-4 h-4 rounded-full border ${isLight ? 'border-gray-300' : 'border-transparent'} shop-color-${p.id} ${isSelected ? 'ring-2 ring-black ring-offset-1' : ''}" style="background-color: ${hex}" title="${colorName}"></button>`;
                    });
                    colorHtml += `</div>`;
                }

                const card = document.createElement('div');
                card.className = 'product-card bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100/80';
                card.style.animationDelay = (index * 0.06) + 's';

                card.innerHTML = `
                    <a href="product-detail.html?id=${p.id}" class="flex flex-col h-full">
                        <div class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 aspect-[3/4] shrink-0 w-full">
                            <img src="${p.images[0]?.url || p.images[0]}" alt="${p.name}" class="product-img w-full h-full object-cover" loading="lazy">
                            <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                                ${disc ? `<div class="badge-sale text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm">-${disc}%</div>` : ''}
                                ${p.isNew ? `<div class="badge-new text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm">NEW</div>` : ''}
                            </div>
                            <button onclick="toggleWishlist(event, '${p.id}')" class="wishlist-btn ${isWished ? 'active' : ''} absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 hover:scale-110">
                                <i class="${isWished ? 'fas' : 'far'} fa-heart text-sm ${isWished ? '' : 'text-gray-500'}"></i>
                            </button>
                            <div class="quick-actions absolute bottom-0 left-0 right-0 p-3 z-10">
                                <button onclick="addToCart(event, '${p.id}')" class="w-full bg-black/90 backdrop-blur-sm text-white py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg" style="transition:background .2s" onmouseover="this.style.background='var(--pink,#E91E8C)'" onmouseout="this.style.background='rgba(0,0,0,0.9)'">
                                    <i class="fas fa-shopping-bag text-[9px]"></i>
                                    Add to Bag
                                </button>
                            </div>
                        </div>
                        <div class="p-3 md:p-4 flex flex-col flex-1">
                            <p class="text-[9px] text-gray-400 font-semibold uppercase tracking-[0.15em] mb-1">${p.brand || 'BAGIQUE'}</p>
                            <h3 class="text-[11px] md:text-xs font-bold uppercase tracking-wide text-black mb-2 line-clamp-2 leading-relaxed">${p.name}</h3>
                            ${colorHtml}
                            <div class="flex items-center space-x-2 mt-auto pt-1">
                                <span class="font-bold text-sm text-black">Rs. ${p.price.toLocaleString()}</span>
                                ${p.oldPrice ? `<span class="text-gray-400 line-through text-[11px]">Rs. ${p.oldPrice.toLocaleString()}</span>` : ''}
                            </div>
                        </div>
                    </a>
                `;
                grid.appendChild(card);
            });
        }

        function addToCart(e, productId) {
            e.preventDefault();
            e.stopPropagation();
            const product = products.find(p => p.id === productId);
            if (!product) return;
            const cart = getCart();
            const firstColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
            const firstColorName = firstColor ? (typeof firstColor === 'string' ? firstColor : (firstColor.name || 'Unknown')) : null;
            const selectedColor = shopSelectedColors[productId] || firstColorName;
            const cartKey = selectedColor ? product.id + '-' + selectedColor.toLowerCase() : product.id;
            const existing = cart.find(i => i.id === cartKey);
            if (existing) { existing.qty++; }
            else {
                const selectedImg = product.images.find(img => img.color && img.color.trim().toLowerCase() === selectedColor?.trim().toLowerCase())?.url || product.images[0]?.url || product.images[0];
                cart.push({
                    id: cartKey,
                    productId: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    image: selectedImg,
                    color: selectedColor,
                    qty: 1
                });
            }
            saveCart(cart);
            updateBadge();
            showToast('Added to bag!');
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').textContent = msg;
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            toast.style.pointerEvents = 'auto';
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(16px)';
                toast.style.pointerEvents = 'none';
            }, 2500);
        }

        // ---- SEARCH ----
        const searchInput = document.getElementById('search-input');
        const searchClear = document.getElementById('search-clear');
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchClear.classList.toggle('hidden', !searchInput.value);
            searchTimeout = setTimeout(() => renderGrid(), 300);
        });
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.classList.add('hidden');
            renderGrid();
            searchInput.focus();
        });

        // ---- FILTER BUTTON ----
        document.getElementById('filter-btn').addEventListener('click', openFilter);

        // ---- MOBILE MENU ----
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

        // ---- INIT ----
        document.addEventListener('DOMContentLoaded', () => {
            loadProducts();
            updateBadge();
            const urlCat = new URLSearchParams(window.location.search).get('cat');
            if (urlCat) {
                setTimeout(() => {
                    const matchingChip = document.querySelector(`.cat-chip[data-category="${urlCat}"]`);
                    if (matchingChip) setCategory(urlCat, matchingChip);
                }, 400);
            }
        });
