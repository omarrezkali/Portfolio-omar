
document.addEventListener('DOMContentLoaded', () =\u003e {

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        updateIcon();
    }

    themeToggleBtn.addEventListener('click', () =\u003e {
        if(body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
} else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
}
        updateIcon();
    });

function updateIcon() {
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// --- Mobile Menu Toggle ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () =\u003e {
    mobileMenu.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if(mobileMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
} else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}
    });

mobileLinks.forEach(link =\u003e {
    link.addEventListener('click', () =\u003e {
        mobileMenu.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) =\u003e {
    entries.forEach(entry =\u003e {
        if(entry.isIntersecting) {
    entry.target.classList.add('visible');
    // Ensure elements stay visible after appearing once
    observer.unobserve(entry.target);
}
        });
    }, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
fadeElements.forEach(el =\u003e observer.observe(el));

// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor =\u003e {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            // Don't prevent default for View All Projects button
            return;
        }

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// --- View All Projects Toggle ---
const viewAllBtn = document.querySelector('.btn-outline[href="#"]');
const hiddenProjects = document.querySelectorAll('.hidden-project');

if (viewAllBtn) {
    let isExpanded = false;
    viewAllBtn.addEventListener('click', (e) =\u003e {
        e.preventDefault();
        isExpanded = !isExpanded;

        hiddenProjects.forEach(project =\u003e {
            project.style.display = isExpanded ? 'block' : 'none';
        });

        viewAllBtn.textContent = isExpanded ? 'Show Less' : 'View All Projects';

        if(!isExpanded) {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}
});
