(() => {
  const content = document.querySelector('.docs-content');
  const toc = document.getElementById('toc');

  if (!content || !toc) return;

  const headings = [...content.querySelectorAll('h2[id], h3[id]')];
  if (headings.length === 0) return;

  const list = toc.querySelector('ul');
  const links = new Map();

  headings.forEach((heading) => {
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    const item = document.createElement('li');
    item.className = `toc-${heading.localName}`;
    item.append(link);
    list.append(item);
    links.set(heading, link);
  });

  toc.hidden = false;

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      const current = headings.find((heading) => visible.has(heading));
      if (!current) return;
      links.forEach((link, heading) => link.classList.toggle('active', heading === current));
    },
    { rootMargin: '-100px 0px -66%' },
  );

  headings.forEach((heading) => observer.observe(heading));
})();
