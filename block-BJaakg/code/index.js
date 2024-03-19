document.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.getElementById('books-container');
  const popup = document.getElementById('popup');
  const charactersList = document.getElementById('characters-list');
  const closeBtn = document.getElementById('close-btn');

  // Fetch data of GOT books
  fetch('https://www.anapioficeandfire.com/api/books')
    .then((response) => response.json())
    .then((books) => {
      books.forEach((book) => {
        const button = document.createElement('button');
        button.textContent = `Show Characters (${book.characters.length})`;
        button.addEventListener('click', () => {
          showCharacters(book.characters);
        });

        const bookInfo = document.createElement('div');
        bookInfo.innerHTML = `
            <h2>${book.name}</h2>
            <p><strong>Authors:</strong> ${book.authors.join(', ')}</p>
            <p><strong>Number of Pages:</strong> ${book.numberOfPages}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>Released:</strong> ${book.released}</p>
            <p><strong>Country:</strong> ${book.country}</p>
          `;
        bookInfo.appendChild(button);

        booksContainer.appendChild(bookInfo);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      booksContainer.innerHTML = 'Error fetching data. Please try again later.';
    });

  // Close popup when close button is clicked
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Function to show characters in popup
  function showCharacters(characterLinks) {
    charactersList.innerHTML = 'Loading characters...';
    popup.style.display = 'block';

    Promise.all(
      characterLinks.map((link) =>
        fetch(link).then((response) => response.json())
      )
    )
      .then((characters) => {
        charactersList.innerHTML = '';
        characters.forEach((character) => {
          const characterInfo = document.createElement('div');
          characterInfo.innerHTML = `
              <h3>${character.name}</h3>
              <p><strong>Gender:</strong> ${character.gender}</p>
              <p><strong>Aliases:</strong> ${character.aliases.join(', ')}</p>
              <p><strong>TV Series:</strong> ${character.tvSeries.join(
                ', '
              )}</p>
            `;
          charactersList.appendChild(characterInfo);
        });
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        charactersList.innerHTML =
          'Error fetching characters. Please try again later.';
      });
  }
});
