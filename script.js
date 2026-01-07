/* AURA 2026 LOGIC */

// 1. SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counters
            if(entry.target.querySelector('.count')) startCounters(entry.target);
            
            // Trigger bars (set width from inline style logic if needed, or CSS handles it)
            // Ideally, CSS transition handles width if class is added
            
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .fade-up').forEach((el) => observer.observe(el));

// 2. COUNTERS
function startCounters(section) {
    const counters = section.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 50;
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 3. FORM SUBMIT
const form = document.getElementById('queryForm');
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/g.aryan4199@gmail.com";

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const msg = document.getElementById('successMessage');
        const originalText = btn.textContent;
        const inputs = form.querySelectorAll('input, select, textarea');
        const formData = { _subject: "New Aura Inquiry", _captcha: "false" };
        
        inputs.forEach(input => {
            if(input.placeholder) formData[input.placeholder] = input.value;
            if(input.tagName === 'SELECT') formData['Category'] = input.value;
            if(input.tagName === 'TEXTAREA') formData['Message'] = input.value;
        });

        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch(FORMSUBMIT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
                msg.style.display = 'block';
                setTimeout(() => msg.style.display = 'none', 5000);
            }
        } catch (err) {
            btn.textContent = "Error";
            console.error(err);
        }
    });
}
