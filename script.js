// Intersection Observer for scroll reveal
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Subtle parallax on hero content
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ==========================================
// QUERY FORM → GOOGLE SHEETS
// ==========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyzDOh3T5mTt_qEITySQbKNEJZYqy8LyvwjZzfRStWJvK2RfFpxb6sNoIkIS52J84zSng/exec";

const form = document.getElementById("queryForm");
const statusEl = document.getElementById("queryStatus");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    
    // Show sending status
    statusEl.textContent = "Sending...";
    statusEl.style.color = "#ffa500";
    
    // Get form values
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    // Validate
    if (!name || !email || !message) {
      statusEl.textContent = "Please fill all fields.";
      statusEl.style.color = "#ff6b6b";
      return;
    }

    try {
      // Send to Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          name: name,
          email: email,
          message: message
        })
      });

      // Check if response is OK
      if (response.ok) {
        // Success!
        statusEl.textContent = "✓ Thanks for reaching out. We'll get back to you soon.";
        statusEl.style.color = "#00ff88";
        
        // Reset form
        form.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
          statusEl.textContent = "";
        }, 5000);
      } else {
        statusEl.textContent = "Error submitting. Please try again.";
        statusEl.style.color = "#ff6b6b";
      }
    } catch (err) {
      console.error("Fetch error:", err);
      statusEl.textContent = "Network error. Please check your connection.";
      statusEl.style.color = "#ff6b6b";
    }
  });
}
