const body = document.body;
const logo = 'stackly-logo-icon.webp';
const page = body.dataset.page || 'home';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const publicNav = [
  ['home', 'Home', 'index.html'],
  ['tournaments', 'Tournaments', 'tournaments.html'],
  ['teams', 'Teams', 'teams.html'],
  ['services', 'Services', 'services.html'],
  ['about', 'About', 'about.html'],
  ['contact', 'Contact', 'contact.html']
];

const socialLinks = [
  ['youtube', 'YouTube', 'https://www.youtube.com/@stacklysports', 'M23 12s0-3.2-.3-4.5c-.2-.8-.8-1.4-1.6-1.6C18 5.5 12 5.5 12 5.5s-6 0-8.9.4c-.8.2-1.4.8-1.6 1.6C1 8.8 1 12 1 12s0 3.2.3 4.5c.2.8.8 1.4 1.6 1.6 2.9.4 8.9.4 8.9.4s6 0 8.9-.4c.8-.2 1.4-.8 1.6-1.6.3-1.3.3-4.5.3-4.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z'],
  ['instagram', 'Instagram', 'https://www.instagram.com/stacklysports', 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.7.3-.3.1-.5.3-.7.5-.2.2-.4.4-.5.7-.1.2-.3.6-.3 1.7-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.7.1.3.3.5.5.7.2.2.4.4.7.5.2.1.6.3 1.7.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.7-.3.3-.1.5-.3.7-.5.2-.2.4-.4.5-.7.1-.2.3-.6.3-1.7.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.7-.1-.3-.3-.5-.5-.7-.2-.2-.4-.4-.7-.5-.2-.1-.6-.3-1.7-.3-1.3-.1-1.7-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z'],
  ['x', 'X (formerly Twitter)', 'https://x.com/stacklysports', 'M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.5 3h6.4l4.4 5.8L17.5 3zm-1.1 16.1h1.7L7.6 4.8H5.8l10.6 14.3z'],
  ['whatsapp', 'WhatsApp', 'https://wa.me/15551234567', 'M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A9.9 9.9 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.6c-.1.2-.3.3-.1.5.2.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.2.1.4.1.5-.1l.8-.9c.2-.2.3-.2.5-.1l2 1c.2.1.4.2.4.3.1.1.1.6-.1 1.3z'],
  ['facebook', 'Facebook', 'https://www.facebook.com/stacklysports', 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z']
];

const socialRow = socialLinks.map(([key, label, , d]) => `<a class="social-link" href="404.html" aria-label="Stackly Sports on ${label}" title="${label}"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false"><path d="${d}"></path></svg></a>`).join('');

function markCurrent(items) {
  items.forEach(([key, label, href]) => {
    if (key === page) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.setAttribute('aria-current', 'page');
      return link;
    }
    return null;
  });
}

function renderPublicChrome() {
  const headerSlot = $('[data-site-header]');
  if (headerSlot) {
    const dark = body.dataset.header === 'dark';
    const nav = publicNav.map(([key, label, href]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    headerSlot.innerHTML = `
      <header class="site-header ${dark ? 'site-header--dark' : ''}" data-site-header>
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Stackly Sports home"><img src="${logo}" alt="" width="40" height="40"><span>STACKLY</span></a>
          <nav class="desktop-nav" aria-label="Primary navigation">${nav}</nav>
          <div class="header-actions"><a class="header-login" href="login.html">Log in</a></div>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="public-drawer" aria-expanded="false"><i></i><i></i><i></i></button>
        </div>
      </header>
      <div class="drawer-backdrop" data-drawer-backdrop></div>
      <aside class="mobile-drawer" id="public-drawer" aria-label="Mobile navigation" aria-hidden="true">
        <div class="drawer-top"><a class="brand" href="index.html"><img src="${logo}" alt="" width="40" height="40"><span>STACKLY</span></a><button class="drawer-close" type="button" data-drawer-close aria-label="Close navigation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div>
        <nav aria-label="Mobile primary navigation">${nav}</nav>
        <div class="drawer-actions"><a class="button button--accent drawer-login" href="login.html">Log in</a></div>
      </aside>`;
  }
  const footerSlot = $('[data-site-footer]');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand"><a class="brand" href="index.html"><img src="${logo}" alt="" width="40" height="40"><span>STACKLY</span></a><p>The calm command center for ambitious sports. Run tournaments, teams, scores, and every detail that makes game day feel effortless.</p><div class="social-row" aria-label="Stackly Sports on social media">${socialRow}</div></div>
            <div class="footer-column"><h3>Explore</h3><a href="index.html">Home</a><a href="about.html">About us</a><a href="tournaments.html">Tournaments</a><a href="teams.html">Teams</a><a href="contact.html">Contact</a></div>
            <div class="footer-column"><h3>Services</h3><a href="404.html">Tournament planning</a><a href="404.html">Live scoring</a><a href="404.html">Venue coordination</a><a href="404.html">Team &amp; roster tools</a><a href="404.html">Analytics &amp; reporting</a></div>
            <div class="footer-column footer-column--contact"><h3>Contact details</h3><span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg><span>hello@stackly.demo</span></span><span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>+1 (555) 123-4567</span></span><span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><span>partnerships@stackly.demo</span></span><span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Mon&ndash;Fri &middot; 9:00&ndash;18:00 UTC</span></span><span class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Remote-first &middot; Built for every venue</span></span></div>
          </div>
          <div class="footer-bottom"><span>© 2026 Stackly Sports. Demo experience, built for better game days.</span><div class="footer-bottom-links"><a href="404.html">Privacy</a><a href="404.html">Terms</a><a href="404.html">Accessibility</a></div></div>
        </div>
      </footer>`;
  }
}

function setupHeader() {
  const header = $('.site-header') || $('[data-site-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const toggle = $('.menu-toggle', header);
  const drawer = $('#public-drawer');
  const backdrop = $('[data-drawer-backdrop]');
  if (!toggle || !drawer || !backdrop) return;
  const close = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('is-locked');
  };
  const open = () => {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    body.classList.add('is-locked');
    $('[data-drawer-close]', drawer)?.focus();
  };
  toggle.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open());
  $('[data-drawer-close]', drawer)?.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  $$('a', drawer).forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
}

function setupReveals() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -28px' });
  items.forEach(item => observer.observe(item));
}

function setupCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;
  const format = value => Number(value).toLocaleString('en-US');
  const animate = element => {
    const target = Number(element.dataset.count);
    if (reducedMotion) {
      element.textContent = format(target);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .6 });
  counters.forEach(counter => observer.observe(counter));
}

function setupFilters() {
  $$('[data-filter-button]').forEach(button => {
    button.addEventListener('click', () => {
      const groupName = button.dataset.filterButton;
      const filter = button.dataset.filterValue || 'all';
      const target = document.querySelector(`[data-filter-target="${groupName}"]`);
      if (!target) return;
      const group = button.closest('.filter-row');
      $$('[data-filter-button]', group || document).forEach(item => item.classList.toggle('is-active', item === button));
      let visible = 0;
      $$('[data-category]', target).forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.hidden = !show;
        if (show) visible += 1;
      });
      const empty = $('[data-filter-empty]', target.parentElement);
      if (empty) empty.classList.toggle('is-visible', visible === 0);
    });
  });
}

function setupDropdowns() {
  $$('.custom-select').forEach(select => {
    const trigger = $('.select-trigger', select);
    const menu = $('.select-menu', select);
    const hidden = $('.select-hidden', select);
    if (!trigger || !menu || !hidden) return;
    const close = () => {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const choose = option => {
      hidden.value = option.dataset.value;
      trigger.textContent = option.dataset.label || option.textContent.trim();
      $$('.select-option', menu).forEach(item => item.setAttribute('aria-selected', String(item === option)));
      close();
      trigger.focus();
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
    };
    trigger.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      close();
      if (open) {
        menu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        const selected = $('.select-option[aria-selected="true"]', menu) || $('.select-option', menu);
        selected?.focus();
      }
    });
    $$('.select-option', menu).forEach(option => option.addEventListener('click', () => choose(option)));
    select.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
    menu.addEventListener('keydown', event => {
      const options = $$('.select-option', menu);
      const current = options.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const next = event.key === 'ArrowDown' ? (current + 1) % options.length : (current - 1 + options.length) % options.length;
        options[next]?.focus();
      }
    });
  });
  document.addEventListener('click', event => {
    $$('.custom-select').forEach(select => {
      if (!select.contains(event.target)) {
        $('.select-menu', select)?.classList.remove('is-open');
        $('.select-trigger', select)?.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function setupPasswordToggles() {
  $$('[data-password-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = document.getElementById(toggle.dataset.passwordToggle);
      if (!input) return;
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      toggle.textContent = visible ? 'Show' : 'Hide';
      toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
    });
  });
}

// The role pills are radios (label + hidden name="role" input). Clicking or
// arrowing an option slides the thumb and syncs the hidden value the login /
// signup handlers read — and clears any "choose the right role" error.
function setupRoleSwitches() {
  $$('.role-switch').forEach(sw => {
    const thumb = $('.role-thumb', sw);
    const opts = $$('.role-opt', sw);
    const hidden = sw.parentElement?.querySelector('input[name="role"]');
    opts.forEach(opt => {
      const radio = opt.querySelector('input[type="radio"]');
      radio?.addEventListener('change', () => {
        thumb?.classList.toggle('admin', radio.value === 'admin');
        opts.forEach(item => item.classList.toggle('on', item.contains(radio)));
        if (hidden) {
          hidden.value = radio.value;
          if (hidden.getAttribute('aria-invalid') === 'true') clearFieldError(hidden);
        }
      });
    });
  });
}

function findFieldError(input) {
  const group = input.closest('.field') || input.closest('.form-group') || input.closest('.custom-select');
  if (group) return group.querySelector('.field-error');
  const described = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
    .map(id => input.ownerDocument.getElementById(id))
    .find(node => node && node.classList.contains('field-error'));
  if (described) return described;
  return input.closest('form')?.querySelector('.field-error') || null;
}

function showFieldError(input, message) {
  const error = findFieldError(input);
  input.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
  else input.setAttribute('data-error', message);
}

function clearFieldError(input) {
  const error = findFieldError(input);
  input.removeAttribute('aria-invalid');
  if (error) error.textContent = '';
}

function validateInput(input) {
  const type = input.dataset.validate;
  const value = input.value.trim();
  let message = '';
  if (input.required && !value) message = 'This field is required.';
  if (!message && type === 'required' && !value) message = 'This field is required.';
  if (!message && type === 'name' && !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{2,}$/u.test(value)) message = 'Use at least 3 letters for your name.';
  if (!message && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) message = 'Enter a valid email address.';
  if (!message && type === 'phone' && !/^\d{10}$/.test(value)) message = 'Enter exactly 10 digits.';
  if (!message && type === 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) message = 'Use 8+ characters with upper, lower, and a number.';
  if (!message && type === 'confirm' && value !== (input.form?.querySelector('[data-validate="password"]')?.value || '')) message = 'Passwords do not match.';
  if (!message && type === 'message' && value.length < 12) message = 'Tell us a little more (12 characters minimum).';
  if (message) showFieldError(input, message);
  else clearFieldError(input);
  return !message;
}

function validateForm(form) {
  let valid = true;
  $$('[data-validate]', form).forEach(input => {
    if (!validateInput(input)) valid = false;
  });
  $$('input[type="checkbox"][required]', form).forEach(input => {
    const error = findFieldError(input);
    if (!input.checked) {
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = 'Please accept the demo terms to continue.';
      valid = false;
    } else {
      input.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
  });
  return valid;
}

function showToast(message, icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"/></svg>') {
  let toast = $('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    body.appendChild(toast);
  }
  toast.innerHTML = `<i>${icon}</i><span>${message}</span>`;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

async function hashPassword(value) {
  if (window.crypto?.subtle && window.TextEncoder) {
    const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return btoa(unescape(encodeURIComponent(value)));
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem('stacklyDemoUsers') || '[]'); } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('stacklyDemoUsers', JSON.stringify(users));
}

const DEMO_ACCOUNTS = [
  { name: 'Demo Team Manager', email: 'team@stackly.demo', phone: '9876543210', role: 'team' },
  { name: 'Demo Tournament Admin', email: 'admin@stackly.demo', phone: '9876543210', role: 'admin' }
];
const DEMO_PASSWORD = 'Demo1234';

// makes the prefilled demo login work on a fresh browser profile
async function seedDemoAccounts() {
  try {
    const users = getUsers();
    let changed = false;
    for (const account of DEMO_ACCOUNTS) {
      const passwordHash = await hashPassword(DEMO_PASSWORD);
      const existing = users.find(user => user.email === account.email);
      if (!existing) {
        users.push({ ...account, passwordHash, createdAt: new Date().toISOString() });
        changed = true;
      } else if (existing.passwordHash !== passwordHash) {
        existing.passwordHash = passwordHash;
        changed = true;
      }
    }
    if (changed) saveUsers(users);
  } catch { /* storage unavailable */ }
}

function setupForms() {
  $$('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
    input.addEventListener('change', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
    });
  });

  $$('input[type="checkbox"][required]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked && input.getAttribute('aria-invalid') === 'true') clearFieldError(input);
    });
  });

  const signup = $('#signup-form');
  if (signup) {
    signup.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(signup)) return;
      const role = signup.querySelector('[name="role"]');
      const users = getUsers();
      const email = signup.querySelector('[name="email"]').value.trim().toLowerCase();
      if (users.some(user => user.email === email)) {
        showFieldError(signup.querySelector('[name="email"]'), 'An account with this email already exists.');
        return;
      }
      const submit = signup.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.dataset.originalText = submit.textContent;
      submit.textContent = 'Creating workspace…';
      const password = signup.querySelector('[name="password"]').value;
      const user = {
        name: signup.querySelector('[name="name"]').value.trim(),
        email,
        phone: signup.querySelector('[name="phone"]').value.trim(),
        role: role?.value || 'team',
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
      sessionStorage.setItem('stacklySignupEmail', email);
      submit.disabled = false;
      submit.textContent = submit.dataset.originalText;
      window.location.href = 'login.html?created=1';
    });
  }

  const login = $('#login-form');
  if (login) {
    const created = new URLSearchParams(window.location.search).has('created');
    if (created) showToast('Workspace created. Sign in to continue.', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>');
    login.addEventListener('submit', async event => {
      event.preventDefault();
      if (!validateForm(login)) return;
      const email = login.querySelector('[name="email"]').value.trim().toLowerCase();
      const password = login.querySelector('[name="password"]').value;
      const role = login.querySelector('[name="role"]')?.value;
      const user = getUsers().find(item => item.email === email);
      if (!user || user.passwordHash !== await hashPassword(password)) {
        showFieldError(login.querySelector('[name="password"]'), 'Email or password is not correct.');
        return;
      }
      if (user.role !== role) {
        showFieldError(login.querySelector('[name="role"]'), `Choose the ${user.role === 'admin' ? 'Admin' : 'Team'} role to continue.`);
        return;
      }
      sessionStorage.setItem('stacklySession', JSON.stringify({ name: user.name, email: user.email, role: user.role, signedInAt: Date.now() }));
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'team-dashboard.html';
    });
  }

  const contact = $('#contact-form');
  if (contact) {
    contact.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateForm(contact)) return;
      const success = $('.form-success', contact.parentElement);
      if (success) success.classList.add('is-visible');
      showToast('Message received. Our team will reply within one business day.', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>');
      contact.reset();
      $$('[data-validate]', contact).forEach(input => clearFieldError(input));
    });
  }

  const newsletter = $('#newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', event => {
      event.preventDefault();
      const input = $('[data-validate="email"]', newsletter);
      if (!validateInput(input)) return;
      showToast('You are on the Stackly signal list. Welcome in.', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>');
      newsletter.reset();
      clearFieldError(input);
    });
  }
}

const RETURN_STACK_KEY = 'stacklyReturnStack';
// records the screen a same-tab click came from. document.referrer is empty
// when the site runs straight from disk (file://), so this is the only proof
// that browser Back can safely restore the previous screen.
const SAME_TAB_KEY = 'stacklyReturnSameTab';

function currentPageFile() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function readReturnStack() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RETURN_STACK_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch { return []; }
}

function writeReturnStack(stack) {
  try { sessionStorage.setItem(RETURN_STACK_KEY, JSON.stringify(stack.slice(-12))); } catch { /* storage unavailable */ }
}

function pushReturnPage(file, sameTab = true) {
  const stack = readReturnStack().filter(item => item !== file);
  stack.push(file);
  writeReturnStack(stack);
  recordReturnScroll(file);
  try {
    if (sameTab) sessionStorage.setItem(SAME_TAB_KEY, file);
    else sessionStorage.removeItem(SAME_TAB_KEY);
  } catch { /* storage unavailable */ }
}

// remembers how far down the returning screen was scrolled, so "Go back" lands
// on the exact section the visitor left, not just the top of the page.
const RETURN_SCROLL_KEY = 'stacklyReturnScroll';

function recordReturnScroll(file) {
  try {
    sessionStorage.setItem(RETURN_SCROLL_KEY, JSON.stringify({ file, y: Math.round(window.scrollY) || 0 }));
  } catch { /* storage unavailable */ }
}

function restoreReturnScroll(file) {
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(RETURN_SCROLL_KEY) || 'null');
    sessionStorage.removeItem(RETURN_SCROLL_KEY);
  } catch { /* storage unavailable */ }
  if (!saved || saved.file !== file || !saved.y) return;
  // instant, not smooth: this is a restored position, not a new journey
  const apply = () => window.scrollTo({ top: saved.y, behavior: 'instant' });
  requestAnimationFrame(() => requestAnimationFrame(apply));
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => requestAnimationFrame(apply), { once: true });
  }
}

// remembers the dashboard section the visitor was reading when they left for
// the 404 screen, so "Go back" restores that exact screen, not just the page.
const RETURN_SECTION_KEY = 'stacklyReturnSection';

function recordReturnSection(file, section) {
  if (!section) return;
  try { sessionStorage.setItem(RETURN_SECTION_KEY, JSON.stringify({ file, section })); } catch { /* storage unavailable */ }
}

function consumeReturnSection(file) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(RETURN_SECTION_KEY) || 'null');
    if (!saved || saved.file !== file) return null;
    sessionStorage.removeItem(RETURN_SECTION_KEY);
    return saved.section;
  } catch { return null; }
}

function consumeSameTabReturn() {
  try {
    const file = sessionStorage.getItem(SAME_TAB_KEY) || null;
    sessionStorage.removeItem(SAME_TAB_KEY);
    return file;
  } catch { return null; }
}

function peekReturnPage() {
  const stack = readReturnStack();
  return stack.length ? stack[stack.length - 1] : null;
}

function popReturnPage() {
  const stack = readReturnStack();
  const page = stack.pop() || null;
  writeReturnStack(stack);
  return page;
}

function dashboardForRole() {
  try {
    const session = JSON.parse(sessionStorage.getItem('stacklySession') || 'null');
    if (session?.role === 'admin') return 'admin-dashboard.html';
    if (session?.role === 'team') return 'team-dashboard.html';
  } catch { /* storage unavailable */ }
  return null;
}

function isErrorPage(file) {
  return file === '404.html' || file === '404dash.html';
}

// the page we were actually served from, but only when it is on this site.
// a cross-origin referrer (search engine, another site) must not be trusted:
// history.back() there would drop the visitor outside Stackly entirely.
function inSiteReferrer() {
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const file = url.pathname.split('/').pop() || 'index.html';
    return isErrorPage(file) ? null : file;
  } catch { return null; }
}

// "Go back" returns to the screen the visitor was on before the error page,
// in this very viewport, never outside the site and never into a loop.
// Order of preference:
//   1. a same-tab click we recorded ourselves, confirmed against the referrer
//      or the recorded page: browser Back restores that screen exactly,
//      scroll position (the section they were reading) included
//   2. the in-site referrer, loaded directly when this tab has no history to
//      go back to (the error page was opened as the only entry)
//   3. the page the click recorded, when the referrer is missing or untrusted
//      (file:// sends no referrer at all)
//   4. the page's own safe fallback
// a recorded entry is only consumed once it is genuinely used.
function goBackOr(fallback) {
  const here = currentPageFile();
  const referrer = inSiteReferrer();
  const recorded = peekReturnPage();
  const usable = file => Boolean(file) && file !== here && !isErrorPage(file);
  const from = consumeSameTabReturn();
  const sameTab = Boolean(from) && (from === referrer || from === recorded);

  if (sameTab && window.history.length > 1) {
    if (peekReturnPage() === from) popReturnPage();
    window.history.back();
    return;
  }
  if (usable(referrer)) {
    if (peekReturnPage() === referrer) popReturnPage();
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = referrer;
    return;
  }
  if (usable(recorded)) {
    popReturnPage();
    window.location.href = recorded;
    return;
  }
  window.location.href = fallback || 'index.html';
}

function setupDashboard() {
  const dashboard = $('[data-dashboard]');
  if (!dashboard) return;
  const sessionRaw = sessionStorage.getItem('stacklySession');
  let session = null;
  try { session = JSON.parse(sessionRaw || 'null'); } catch { session = null; }
  if (!session || !session.role) {
    window.location.href = 'login.html';
    return;
  }
  const roleLabel = session.role === 'admin' ? 'Administrator' : 'Team manager';
  $$('[data-user-name]').forEach(element => { element.textContent = session.name; });
  $$('[data-role-name]').forEach(element => { element.textContent = roleLabel; });
  $$('[data-user-initials]').forEach(element => { element.textContent = session.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); });
  $$('[data-user-email]').forEach(element => { element.textContent = session.email || session.name; });
  $$('[data-logout]').forEach(button => button.addEventListener('click', () => {
    sessionStorage.removeItem('stacklySession');
    window.location.href = 'login.html';
  }));
  const sidebar = $('.dashboard-sidebar');
  const backdrop = $('[data-dashboard-backdrop]');
  const menu = $('[data-dashboard-menu]');
  const closeSidebar = () => {
    sidebar?.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    body.classList.remove('is-locked');
  };
  menu?.addEventListener('click', () => {
    sidebar?.classList.add('is-open');
    backdrop?.classList.add('is-open');
    body.classList.add('is-locked');
  });
  $('[data-sidebar-close]')?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navTargets = $$('.dashboard-nav a[href^="#"]')
    .map(link => ({ link, section: document.querySelector(link.getAttribute('href') || '') }))
    .filter(item => item.section);
  // Sidebar links behave like tabs: the matching section swaps in on the same
  // page (no scrolling to an anchor further down the document).
  const showSection = section => {
    navTargets.forEach(item => { item.section.hidden = item.section !== section; });
  };
  const setActiveNav = active => {
    navTargets.forEach(item => {
      const isActive = item === active;
      item.link.classList.toggle('is-active', isActive);
      if (isActive) item.link.setAttribute('aria-current', 'page');
      else item.link.removeAttribute('aria-current');
    });
  };
  const openSection = item => {
    showSection(item.section);
    setActiveNav(item);
    closeSidebar();
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };
  navTargets.forEach(item => {
    item.link.addEventListener('click', event => {
      event.preventDefault();
      openSection(item);
    });
  });
  if (navTargets.length) {
    const fromHash = navTargets.find(item => '#' + item.section.id === window.location.hash);
    const restoredId = fromHash ? null : consumeReturnSection(currentPageFile());
    const restored = restoredId ? navTargets.find(item => item.section.id === restoredId) : null;
    const initial = fromHash || restored || navTargets[0];
    showSection(initial.section);
    setActiveNav(initial);
  }
  // Demo controls leave the prototype for the 404 dashboard screen. Sidebar
  // tabs, the mobile menu, sign-out, and dashboard cards keep working normally.
  // The trip is recorded exactly like the public demo router records a 404, so
  // the dashboard's "Go back" button restores the same screen and section.
  const activeSectionId = () => {
    const active = navTargets.find(item => item.link.classList.contains('is-active'));
    return active ? active.section.id : '';
  };
  const leaveDashboard = () => {
    pushReturnPage(currentPageFile());
    recordReturnSection(currentPageFile(), activeSectionId());
    window.location.href = '404dash.html';
  };
  $$('[data-dashboard-demo]').forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    leaveDashboard();
  }));
}

function setupPublicDemoLinks() {
  // 404dash.html falls back to the visitor's own dashboard, not the public home
  const fallback = page === '404dash' ? (dashboardForRole() || 'login.html') : 'index.html';
  $$('[data-go-back]').forEach(button => button.addEventListener('click', () => {
    goBackOr(fallback);
  }));
  const returnLink = $('[data-dashboard-return]');
  if (returnLink) {
    returnLink.href = dashboardForRole() || 'login.html';
  }
}

// Keeps "Go back" pointed at the screen the visitor came from:
//   - every link that leads to an error page records the screen it was clicked
//     on, including plain anchors the demo router never touches (footer, card
//     links, social rows). document.referrer is empty on file://, so without
//     this record "Go back" would have no idea where the visitor came from.
//   - stale markers are cleared and the returning screen's scroll position is
//     restored as soon as a real page loads again.
// Capture phase, so it runs before the demo router rewrites the navigation.
function setupReturnTracking() {
  const here = currentPageFile();
  if (isErrorPage(here)) return;
  consumeSameTabReturn();
  restoreReturnScroll(here);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || (link.target && link.target !== '_self')) return;
    let file = null;
    try { file = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html'; } catch { return; }
    if (!isErrorPage(file)) return;
    const sameTab = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
    pushReturnPage(currentPageFile(), sameTab);
  }, true);
}

const DEMO_PAGES = ['home', 'tournaments', 'teams', 'services', 'about', 'contact'];
const KEEP_CLICKABLE = [
  '.menu-toggle', '.drawer-close', '[data-drawer-close]', '[data-drawer-backdrop]',
  '.skip-link', '.select-trigger', '.select-option', '[data-filter-button]',
  '[data-modal-open]', 'button[data-modal-close]', '[data-go-back]', '[data-live-link]',
  '.site-header a', '.site-header button', '.mobile-drawer a', '.mobile-drawer button',
  '.site-footer a', '.site-footer button'
].join(', ');

function setupDemoRouting() {
  if (!DEMO_PAGES.includes(page)) return;
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('a, button');
    if (!target || target.closest(KEEP_CLICKABLE)) return;
    if (target.matches('a[href^="#"]')) return;
    if (target.matches('a[href="login.html"]')) return;
    const form = target.closest('form');
    if (form && target.matches('button[type="submit"], input[type="submit"]')) return;
    event.preventDefault();
    pushReturnPage(currentPageFile());
    window.location.href = '404.html';
  });
}

function setupModals() {
  let openModal = null;
  const closeModal = modal => {
    if (!modal) return;
    modal.hidden = true;
    modal.classList.remove('is-open');
    $('.modal-backdrop')?.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    openModal = null;
  };
  $$('[data-modal-open]').forEach(trigger => trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modalOpen);
    if (!modal) return;
    modal.hidden = false;
    $('.modal-backdrop')?.classList.add('is-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.classList.add('is-locked');
    openModal = modal;
    $('[data-modal-close]', modal)?.focus();
  }));
  $$('[data-modal-close]').forEach(item => item.addEventListener('click', () => closeModal(item.closest('[role="dialog"]') || openModal)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal(openModal);
    if (event.key === 'Tab' && openModal) {
      const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', openModal).filter(item => !item.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

function setupMagneticElements() {
  if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
  $$('.button, .quick-action, .card-icon').forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .12;
      const y = (event.clientY - rect.top - rect.height / 2) * .12;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}

function setupParallax() {
  if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
  const items = $$('[data-parallax]');
  if (!items.length) return;
  let frame = false;
  window.addEventListener('scroll', () => {
    if (frame) return;
    frame = true;
    requestAnimationFrame(() => {
      const viewport = window.innerHeight;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const amount = (rect.top + rect.height / 2 - viewport / 2) * -0.035;
        item.style.setProperty('--parallax-y', `${amount}px`);
      });
      frame = false;
    });
  }, { passive: true });
}

function boot() {
  renderPublicChrome();
  seedDemoAccounts();
  body.classList.add('page-transition');
  setupHeader();
  setupReveals();
  setupCounters();
  setupFilters();
  setupDropdowns();
  setupPasswordToggles();
  setupRoleSwitches();
  setupForms();
  setupDashboard();
  setupPublicDemoLinks();
  setupReturnTracking();
  setupDemoRouting();
  setupModals();
  setupMagneticElements();
  setupParallax();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
