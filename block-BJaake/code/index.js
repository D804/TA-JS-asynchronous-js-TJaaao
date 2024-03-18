// Fetch data from API and populate the dropdown and news container
async function fetchNews() {
  const response = await fetch(
    'https://api.spaceflightnewsapi.net/v3/articles?_limit=30'
  );
  const newsData = await response.json();
  const sourceDropdown = document.getElementById('sourceDropdown');
  const newsContainer = document.getElementById('newsContainer');

  sourceDropdown.innerHTML = '<option value="">All Sources</option>';

  const sources = new Set(newsData.map((article) => article.newsSite));
  sources.forEach((source) => {
    const option = document.createElement('option');
    option.value = source;
    option.textContent = source;
    sourceDropdown.appendChild(option);
  });

  function filterNewsBySource() {
    const selectedSource = sourceDropdown.value;
    const filteredNews = selectedSource
      ? newsData.filter((article) => article.newsSite === selectedSource)
      : newsData;

    // Clear existing news articles
    newsContainer.innerHTML = '';

    // Display news articles
    filteredNews.forEach((article) => {
      const newsItem = document.createElement('div');

      newsItem.innerHTML = `
            <img src="${article.imageUrl}" alt="${article.title}" style="max-width: 100%;">
            <h2>${article.title}</h2>
            <p>Source: ${article.newsSite}</p>
            <button onclick="window.open('${article.url}', '_blank')">Read More</button>
          `;

      newsContainer.appendChild(newsItem);
    });
  }

  filterNewsBySource();

  sourceDropdown.addEventListener('change', filterNewsBySource);
}

fetchNews();
