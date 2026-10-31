document.querySelectorAll('[data-github-stars]').forEach(async (link) => {
  const repo = link.dataset.githubStars;
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    if (!response.ok) return;
    const { stargazers_count: count } = await response.json();
    if (!Number.isInteger(count) || count < 0) return;
    link.querySelector('[data-star-count]').textContent = count.toLocaleString('en-US');
    link.setAttribute('aria-label', `${repo} on GitHub, ${count} stars`);
    link.title = `${count.toLocaleString('en-US')} stars on GitHub`;
  } catch {
    // Keep the GitHub link available if its API cannot be reached.
  }
});
