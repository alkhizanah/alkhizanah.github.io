(() => {
  const STORAGE_KEY = 'alkhizanah-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  toggle?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  });
})();
