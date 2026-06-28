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
      <div class="pub-title">{% if link.pdf %}<a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</div>
      <div class="pub-authors">{{ link.authors }}</div>
      <div class="pub-venue"><em>{{ link.conference }}</em>{% if link.notes %} &middot; <span class="pub-note">{{ link.notes }}</span>{% endif %}</div>
      <div class="pub-links">
        {% if link.pdf %}<a href="{{ link.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif %}
        {% if link.code %}<a href="{{ link.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
        {% if link.page %}<a href="{{ link.page }}" target="_blank" rel="noopener">Project</a>{% endif %}
        {% if link.bibtex %}<a href="{{ link.bibtex }}" target="_blank" rel="noopener">BibTeX</a>{% endif %}
        {% if link.others %}{{ link.others }}{% endif %}
      </div>
    </div>
  </li>
{% endfor %}
</ol>
