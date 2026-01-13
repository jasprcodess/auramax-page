// Custom Cursor - Works on all pages
// Cursor starts hidden and only appears when mouse moves

(function() {
  // Check if device has pointer (not touch-only)
  if (!window.matchMedia("(pointer: fine)").matches) return;

  // Create cursor elements
  const cursor = document.createElement('div');
  const follower = document.createElement('div');

  cursor.id = 'custom-cursor';
  follower.id = 'custom-follower';

  // Cursor styles (inline to work without CSS file dependency)
  cursor.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: hsl(var(--accent-hue, 180), 80%, 55%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, width 0.15s ease, height 0.15s ease;
    opacity: 0;
  `;

  follower.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1px solid hsl(var(--accent-hue, 180), 80%, 55%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
    opacity: 0;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  // Hide default cursor
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;
  let isVisible = false;

  // Show cursor on first mouse move
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      follower.style.opacity = '0.5';
      followerX = mouseX;
      followerY = mouseY;
    }
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    if (mouseX > 0 && mouseY > 0) {
      cursor.style.opacity = '1';
      follower.style.opacity = '0.5';
      isVisible = true;
    }
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  function addHoverListeners() {
    document.querySelectorAll('a, button, [role="button"], input, .cursor-hover').forEach(el => {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.opacity = '0.8';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.opacity = '0.5';
      });
    });
  }

  // Run on load and observe for dynamic content
  addHoverListeners();
  const observer = new MutationObserver(addHoverListeners);
  observer.observe(document.body, { childList: true, subtree: true });
})();
