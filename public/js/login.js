// public/js/login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lookupForm');
  const errorElement = document.getElementById('shopname-error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorElement.textContent = '';
    
    const shopname = form.elements.shopname.value;
    if (!shopname) {
      errorElement.textContent = 'Please enter your shop name.';
      return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Finding...';

    try {
      const backendUrl = window.BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/lookup-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ shopname: shopname }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to the tenant-specific login page
        window.location.href = `http://${result.tenant_domain}/admin/login`;
      } else {
        errorElement.textContent = result.message || 'Shop not found.';
      }
    } catch (error) {
      errorElement.textContent = 'Could not connect to the server.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Find My Login Page';
    }
  });
});
