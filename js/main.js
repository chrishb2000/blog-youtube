/* ============================================
   SABOR & TRADICIÓN - Main JavaScript
   Author: Christian Herencia
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ============================================
    // HERO CAROUSEL
    // ============================================
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let carouselInterval;
    
    function showSlide(index) {
        // Remove active class from all slides
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Handle index bounds
        if (index >= carouselSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = carouselSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Add active class to current slide
        carouselSlides[currentSlide].classList.add('active');
        carouselIndicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 6000);
    }
    
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
    
    // Event listeners for carousel buttons
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
    }
    
    // Event listeners for indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });
    
    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
            stopCarousel();
            startCarousel();
        }
        if (touchEndX - touchStartX > 50) {
            prevSlide();
            stopCarousel();
            startCarousel();
        }
    }
    
    // Start carousel on load
    startCarousel();
    
    // Pause carousel on hover
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopCarousel);
        heroCarousel.addEventListener('mouseleave', startCarousel);
    }
    
    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    
    if (testimonialPrev && testimonialNext && testimonialsSlider) {
        let testimonialScroll = 0;
        const scrollAmount = 350;
        
        testimonialPrev.addEventListener('click', function() {
            testimonialScroll = Math.max(0, testimonialScroll - scrollAmount);
            testimonialsSlider.scrollTo({
                left: testimonialScroll,
                behavior: 'smooth'
            });
        });
        
        testimonialNext.addEventListener('click', function() {
            const maxScroll = testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth;
            testimonialScroll = Math.min(maxScroll, testimonialScroll + scrollAmount);
            testimonialsSlider.scrollTo({
                left: testimonialScroll,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTop);
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Redirect to blog with search query
                window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    // ============================================
    // NEWSLETTER FORM SUBMISSION
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show success message
                showNotification('¡Gracias por suscribirte! Revisa tu correo para confirmar.', 'success');
            }, 1500);
        });
    }
    
    // ============================================
    // CONTACT FORM SUBMISSION (for contact page)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show success message
                showNotification('¡Mensaje enviado! Te responderemos pronto.', 'success');
            }, 1500);
        });
    }
    
    // ============================================
    // COMMENT FORM SUBMISSION (for post page)
    // ============================================
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (!data.name || !data.email || !data.comment) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Comentario enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)';
                
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                showNotification('¡Comentario enviado! Será publicado tras revisión.', 'success');
            }, 1500);
        });
    }
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
        `;
        
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add slideOutRight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const animateElements = document.querySelectorAll('.article-card, .category-card, .trending-card, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // CATEGORY FILTER (for blog page)
    // ============================================
    const categoryFilters = document.querySelectorAll('.category-filter');
    const articleItems = document.querySelectorAll('.article-item');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            articleItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ============================================
    // READ TIME CALCULATOR (for posts)
    // ============================================
    const postContent = document.querySelector('.post-content');
    const readTimeElement = document.getElementById('readTime');
    
    if (postContent && readTimeElement) {
        const wordCount = postContent.innerText.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed
        readTimeElement.textContent = `${readTime} min de lectura`;
    }
    
    // ============================================
    // SHARE BUTTONS FUNCTIONALITY
    // ============================================
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'pinterest':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // ============================================
    // COPY LINK FUNCTIONALITY
    // ============================================
    const copyLinkBtn = document.getElementById('copyLink');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado';
                showNotification('Enlace copiado al portapapeles', 'success');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
    
    // ============================================
    // SUBSCRIPTION FORM (contact page)
    // ============================================
    const subscriptionForm = document.getElementById('subscriptionForm');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                showNotification('Por favor ingresa tu correo electrónico', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)';
                
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                showNotification('¡Gracias por suscribirte!', 'success');
            }, 1500);
        });
    }
    
    // ============================================
    // PORTFOLIO FILTER (for portfolio page)
    // ============================================
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            portfolioFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ============================================
    // ACTIVE NAV LINK BASED ON URL
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ============================================
    // SEARCH URL PARAMS (for blog page)
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryParam = urlParams.get('cat');
    
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
    }
    
    // ============================================
    // PRINT FUNCTIONALITY
    // ============================================
    const printBtn = document.getElementById('printRecipe');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // ============================================
    // INGREDIENTS CHECKBOX (for recipe posts)
    // ============================================
    const ingredientCheckboxes = document.querySelectorAll('.ingredient-checkbox');
    
    ingredientCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.ingredient-item')?.querySelector('label');
            if (label) {
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.6';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            }
        });
    });
    
    // ============================================
    // RECIPE SERVINGS CALCULATOR
    // ============================================
    const servingsInput = document.getElementById('servings');
    const ingredientAmounts = document.querySelectorAll('.ingredient-amount');
    
    if (servingsInput) {
        servingsInput.addEventListener('change', function() {
            const newServings = parseInt(this.value);
            const baseServings = parseInt(this.dataset.base) || 4;
            const ratio = newServings / baseServings;
            
            ingredientAmounts.forEach(amount => {
                const baseAmount = parseFloat(amount.dataset.base);
                const unit = amount.dataset.unit || '';
                const newAmount = (baseAmount * ratio).toFixed(1);
                amount.textContent = `${newAmount} ${unit}`.trim();
            });
        });
    }
    
    // ============================================
    // VIDEO MODAL (for video content)
    // ============================================
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoClose = document.getElementById('videoClose');
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const videoId = this.dataset.video;
            if (videoModal && videoFrame) {
                videoModal.style.display = 'flex';
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        });
    });
    
    if (videoClose && videoModal) {
        videoClose.addEventListener('click', function() {
            videoModal.style.display = 'none';
            if (videoFrame) {
                videoFrame.src = '';
            }
        });
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                if (videoFrame) {
                    videoFrame.src = '';
                }
            }
        });
    }
    
    // ============================================
    // RELATED POSTS SLIDER
    // ============================================
    const relatedSlider = document.querySelector('.related-slider');
    const relatedPrev = document.querySelector('.related-prev');
    const relatedNext = document.querySelector('.related-next');
    
    if (relatedSlider && relatedPrev && relatedNext) {
        let relatedScroll = 0;
        
        relatedPrev.addEventListener('click', function() {
            relatedScroll = Math.max(0, relatedScroll - 350);
            relatedSlider.scrollTo({
                left: relatedScroll,
                behavior: 'smooth'
            });
        });
        
        relatedNext.addEventListener('click', function() {
            const maxScroll = relatedSlider.scrollWidth - relatedSlider.clientWidth;
            relatedScroll = Math.min(maxScroll, relatedScroll + 350);
            relatedSlider.scrollTo({
                left: relatedScroll,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // PROGRESS BAR FOR READING
    // ============================================
    const readingProgress = document.getElementById('readingProgress');
    
    if (readingProgress) {
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            readingProgress.style.width = `${progress}%`;
        });
    }
    
    // ============================================
    // TABLE OF CONTENTS TOGGLE
    // ============================================
    const tocToggle = document.getElementById('tocToggle');
    const tableOfContents = document.getElementById('tableOfContents');
    
    if (tocToggle && tableOfContents) {
        tocToggle.addEventListener('click', function() {
            tableOfContents.classList.toggle('open');
            const icon = this.querySelector('i');
            if (tableOfContents.classList.contains('open')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // ============================================
    // ACCORDION FUNCTIONALITY (for FAQ)
    // ============================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            // Close other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.style.maxHeight = null;
                    otherHeader.querySelector('.accordion-icon')?.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon?.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon?.classList.add('active');
            }
        });
    });
    
    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('%c🍳 Sabor & Tradición', 'font-size: 20px; font-weight: bold; color: #c44536;');
    console.log('%cBlog Gastronómico por Christian Herencia', 'font-size: 12px; color: #666;');
    console.log('%chttps://christian-freelance.us/', 'font-size: 10px; color: #999;');
    
});
