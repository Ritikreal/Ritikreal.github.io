(function () {
  function navigateWithSlide(targetUrl, direction = 'forward') {
    document.documentElement.classList.remove('page-in');
    document.documentElement.classList.add('page-out');

    const delay = 420;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, delay);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    const dir = a.getAttribute('
