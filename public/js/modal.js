/**
 * Modal utility functions
 */
const Modal = {
  /**
   * Show a modal by ID
   * @param {string} modalId - The ID of the modal to show
   */
  show(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  },

  /**
   * Hide a modal by ID
   * @param {string} modalId - The ID of the modal to hide
   */
  hide(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  },

  /**
   * Show a success message modal
   * @param {string} message - The message to display
   */
  showSuccess(message) {
    const modal = document.getElementById("successModal");
    if (modal) {
      const messageEl = modal.querySelector(".modal-message");
      if (messageEl) {
        messageEl.textContent = message;
      }
      this.show("successModal");
    }
  },

  /**
   * Show an error message modal
   * @param {string} message - The error message to display
   */
  showError(message) {
    const modal = document.getElementById("errorModal");
    if (modal) {
      const messageEl = modal.querySelector(".modal-message");
      if (messageEl) {
        messageEl.textContent = message;
      }
      this.show("errorModal");
    }
  },

  /**
   * Show confirmation modal with user data
   * @param {Object} data - The form data to display
   */
  showConfirmation(data) {
    const modal = document.getElementById("confirmModal");
    if (modal) {
      // Update confirmation data
      const nameEl = modal.querySelector('[data-confirm="name"]');
      const emailEl = modal.querySelector('[data-confirm="email"]');
      const shopnameEl = modal.querySelector('[data-confirm="shopname"]');

      if (nameEl) nameEl.textContent = data.name || "-";
      if (emailEl) emailEl.textContent = data.email || "-";
      if (shopnameEl) shopnameEl.textContent = data.shopname || "-";

      this.show("confirmModal");
    }
  },
};

// Initialize modal close buttons
document.addEventListener("DOMContentLoaded", () => {
  // Close button handlers
  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const modalId = button.getAttribute("data-close-modal");
      Modal.hide(modalId);
    });
  });

  // Click outside to close
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        Modal.hide(overlay.id);
      }
    });
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach((modal) => {
        if (modal.style.display === "flex") {
          Modal.hide(modal.id);
        }
      });
    }
  });
});

// Export for use in other scripts
window.Modal = Modal;
