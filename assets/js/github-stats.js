(() => {
  const CACHE_KEY = 'alkhizanah-repo-stats';
  const elements = document.querySelectorAll('[data-github-repo]');
  if (elements.length === 0) return;

  // Cached per browser session to stay well under GitHub's 60 requests/hour anonymous limit.
  const readCache = () => {
    try {
      return JSON.parse(sessionStorage.getItem(CACHE_KEY)) ?? {};
    } catch {
      return {};
    }
  };

  const writeCache = (cache) => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {}
  };

  const fetchStats = async (repo) => {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error(`GitHub API responded with ${response.status} for ${repo}`);

    const data = await response.json();
    return { stars: data.stargazers_count, forks: data.forks_count };
  };

  const render = (element, stats) => {
    element.querySelector('[data-stat="stars"]').textContent = stats.stars.toLocaleString();
    element.querySelector('[data-stat="forks"]').textContent = stats.forks.toLocaleString();
    element.hidden = false;
  };

  const load = async () => {
    const cache = readCache();
    const repos = [...new Set([...elements].map((element) => element.dataset.githubRepo))];
    const missing = repos.filter((repo) => !cache[repo]);

    const results = await Promise.allSettled(missing.map(fetchStats));
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') cache[missing[i]] = result.value;
      else console.warn(result.reason);
    });
    writeCache(cache);

    elements.forEach((element) => {
      const stats = cache[element.dataset.githubRepo];
      if (stats) render(element, stats);
    });
  };

  load();
})();
