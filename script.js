// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-wrapper');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Typing Animation
    const words = ["beautiful websites.", "user experiences.", "digital solutions."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingElement = document.getElementById("typing");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Speed control
        let typeSpeed = isDeleting ? 80 : 150;
        
        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing animation
    setTimeout(typeEffect, 1000);

    // Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Active Navigation Links on Scroll
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Header Background Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Skills Animation
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
            }, 300);
        });
    }

    // Initialize skill animation when in viewport
    const aboutSection = document.querySelector('#about');
    let skillsAnimated = false;

    function checkSkillsInViewport() {
        if (!skillsAnimated) {
            const position = aboutSection.getBoundingClientRect();
            // If about section is in viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                animateSkills();
                skillsAnimated = true;
            }
        }
    }

    window.addEventListener('scroll', checkSkillsInViewport);
    checkSkillsInViewport(); // Check on initial load

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            showSlide(currentSlide);
        });
    });

    // Auto slide testimonials
    let testimonialInterval = setInterval(nextSlide, 5000);
    
    // Pause autoplay on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextSlide, 5000);
    });

    // Contact Form Validation & Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            // Simulate form submission (in a real app, you'd use AJAX or fetch)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate server response
            setTimeout(() => {
                // Success message (in a real app, display based on server response)
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation classes to elements when they become visible
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .project-card, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fadeIn');
            }
        });
    };
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fadeIn {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .service-card, .project-card, .about-image, .about-text {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});