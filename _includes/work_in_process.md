<h2 id="preprint"><i class="ph ph-file-dashed"></i>Preprint</h2>

<ol class="pub-list">
{% for link in site.data.work_in_process.main %}
  <li class="pub">
    {% if link.image %}
    <div class="pub-media">
      <img src="{{ link.image }}" alt="" loading="lazy">
      {% if link.conference_short %}<span class="pub-venue-tag">{{ link.conference_short }}</span>{% endif %}
    </div>
    {% endif %}
    <div class="pub-body">
      <div class="pub-title">{% if link.pdf %}<a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>{% elsif link.code %}<a href="{{ link.code }}" target="_blank" rel="noopener">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</div>
      <div class="pub-authors">{{ link.authors }}</div>
      <div class="pub-venue"><em>{{ link.conference }}</em>{% if link.notes %} &middot; <span class="pub-note">{{ link.notes }}</span>{% endif %}</div>
      <div class="pub-links">
        {% if link.pdf %}<a href="{{ link.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif %}
        {% if link.code %}<a href="{{ link.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
        {% if link.page %}<a href="{{ link.page }}" target="_blank" rel="noopener">Website</a>{% endif %}
        {% if link.github_stars %}<a class="pub-github" href="https://github.com/{{ link.github_stars }}" target="_blank" rel="noopener" data-github-stars="{{ link.github_stars }}" aria-label="{{ link.github_stars }} on GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i><span>GitHub</span><span class="pub-github-stars"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91Z"/></svg><span data-star-count>Stars</span></span></a>{% endif %}
        {% if link.bibtex %}<a href="{{ link.bibtex }}" target="_blank" rel="noopener">BibTeX</a>{% endif %}
        {% if link.others %}{{ link.others }}{% endif %}
      </div>
    </div>
  </li>
{% endfor %}
</ol>
