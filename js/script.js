const offerEndDate = new Date('May 14, 2025 18:20:59');
const offerAmount = 2;

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Mobile menu collapse after click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-block, .testimonial-card, .value-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 16) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    const timeToPromoEnd = function () {
        const endDate = offerEndDate.getTime();
        const now = new Date().getTime();

        return endDate - now;
    }

    let promoInterval;
    const updatePromoCountdown = function () {
        const distance = timeToPromoEnd();

        if (distance < 0) {
            clearInterval(promoInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }

    if (timeToPromoEnd() > 0) {
        updatePromoCountdown();
        document.querySelector('.promo-banner').style.display = 'block';
        const proAmount = document.querySelector('.price .amount-pro');

        if (proAmount) {
            // Get original price
            const originalPrice = proAmount.textContent.trim();

            // Add new class
            proAmount.classList.add('amount-promo');

            // Replace inner HTML with the new structure
            proAmount.innerHTML = `<span class="original-price">${originalPrice}</span> $${offerAmount}`;
        }

        const promoDescription = document.querySelector('.promo-text');
        
        if (promoDescription) {
            promoDescription.innerHTML = `🚀 Limited Time Offer: <strong>Pro Version <span class="original-price">$5</span> $${offerAmount}</strong> - Offer ends in:`;
        }

        promoInterval = setInterval(updatePromoCountdown, 1000);
    }
});
