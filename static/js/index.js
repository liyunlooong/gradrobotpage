window.HELP_IMPROVE_VIDEOJS = false;

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById(burger ? burger.dataset.target : '');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  const carouselOptions = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  bulmaCarousel.attach('.carousel', carouselOptions);
  bulmaSlider.attach();

  const initializeComparison = (container) => {
    const beforeImage = container.querySelector('.before');
    const handle = container.querySelector('.handle');
    const leftLabel = container.querySelector('.label-left');
    const rightLabel = container.querySelector('.label-right');

    if (!beforeImage || !handle) {
      return;
    }

    if (leftLabel && container.dataset.labelLeft) {
      leftLabel.textContent = container.dataset.labelLeft;
    }

    if (rightLabel && container.dataset.labelRight) {
      rightLabel.textContent = container.dataset.labelRight;
    }

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percentage = (offsetX / rect.width) * 100;

      beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      handle.style.left = `${percentage}%`;
    };

    let isDragging = false;

    const startDrag = (event) => {
      isDragging = true;
      container.classList.add('is-active');
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      setPosition(clientX);
    };

    const moveDrag = (event) => {
      if (!isDragging) return;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      setPosition(clientX);
    };

    const endDrag = () => {
      isDragging = false;
      container.classList.remove('is-active');
    };

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);
  };

  document.querySelectorAll('.img-compare').forEach(initializeComparison);
});
