document.addEventListener('DOMContentLoaded', function () {
  const newsContainer = document.getElementById('newsContainer');
  const loadingIndicator = document.querySelector('.loading');

  function showLoadingIndicator() {
    loadingIndicator.classList.add('show');
  }

  function hideLoadingIndicator() {
    loadingIndicator.classList.remove('show');
  }

  function handleOffline() {
    newsContainer.innerHTML =
      'You are offline. Please check your internet connection.';
  }

  function handleError(error) {
    newsContainer.innerHTML =
      'An error occurred while fetching the news. Please try again later.';
    console.error('Error fetching news:', error);
  }

  function fetchData() {
    showLoadingIndicator();

    fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        hideLoadingIndicator();
        displayNews(data);
      })
      .catch((error) => {
        hideLoadingIndicator();
        handleError(error);
      });
  }

  function displayNews(news) {
    newsContainer.innerHTML = ''; // Clear previous content
    news.forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <img src="${article.imageUrl}" alt="Article Image">
        <h3>${article.title}</h3>
        <p>Source: ${article.newsSite}</p>
        <button onclick="window.open('${article.url}', '_blank')">Read More</button>
      `;
      newsContainer.appendChild(articleElement);
    });
  }

  window.addEventListener('online', fetchData);
  window.addEventListener('offline', handleOffline);

  fetchData(); // Fetch data when the page loads
});
