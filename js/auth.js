(() => {
  // Theme initialization
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('rentora-theme') || 'light';
  const savedDirection = localStorage.getItem('rentora-direction') || 'ltr';
  root.dataset.theme = savedTheme;
  root.dir = savedDirection;

  // RTL/LTR Toggle
  const dirBtn = document.getElementById('authDirToggle');
  const dirLabel = document.getElementById('authDirLabel');
  if (dirBtn && dirLabel) {
    dirLabel.textContent = (root.dir === 'rtl') ? 'RTL' : 'LTR';
    dirBtn.addEventListener('click', () => {
      const nextDir = root.dir === 'rtl' ? 'ltr' : 'rtl';
      root.dir = nextDir;
      dirLabel.textContent = nextDir.toUpperCase();
      localStorage.setItem('rentora-direction', nextDir);
    });
  }

  // Theme Toggle
  const themeBtn = document.getElementById('authThemeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      localStorage.setItem('rentora-theme', nextTheme);
    });
  }

  // Password visibility toggle
  const togglePwdButtons = document.querySelectorAll('.auth-toggle-pwd');
  togglePwdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      // Toggle SVG state
      btn.innerHTML = isPassword
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  });

  // Message banner helper
  const msgBox = document.getElementById('authMessage');
  function showMessage(type, text) {
    if (!msgBox) return;
    msgBox.className = `auth-message ${type}`;
    const icon = type === 'error'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;
    msgBox.innerHTML = `${icon}<span>${text}</span>`;
  }

  // Social Login (Google & Apple)
  const googleBtn = document.getElementById('btnGoogleAuth');
  const appleBtn = document.getElementById('btnAppleAuth');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showMessage('success', 'Authenticating securely with Google OAuth...');
      setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 900);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showMessage('success', 'Authenticating securely with Apple ID...');
      setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 900);
    });
  }

  // Login Form Submission
  const loginForm = document.getElementById('rentoraLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;

      if (!email || !password) {
        showMessage('error', 'Please enter both your email address and password.');
        return;
      }

      showMessage('success', 'Welcome back! Redirecting to your dashboard...');
      setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 800);
    });
  }

  // Register Form Submission
  const registerForm = document.getElementById('rentoraRegisterForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('regName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const password = document.getElementById('regPassword')?.value;
      const terms = document.getElementById('regTerms');

      if (!fullName || !email || !password) {
        showMessage('error', 'Please complete all required fields.');
        return;
      }

      if (terms && !terms.checked) {
        showMessage('error', 'Please accept the Terms of Service to create your account.');
        return;
      }

      if (password.length < 8) {
        showMessage('error', 'Password should contain at least 8 characters.');
        return;
      }

      showMessage('success', `Account created successfully, ${fullName}! Launching your workspace...`);
      setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 900);
    });
  }
})();
