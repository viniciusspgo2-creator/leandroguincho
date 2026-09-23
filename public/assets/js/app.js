'use strict';

(() => {
  const doc = document;
  const body = doc.body;
  const whatsapp = body.dataset.whatsapp || '5534996862805';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const q = (selector, context = doc) => context.querySelector(selector);
  const qa = (selector, context = doc) => Array.from(context.querySelectorAll(selector));

  function showToast(message, duration = 3600) {
    const toast = q('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), duration);
  }

  function openWhatsApp(message, useSameTab = false) {
    const url = `https://wa.me/${encodeURIComponent(whatsapp)}?text=${encodeURIComponent(message)}`;
    if (useSameTab) {
      window.location.href = url;
      return;
    }
    const opened = window.open(url, '_blank', 'noopener');
    if (!opened) window.location.href = url;
  }

  // Sticky header
  const header = q('[data-header]');
  if (header) {
    const updateHeader = () => header.classList.toggle('is-sticky', window.scrollY > 42);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // Mobile menu
  const menuToggle = q('[data-menu-toggle]');
  const mobileMenu = q('[data-mobile-menu]');
  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.hidden = !open;
    body.classList.toggle('menu-open', open);
  }
  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  qa('a', mobileMenu || doc).forEach(link => link.addEventListener('click', () => setMenu(false)));

  // Reveal animations
  qa('[data-reveal]').forEach(element => {
    const delay = Number(element.dataset.revealDelay || 0);
    element.style.setProperty('--reveal-delay', `${delay}ms`);
  });
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11, rootMargin: '0px 0px -40px' });
    qa('[data-reveal]').forEach(element => revealObserver.observe(element));
  } else {
    qa('[data-reveal]').forEach(element => element.classList.add('is-visible'));
  }

  // YouTube background loaded after the essential page content to preserve performance.
  const heroVideo = q('[data-hero-video]');
  if (heroVideo && window.innerWidth > 640 && !prefersReducedMotion) {
    const videoId = heroVideo.dataset.videoId;
    window.setTimeout(() => {
      const iframe = doc.createElement('iframe');
      iframe.title = 'Vídeo de fundo do Leandro Guincho';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.tabIndex = -1;
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${encodeURIComponent(videoId)}&modestbranding=1&playsinline=1&rel=0&disablekb=1`;
      iframe.addEventListener('load', () => heroVideo.classList.add('is-ready'));
      heroVideo.appendChild(iframe);
    }, 650);
  }

  // Service card lighting and tilt
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    qa('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      });
    });
  }

  // Location helper
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Seu navegador não oferece acesso à localização.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }),
        error => {
          const messages = {
            1: 'A permissão de localização foi negada. Você pode informar o endereço manualmente.',
            2: 'Não foi possível determinar sua localização agora.',
            3: 'A localização demorou demais para responder. Tente novamente.'
          };
          reject(new Error(messages[error.code] || 'Não foi possível acessar sua localização.'));
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    });
  }

  async function shareLocation(button) {
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Obtendo localização…';
    showToast('Autorize o acesso à localização no navegador.');
    try {
      const location = await getLocation();
      const map = `https://maps.google.com/?q=${location.latitude.toFixed(6)},${location.longitude.toFixed(6)}`;
      const accuracy = Number.isFinite(location.accuracy) ? ` (precisão aproximada: ${Math.round(location.accuracy)} m)` : '';
      openWhatsApp(`Olá! Preciso de atendimento de guincho. Minha localização atual é: ${map}${accuracy}`);
      showToast('Localização preparada no WhatsApp.');
    } catch (error) {
      showToast(error.message || 'Não foi possível obter sua localização.', 5200);
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  }
  qa('[data-location-button]').forEach(button => button.addEventListener('click', () => shareLocation(button)));

  const fillLocationButton = q('[data-fill-location]');
  fillLocationButton?.addEventListener('click', async () => {
    const input = q('[data-location-input]');
    if (!input) return;
    const original = fillLocationButton.innerHTML;
    fillLocationButton.disabled = true;
    fillLocationButton.textContent = 'Obtendo localização…';
    try {
      const location = await getLocation();
      input.value = `https://maps.google.com/?q=${location.latitude.toFixed(6)},${location.longitude.toFixed(6)}`;
      input.focus();
      showToast('Localização preenchida. Confira e envie a mensagem.');
    } catch (error) {
      showToast(error.message || 'Não foi possível obter sua localização.', 5200);
    } finally {
      fillLocationButton.disabled = false;
      fillLocationButton.innerHTML = original;
    }
  });

  // WhatsApp request form
  const requestForm = q('[data-whatsapp-form]');
  requestForm?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(requestForm);
    const name = String(data.get('name') || '').trim();
    const vehicle = String(data.get('vehicle') || '').trim();
    const issue = String(data.get('issue') || '').trim();
    const location = String(data.get('location') || '').trim();
    const lines = [
      'Olá! Preciso de atendimento de guincho.',
      name ? `Nome: ${name}` : '',
      vehicle ? `Veículo: ${vehicle}` : '',
      issue ? `Situação: ${issue}` : '',
      location ? `Localização/referência: ${location}` : 'Localização/referência: vou enviar em seguida.'
    ].filter(Boolean);
    openWhatsApp(lines.join('\n'));
  });

  // Video modal
  const videoModal = q('[data-video-modal]');
  const videoFrame = q('[data-video-frame]');
  let lastVideoTrigger = null;
  function closeVideo() {
    if (!videoModal) return;
    videoModal.hidden = true;
    if (videoFrame) videoFrame.innerHTML = '';
    body.classList.remove('modal-open');
    lastVideoTrigger?.focus();
  }
  qa('[data-video-open]').forEach(button => {
    button.addEventListener('click', () => {
      if (!videoModal || !videoFrame) return;
      lastVideoTrigger = button;
      const videoId = button.dataset.videoOpen;
      const iframe = doc.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = 'Vídeo institucional do Leandro Guincho';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      videoFrame.appendChild(iframe);
      videoModal.hidden = false;
      body.classList.add('modal-open');
      q('.video-modal__close', videoModal)?.focus();
    });
  });
  qa('[data-video-close]').forEach(button => button.addEventListener('click', closeVideo));

  // Lightbox
  const lightbox = q('[data-lightbox]');
  const lightboxImage = q('[data-lightbox-image]');
  let lastLightboxTrigger = null;
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImage) lightboxImage.src = '';
    body.classList.remove('modal-open');
    lastLightboxTrigger?.focus();
  }
  qa('[data-lightbox-src]').forEach(button => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lastLightboxTrigger = button;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightbox.hidden = false;
      body.classList.add('modal-open');
      q('.lightbox__close', lightbox)?.focus();
    });
  });
  qa('[data-lightbox-close]').forEach(button => button.addEventListener('click', closeLightbox));

  // FAQ accordion
  qa('.accordion-item > button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      const accordion = item.closest('[data-accordion]');
      const willOpen = !item.classList.contains('is-open');
      qa('.accordion-item', accordion || doc).forEach(other => {
        other.classList.remove('is-open');
        q('button', other)?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Testimonials
  const slides = qa('[data-review-slide]');
  let activeReview = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  function showReview(index) {
    if (!slides.length) return;
    activeReview = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === activeReview;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  }
  q('[data-review-prev]')?.addEventListener('click', () => showReview(activeReview - 1));
  q('[data-review-next]')?.addEventListener('click', () => showReview(activeReview + 1));
  if (slides.length > 1 && !prefersReducedMotion) {
    let reviewTimer = window.setInterval(() => showReview(activeReview + 1), 7000);
    const slider = q('[data-reviews-slider]');
    slider?.addEventListener('mouseenter', () => window.clearInterval(reviewTimer));
    slider?.addEventListener('mouseleave', () => {
      reviewTimer = window.setInterval(() => showReview(activeReview + 1), 7000);
    });
  }

  // ESC closes overlays and menu
  doc.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (videoModal && !videoModal.hidden) closeVideo();
    if (lightbox && !lightbox.hidden) closeLightbox();
    if (menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
})();
