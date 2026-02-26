// public/js/register.js

// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Clear previous errors
    const errorElements = [
      "name-error",
      "shopname-error",
      "email-error",
      "password-error",
    ];
    errorElements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.textContent = "";
    });

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show confirmation modal first
    if (window.Modal) {
      window.Modal.showConfirmation(data);

      // Wait for user to confirm
      return;
    }
  });
});

/**
 * Handle the actual registration after confirmation
 */
async function confirmRegistration() {
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Hide confirmation modal
  if (window.Modal) {
    window.Modal.hide("confirmModal");
  }

  // Disable submit button
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  `;

  const backendUrl = "http://localhost:8000/api/register";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // Success
      if (window.Modal) {
        window.Modal.showSuccess(
          "Registration successful! Your account has been created and you can now login."
        );
      }

      // Store user info in localStorage (optional, but can be useful)
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      // Reset form
      form.reset();

      // Construct the tenant-specific login URL and store it for the modal button
      if (result.tenant_domain) {
        const tenantLoginUrl = `http://${result.tenant_domain}/admin/login`;
        window.tempTenantLoginUrl = tenantLoginUrl;
      }
    } else if (response.status === 422) {
      // Validation errors
      if (result.errors) {
        let errorMessages = [];

        if (result.errors.name) {
          document.getElementById("name-error").textContent =
            result.errors.name[0];
          errorMessages.push(result.errors.name[0]);
        }
        if (result.errors.shopname) {
          document.getElementById("shopname-error").textContent =
            result.errors.shopname[0];
          errorMessages.push(result.errors.shopname[0]);
        }
        if (result.errors.email) {
          document.getElementById("email-error").textContent =
            result.errors.email[0];

          // Check if email is already taken
          if (
            result.errors.email[0].toLowerCase().includes("taken") ||
            result.errors.email[0].toLowerCase().includes("already")
          ) {
            if (window.Modal) {
              window.Modal.showError(
                "This email address is already registered. Please use a different email or try logging in."
              );
            }
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            return;
          }
          errorMessages.push(result.errors.email[0]);
        }
        if (result.errors.password) {
          document.getElementById("password-error").textContent =
            result.errors.password[0];
          errorMessages.push(result.errors.password[0]);
        }

        // Show error modal with all messages
        if (window.Modal && errorMessages.length > 0) {
          window.Modal.showError(errorMessages.join("\n"));
        }
      } else {
        if (window.Modal) {
          window.Modal.showError("Please check your input and try again.");
        }
      }
    } else if (response.status === 429) {
      if (window.Modal) {
        window.Modal.showError(
          "Too many attempts. Please wait a moment and try again."
        );
      }
    } else if (response.status === 500 || (result.message && result.message.toLowerCase().includes('too many attempts'))) {
      if (window.Modal) {
        window.Modal.showError(
          "Server error occurred. Please try again later or contact support."
        );
      }
    } else {
      const errorMessage =
        result.message || "An unexpected error occurred. Please try again.";
      if (window.Modal) {
        window.Modal.showError(errorMessage);
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    if (window.Modal) {
      window.Modal.showError(
        "Could not connect to the server. Please check your connection and try again."
      );
    }
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
}

// Make function available globally
window.confirmRegistration = confirmRegistration;
