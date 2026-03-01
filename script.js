/* Pegas Clothing - Enhanced Animated JavaScript */
document.addEventListener('DOMContentLoaded', () => {
    // Page Loader
    const pageLoader = document.getElementById('pageLoader');
    window.addEventListener('load', () => { setTimeout(() => { pageLoader.classList.add('hidden'); }, 500); });
    setTimeout(() => { pageLoader.classList.add('hidden'); }, 2500);

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        // Re-trigger slide content animations
        const activeContent = slides[currentSlide].querySelector('.slide-content');
        if (activeContent) {
            activeContent.style.animation = 'none';
            activeContent.offsetHeight;
            activeContent.style.animation = '';
            const children = activeContent.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.animation = 'none';
                children[i].offsetHeight;
                children[i].style.animation = '';
            }
        }
    }
    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
    function startAutoSlide() { slideInterval = setInterval(nextSlide, 5000); }
    function stopAutoSlide() { clearInterval(slideInterval); }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
    dots.forEach(dot => { dot.addEventListener('click', () => { stopAutoSlide(); goToSlide(parseInt(dot.dataset.slide)); startAutoSlide(); }); });

    // Touch/Swipe
    const heroSlider = document.getElementById('heroSlider');
    let touchStartX = 0, touchEndX = 0;
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        heroSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { stopAutoSlide(); if (diff > 0) nextSlide(); else prevSlide(); startAutoSlide(); }
        }, { passive: true });
    }
    startAutoSlide();

    // Sticky Nav enhanced shadow
    const navBar = document.getElementById('navBar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 200) {
            navBar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
        } else {
            navBar.style.boxShadow = '0 3px 12px rgba(0,0,0,0.06)';
        }
        lastScroll = currentScroll;
    });

    // Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Enhanced Scroll Animations with stagger
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    animateElements.forEach(el => observer.observe(el));

    // Tab Switching with animation
    function setupTabs(containerSelector) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const tabs = container.querySelectorAll('.section-tab, .category-pill');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const parent = tab.parentElement;
                    parent.querySelectorAll('.section-tab, .category-pill').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    const section = tab.closest('section');
                    if (section) {
                        const cards = section.querySelectorAll('.product-card');
                        cards.forEach((card, i) => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(15px) scale(0.97)';
                            setTimeout(() => {
                                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, i * 80);
                        });
                    }
                });
            });
        });
    }
    setupTabs('#newArrivalsSection');
    setupTabs('#menSection');
    setupTabs('#womenSection');
    setupTabs('#kidsSection');
    setupTabs('#accessoriesSection');

    // Wishlist Toggle with bounce
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            if (icon.classList.contains('fas')) {
                icon.style.color = '#e94560';
                btn.style.transform = 'scale(1.3)';
                setTimeout(() => { btn.style.transform = ''; }, 300);
            } else {
                icon.style.color = '';
            }
        });
    });

    // Add to Cart with enhanced animation
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.background = '#27ae60';
            btn.style.transform = 'scale(1.03)';
            setTimeout(() => { btn.style.transform = ''; }, 200);
            setTimeout(() => { btn.innerHTML = originalText; btn.style.background = ''; }, 1500);
            const badge = document.querySelector('.cart-badge');
            if (badge) {
                const count = parseInt(badge.textContent) + 1;
                badge.textContent = count;
                badge.style.transform = 'scale(1.6)';
                badge.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                setTimeout(() => { badge.style.transform = 'scale(1)'; }, 350);
            }
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => { searchBtn.innerHTML = '<i class="fas fa-search"></i>'; alert('Searching for: "' + query + '"'); }, 800);
            }
        });
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchBtn.click(); });
    }

    // Newsletter
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterInput = document.getElementById('newsletterInput');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterInput.value.trim();
            if (email && email.includes('@')) {
                newsletterBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                newsletterBtn.style.background = '#27ae60';
                newsletterInput.value = '';
                setTimeout(() => { newsletterBtn.innerHTML = 'Subscribe <i class="fas fa-paper-plane"></i>'; newsletterBtn.style.background = ''; }, 2000);
            } else {
                newsletterInput.style.boxShadow = '0 0 0 2px #e94560';
                newsletterInput.style.transition = 'box-shadow 0.3s ease';
                setTimeout(() => { newsletterInput.style.boxShadow = ''; }, 2000);
            }
        });
    }

    // Categories Dropdown Mobile
    const allCategoriesBtn = document.getElementById('allCategoriesBtn');
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    if (allCategoriesBtn && window.innerWidth <= 768) {
        allCategoriesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = categoriesDropdown.style.opacity === '1';
            categoriesDropdown.style.opacity = isVisible ? '0' : '1';
            categoriesDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
            categoriesDropdown.style.transform = isVisible ? 'translateY(-8px)' : 'translateY(0)';
        });
        document.addEventListener('click', () => { categoriesDropdown.style.opacity = '0'; categoriesDropdown.style.visibility = 'hidden'; });
    }

    // WhatsApp pulse
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.12)';
            setTimeout(() => { whatsappBtn.style.transform = 'scale(1)'; }, 300);
        }, 4000);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Lazy load product cards with stagger
    const productCards = document.querySelectorAll('.product-card');
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.97)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (index % 4 * 0.1) + 's';
        productObserver.observe(card);
    });

    // Parallax-like effect on feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';
        item.style.transition = 'all 0.5s ease ' + (i * 0.15) + 's';
    });
    const featObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.feature-item');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
                featObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    const featuresBar = document.querySelector('.features-bar');
    if (featuresBar) featObserver.observe(featuresBar);

    // Category cards stagger animation
    const catCards = document.querySelectorAll('.category-card');
    catCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (i * 0.1) + 's';
    });
    const catObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.category-card');
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                });
                catObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    const catShowcase = document.getElementById('categoryShowcase');
    if (catShowcase) catObserver.observe(catShowcase);

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && categoriesDropdown) {
            categoriesDropdown.style.opacity = '0';
            categoriesDropdown.style.visibility = 'hidden';
        }
    });

    console.log('Pegas Clothing - Loaded Successfully');
});
