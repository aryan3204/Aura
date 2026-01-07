// ===================================================
// QUERY FORM → EMAIL (FormSubmit.co)
// ===================================================

const form = document.getElementById('queryForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/g.aryan4199@gmail.com';

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        successMessage.style.display = 'none';
        
        try {
            const response = await fetch(FORMSUBMIT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _captcha: false,
                    _subject: 'New Query from Aura 2026'
                })
            });
            
            if (response.ok) {
                // Clear form
                form.reset();
                
                // Show success message
                successMessage.style.display = 'block';
                submitBtn.textContent = 'SUBMIT QUERY';
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Error submitting form. Please try again.');
                submitBtn.textContent = 'SUBMIT QUERY';
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please try again.');
            submitBtn.textContent = 'SUBMIT QUERY';
            submitBtn.disabled = false;
        }
    });
}
