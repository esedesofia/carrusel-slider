const carousel = document.querySelector('.carousel');
const navButtons = document.querySelectorAll('.nav-btn');
const carouselContainer = document.querySelector('.carousel-container');
const scrollTopBtn = document.querySelector('.btn-scroll-to-top');
const startImg = document.querySelector('.start-img');

let scrollTimeout;
let touchStartY;

function handleScroll(activeIndex) {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    carouselContainer.scrollTo({
      top: activeIndex * window.innerHeight,
      behavior: 'smooth',
    });
    updateActiveButton(activeIndex);
  }, 300);
}

scrollTopBtn.addEventListener('click', function () {
  startImg.scrollIntoView({
    top: 0,
    behavior: 'smooth',
  });
  updateActiveButton(0);
});

carouselContainer.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

carouselContainer.addEventListener('touchmove', (e) => {
  const touchEndY = e.touches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  let activeIndex = Math.round(
    carouselContainer.scrollTop / window.innerHeight
  );

  if (deltaY > 50 && activeIndex < navButtons.length - 1) {
    handleScroll(activeIndex + 1);
  } else if (deltaY < -50 && activeIndex > 0) {
    handleScroll(activeIndex - 1);
  }

  touchStartY = touchEndY;
});

navButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    handleScroll(index);
  });
});

document.addEventListener('keydown', (event) => {
  let activeIndex = Math.round(
    carouselContainer.scrollTop / window.innerHeight
  );

  if (event.key === 'ArrowDown' && activeIndex < navButtons.length - 1) {
    handleScroll(activeIndex + 1);
  } else if (event.key === 'ArrowUp' && activeIndex > 0) {
    handleScroll(activeIndex - 1);
  }
});

carouselContainer.addEventListener('wheel', (event) => {
  let activeIndex = Math.round(
    carouselContainer.scrollTop / window.innerHeight
  );

  if (event.deltaY > 0 && activeIndex < navButtons.length - 1) {
    handleScroll(activeIndex + 1);
  } else if (event.deltaY < 0 && activeIndex > 0) {
    handleScroll(activeIndex - 1);
  }
});

function updateActiveButton(activeIndex) {
  navButtons.forEach((btn, index) => {
    btn.classList.toggle('active', index === activeIndex);
  });
}

updateActiveButton(0);
