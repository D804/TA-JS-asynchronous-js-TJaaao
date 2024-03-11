function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject('Something Went Wrong');
    xhr.send();
  });
}
let data = fetch('https://api.github.com/users/D804');
