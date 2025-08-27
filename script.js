// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Loading Animation
    const bodyElement = document.body;
    bodyElement.style.opacity = '0';
    bodyElement.style.transform = 'translateY(30px)';
    bodyElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Staggered entrance animations
    const initAnimateElements = () => {
        const elements = document.querySelectorAll('.info-card, .service-card, .award-card, .stakeholder-card, .sponsor-package, .position-card, .objective-item');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.8)';
            el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        });
    };

    initAnimateElements();

    window.addEventListener('load', () => {
        bodyElement.style.opacity = '1';
        bodyElement.style.transform = 'translateY(0)';
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Enhanced hamburger animation
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add rotation animation to hamburger
        if (hamburger.classList.contains('active')) {
            hamburger.style.transform = 'rotate(90deg)';
        } else {
            hamburger.style.transform = 'rotate(0deg)';
        }
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        });
    });

    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Enhanced navbar scroll effect with parallax
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Particle Effect for Hero Section
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: floatParticle ${5 + Math.random() * 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(particle);
        }

        hero.appendChild(particlesContainer);

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    createParticles();

    // Registration form handling
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.eventType) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your registration! We will contact you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards and sections on scroll
    const scrollAnimateElements = document.querySelectorAll('.info-card, .service-card, .award-card, .stakeholder-card, .sponsor-package, .timeline-item, .position-card, .objective-item');
    scrollAnimateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Special animation for CEO card
    const ceoCard = document.querySelector('.ceo-card');
    if (ceoCard) {
        const ceoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.3 });
        
        ceoCard.style.opacity = '0';
        ceoCard.style.transform = 'translateY(-30px) scale(0.9)';
        ceoCard.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        ceoObserver.observe(ceoCard);
    }

    // Enhanced counter animation for budget and statistics
    const animateCounters = () => {
        const counters = document.querySelectorAll('.price, .budget-row-modern .budget-col:nth-child(3)');
        counters.forEach(counter => {
            const text = counter.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, '')) || 0;
            if (target > 0) {
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    const prefix = text.includes('₱') ? '₱' : '';
                    const suffix = text.includes('%') ? '%' : '';
                    counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                }, 20);
            }
        });
    };

    // Interactive floor plan enhancements
    const modernFloorplanElements = document.querySelectorAll('.table-modern, .stage-modern, .entrance-modern, .fire-exit-modern, .catering-modern, .registration-modern');
    modernFloorplanElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('table-modern') ? 'scale(1.1)' : 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        element.addEventListener('click', function() {
            const elementType = this.className;
            let description = '';
            
            switch(true) {
                case elementType.includes('table-modern'):
                    description = 'Seating area for guests - Capacity: 8-10 people per table';
                    break;
                case elementType.includes('stage-modern'):
                    description = 'Main stage area for presentations and performances';
                    break;
                case elementType.includes('entrance-modern'):
                    description = 'Main entrance for guest arrivals and check-in';
                    break;
                case elementType.includes('fire-exit-modern'):
                    description = 'Emergency fire exit - Keep clear at all times';
                    break;
                case elementType.includes('catering-modern'):
                    description = 'Catering service area for food and beverage distribution';
                    break;
                case elementType.includes('registration-modern'):
                    description = 'Registration and welcome desk for attendees';
                    break;
            }
            
            if (description) {
                alert(description);
            }
        });
    });

    // Enhanced print button functionality
    const printButtons = document.querySelectorAll('.print-budget-btn, .print-programme-btn, .print-floorplan-btn');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            let sectionContent = '';
            let title = '';
            
            if (this.classList.contains('print-budget-btn')) {
                sectionContent = document.querySelector('.budget-table-modern').outerHTML;
                title = 'Budget Report';
            } else if (this.classList.contains('print-programme-btn')) {
                sectionContent = document.querySelector('.programme-table-modern').outerHTML;
                title = 'Programme Schedule';
            } else if (this.classList.contains('print-floorplan-btn')) {
                sectionContent = document.querySelector('.floorplan-container-modern').outerHTML + 
                                document.querySelector('.legend-modern').outerHTML;
                title = 'Floor Plan Layout';
            }
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { 
                            font-family: 'Inter', Arial, sans-serif; 
                            margin: 20px; 
                            color: #2c3e50;
                        }
                        h1 { 
                            text-align: center; 
                            margin-bottom: 2rem; 
                            color: #667eea;
                            font-weight: 300;
                        }
                        .budget-table-modern, .programme-table-modern { 
                            width: 100%; 
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        }
                        .budget-header-modern, .programme-header-modern { 
                            background: #667eea !important; 
                            color: white !important; 
                        }
                        .budget-row-modern, .programme-row-modern { 
                            border-bottom: 1px solid #eee; 
                        }
                        .budget-total-modern {
                            background: #28a745 !important;
                            color: white !important;
                        }
                        .floorplan-container-modern {
                            margin-bottom: 2rem;
                        }
                        .legend-modern {
                            background: #f8f9fa;
                            padding: 1rem;
                            border-radius: 8px;
                        }
                        @media print {
                            body { margin: 0; }
                            .legend-modern { page-break-inside: avoid; }
                        }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${sectionContent}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        });
    });

    // Trigger counter animation when budget section is visible
    const budgetSection = document.querySelector('#budget');
    if (budgetSection) {
        const budgetObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    budgetObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        budgetObserver.observe(budgetSection);
    }

    // Interactive floor plan
    const floorplanElements = document.querySelectorAll('.table, .stage, .entrance, .fire-exit, .catering, .registration');
    floorplanElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        element.addEventListener('click', function() {
            const elementType = this.className;
            let description = '';
            
            switch(true) {
                case elementType.includes('table'):
                    description = 'Seating area for guests - Capacity: 8-10 people per table';
                    break;
                case elementType.includes('stage'):
                    description = 'Main stage area for presentations and performances';
                    break;
                case elementType.includes('entrance'):
                    description = 'Main entrance for guest arrivals and check-in';
                    break;
                case elementType.includes('fire-exit'):
                    description = 'Emergency fire exit - Keep clear at all times';
                    break;
                case elementType.includes('catering'):
                    description = 'Catering service area for food and beverage distribution';
                    break;
                case elementType.includes('registration'):
                    description = 'Registration and welcome desk for attendees';
                    break;
            }
            
            if (description) {
                alert(description);
            }
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });

    // Sponsor package highlight effect
    const sponsorPackages = document.querySelectorAll('.sponsor-package');
    sponsorPackages.forEach(package => {
        package.addEventListener('click', function() {
            // Remove highlight from other packages
            sponsorPackages.forEach(p => p.classList.remove('selected'));
            // Add highlight to clicked package
            this.classList.add('selected');
            
            // Show selection message
            const packageName = this.querySelector('h3').textContent;
            const packagePrice = this.querySelector('.price').textContent;
            
            // You could replace this with a more sophisticated modal or form
            if (confirm(`You've selected the ${packageName} package for ${packagePrice}. Would you like to proceed with this sponsorship option?`)) {
                alert('Thank you for your interest! We will contact you to finalize the sponsorship details.');
            }
        });
    });

    // Add selected style for sponsor packages
    const style = document.createElement('style');
    style.textContent = `
        .sponsor-package.selected {
            border-color: #28a745 !important;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            transform: scale(1.05);
        }
        
        .sponsor-package.selected .price {
            color: white;
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Add loading animation for the page
    const pageBody = document.body;
    pageBody.style.opacity = '0';
    pageBody.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        pageBody.style.opacity = '1';
    });

    // Add hover effects for interactive elements
    const hoverElements = document.querySelectorAll('.cta-button, .submit-btn, .nav-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Print functionality for budget and programme sections
    function addPrintButton(sectionId, buttonText) {
        const section = document.querySelector(sectionId);
        if (section) {
            const printBtn = document.createElement('button');
            printBtn.textContent = buttonText;
            printBtn.className = 'print-btn';
            printBtn.style.cssText = `
                margin: 1rem auto;
                display: block;
                padding: 10px 20px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s ease;
            `;
            
            printBtn.addEventListener('click', () => {
                const printWindow = window.open('', '_blank');
                const sectionHTML = section.innerHTML;
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${buttonText}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .section-title { text-align: center; margin-bottom: 2rem; }
                            .programme-table, .budget-table { width: 100%; }
                            .programme-header, .budget-header { background: #007bff; color: white; }
                            .programme-row, .budget-row { border-bottom: 1px solid #eee; }
                            .print-btn { display: none; }
                        </style>
                    </head>
                    <body>${sectionHTML}</body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            });
            
            printBtn.addEventListener('mouseenter', () => {
                printBtn.style.background = '#0056b3';
            });
            
            printBtn.addEventListener('mouseleave', () => {
                printBtn.style.background = '#007bff';
            });
            
            section.appendChild(printBtn);
        }
    }

   
});

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
`;

scrollTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(10px)';
    }
});

// Add hover effect to scroll top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#0056b3';
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#007bff';
    scrollTopBtn.style.transform = 'scale(1)';
});
