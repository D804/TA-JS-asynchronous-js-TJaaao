let input = document.querySelector('.input');
let img = document.querySelector('img');
function handleChange(event) {
  if (event.keyCode === 13) {
    let xhr = XMLHttpRequest();
    xhr.open(
      'GET',
      'https://api.unsplash.com/photos/random/?client_id=x5ZZaEo4MRnyjghs19pvtoFryCRU0P_1viEX9yZW6Fo'
    );
    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      img.src = data.urls.small;
    };
    xhr.onerror = function () {
      console.log('Something went wrong');
    };
    xhr.send();
  }
}
input.addEventListener('keyup', handleChange);
