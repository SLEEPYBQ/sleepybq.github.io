(() => {
  const repos = JSON.parse(document.currentScript.dataset.githubRepos || '[]');

  repos.forEach(async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      if (!response.ok) return;
      const { stargazers_count: count } = await response.json();
      if (!Number.isInteger(count) || count < 0) return;

      const render = () => {
        let rendered = false;
        document.querySelectorAll('[data-github-stars]').forEach((link) => {
          if (link.dataset.githubStars !== repo) return;
          const stars = link.querySelector('.pub-github-stars');
          const number = link.querySelector('[data-star-count]');
          if (!stars || !number) return;
          number.textContent = count.toLocaleString('en-US');
          link.setAttribute('aria-label', `${repo} on GitHub, ${count} stars`);
          link.title = `${count.toLocaleString('en-US')} stars on GitHub`;
          stars.hidden = false;
          rendered = true;
        });
        return rendered;
      };

      if (render() || document.readyState !== 'loading') return;

      // A fast response can arrive before the publication card is parsed.
      const observer = new MutationObserver(() => {
        if (render()) observer.disconnect();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', () => observer.disconnect(), { once: true });
    } catch {
      // Keep the GitHub link available if its API cannot be reached.
    }
  });
})();
