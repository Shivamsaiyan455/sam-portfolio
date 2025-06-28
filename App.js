document.addEventListener("DOMContentLoaded", function () {
  // Project video hover effect
  const videos = document.querySelectorAll('.project-video');
  const hoverSigns = document.querySelectorAll('.hover-sign');

  videos.forEach((video, index) => {
    const hoverSign = hoverSigns[index];

    video.addEventListener("mouseenter", () => {
      video.play();
      hoverSign?.classList.add("active");
    });

    video.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      hoverSign?.classList.remove("active");
    });
  });

  // Sidebar toggles (check if sidebar exists!)
  const sideBar = document.querySelector('.sidebar');
  const menu = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');

  if (menu && sideBar && closeIcon) {
    menu.addEventListener("click", () => {
      sideBar.classList.remove("close-sidebar");
      sideBar.classList.add("open-sidebar");
    });

    closeIcon.addEventListener("click", () => {
      sideBar.classList.remove("open-sidebar");
      sideBar.classList.add("close-sidebar");
    });
  }

  // Contact form submission
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      fetch(form.action, {
        method: form.method,
        body: new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          alert('Thank you! Your message has been sent.');
          form.reset();
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      })
      .catch(() => {
        alert('Oops! There was a problem submitting your form');
      });
    });
  }
});
