const TRANSITION_DURATION = 450;
let isNavigating = false;

document.addEventListener('DOMContentLoaded', () => {
  prepareForTransition();

  waitforContent().then(() => {
    requestAnimationFrame(() => {
      fadeInPage();
    });
  });

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!shouldHandleLinkClick(e, anchor)) return;

    e.preventDefault();
    navigateWithTransition(anchor.href);
  });
});

function getTransitionElements() {
  return {
    mainContainer: document.querySelector('.main-container'),
    footer: document.querySelector('footer')
  };
}

function prepareForTransition() {
  const { mainContainer, footer } = getTransitionElements();
  const transitionStyle = `opacity ${TRANSITION_DURATION}ms ease, transform ${TRANSITION_DURATION}ms ease, filter ${TRANSITION_DURATION}ms ease`;

  if (mainContainer) {
    mainContainer.style.opacity = '0';
    mainContainer.style.transform = 'translateY(8px)';
    mainContainer.style.filter = 'blur(2px)';
    mainContainer.style.transition = transitionStyle;
  }

  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(8px)';
    footer.style.filter = 'blur(2px)';
    footer.style.transition = transitionStyle;
  }
}

function fadeInPage() {
  const { mainContainer, footer } = getTransitionElements();

  if (mainContainer) {
    mainContainer.style.opacity = '1';
    mainContainer.style.transform = 'translateY(0)';
    mainContainer.style.filter = 'blur(0)';
  }

  if (footer) {
    footer.style.opacity = '1';
    footer.style.transform = 'translateY(0)';
    footer.style.filter = 'blur(0)';
  }
}

function shouldHandleLinkClick(e, anchor) {
  if (!anchor || !anchor.href) return false;
  if (e.defaultPrevented || e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;

  const hrefAttribute = anchor.getAttribute('href') || '';
  if (hrefAttribute.startsWith('#')) return false;

  const url = new URL(anchor.href, window.location.href);
  return url.origin === window.location.origin;
}

function waitforContent() {
  return new Promise((resolve) => {
    let resolved = false;
    let headerLoaded = false;
    let contentLoaded = false;

    const safeResolve = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    const checkIfComplete = () => {
      if (headerLoaded && contentLoaded) {
        safeResolve();
      }
    };

    const headerInterval = setInterval(() => {
      const nav = document.querySelector('header nav ul');
      if (nav && nav.children.length > 0) {
        headerLoaded = true;
        clearInterval(headerInterval);
        checkIfComplete();
      }
    }, 50);

    const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    if (isIndexPage) {
      const worksSection = document.getElementById('works-section');
      if (worksSection) {
        const worksInterval = setInterval(() => {
          if (worksSection.children.length > 0) {
            contentLoaded = true;
            clearInterval(worksInterval);
            checkIfComplete();
          }
        }, 50);

        setTimeout(() => {
          clearInterval(worksInterval);
          contentLoaded = true;
          checkIfComplete();
        }, 1500);
      } else {
        contentLoaded = true;
        checkIfComplete();
      }
    } else {
      setTimeout(() => {
        contentLoaded = true;
        checkIfComplete();
      }, 300);
    }

    setTimeout(() => {
      clearInterval(headerInterval);
      headerLoaded = true;
      contentLoaded = true;
      safeResolve();
    }, 2000);
  });
}

function navigateWithTransition(url) {
  if (isNavigating) return;
  isNavigating = true;

  const { mainContainer, footer } = getTransitionElements();

  if (mainContainer) {
    mainContainer.style.opacity = '0';
    mainContainer.style.transform = 'translateY(-8px)';
    mainContainer.style.filter = 'blur(2px)';
    mainContainer.style.pointerEvents = 'none';
  }

  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(-8px)';
    footer.style.filter = 'blur(2px)';
    footer.style.pointerEvents = 'none';
  }

  setTimeout(() => {
    window.location.href = url;
  }, TRANSITION_DURATION);
}